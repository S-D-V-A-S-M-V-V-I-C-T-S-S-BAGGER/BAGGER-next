import express from "express";
import { google } from "googleapis";
import * as crypto from "node:crypto";
import { decodeJwt } from "jose";
import { Credentials, OAuth2Client } from "google-auth-library";
import { readFileSync, writeFileSync } from "node:fs";
import dayjs from "dayjs";
import { GaxiosError } from "gaxios";
import { CookieOptions, Request, Response } from "express";
import { createSession } from "./lib/session.ts";

const globalOAuthClient = getOAuthClient();

const scopes = [
  "https://www.googleapis.com/auth/userinfo.profile",
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/spreadsheets",
];

// TODO get from environment
const WEBSITE_BASE_URL = "http://localhost:3001";
const CALLBACK_PATH = "/callback/google";

const nonce_cookie_name = "google_nonce";
const redirect_cookie_name = "google_redirect";

function getOAuthClient() {
  return new google.auth.OAuth2(
    process.env.AUTH_GOOGLE_ID,
    process.env.AUTH_GOOGLE_SECRET,
    process.env.AUTH_GOOGLE_REDIRECT,
  );
}

const router = express.Router();

const authFlowCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "lax",
  path: "/",
  signed: true,
};

// Example: /authorization?url=%2Fturf
router.get("/authorization_url", function (req, res, next) {
  const state = crypto.randomBytes(32).toString("hex");

  const expiresAt = dayjs().add(5, "minutes").toDate();
  const cookieOptions: CookieOptions = {
    ...authFlowCookieOptions,
    expires: expiresAt,
  };

  const redirectUrl = req.query.return;

  res.cookie(nonce_cookie_name, state, cookieOptions);
  res.cookie(redirect_cookie_name, redirectUrl, cookieOptions);

  const authUrl = globalOAuthClient.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
    include_granted_scopes: false,
    state: state,
  });

  res.redirect(authUrl);
});

router.get(CALLBACK_PATH, async function (req, res, next) {
  await exchangeForTokens(req, res);

  const redirectUrl = req.signedCookies[redirect_cookie_name];
  const unsanitizedUrl = new URL(redirectUrl, WEBSITE_BASE_URL);
  const sanitizedUrl = WEBSITE_BASE_URL + unsanitizedUrl.pathname;

  console.log("Redirecting to:", sanitizedUrl);

  res.redirect(sanitizedUrl);
});

async function exchangeForTokens(req: Request, res: Response): Promise<void> {
  const nonce = req.signedCookies[nonce_cookie_name] as string;
  const code = req.query["code"] as string;
  const state = req.query["state"] as string;

  if (nonce !== state) {
    throw new Error("Nonce does not match");
  }

  if (code) {
    const { tokens } = await globalOAuthClient.getToken(code);
    const personalClient = getOAuthClient();
    personalClient.setCredentials(tokens);

    const userInfo = decodeJwt(tokens.id_token!);
    const email: string | undefined = userInfo.email as string;
    const name: string | undefined = userInfo.given_name as string;

    if (email) {
      await setPersonalOAuthClient(email, tokens);
      await createSession(email, name, res);
    }
  }
}

const clientsPath = process.env.GOOGLE_CLIENT_SECRETS_PATH!;

type Client = Credentials;

export async function setPersonalOAuthClient(
  email: string,
  tokens: Credentials,
) {
  const clientsRaw = readFileSync(clientsPath, "utf8");
  const clients: Record<string, Client> = JSON.parse(clientsRaw);

  clients[email] = tokens;

  const newClientsRaw = JSON.stringify(clients, undefined, 2);
  writeFileSync(clientsPath, newClientsRaw, "utf8");
}

export async function removePersonalOAuthClient(
  email: string,
  revokeCredentials = true,
) {
  const clientsRaw = readFileSync(clientsPath, "utf8");
  const clients: Record<string, Client> = JSON.parse(clientsRaw);

  if (revokeCredentials) {
    const tokens = clients[email];

    if (tokens) {
      const oAuthClient = getOAuthClient();
      oAuthClient.setCredentials(tokens);
      oAuthClient.revokeCredentials().catch((err: GaxiosError) => {
        if (err.response?.data.error !== "invalid_token") {
          console.error("Failed to revoke credentials for", email, ":", err);
        }
      });
    }
  }

  delete clients[email];

  const newClientsRaw = JSON.stringify(clients, undefined, 2);
  writeFileSync(clientsPath, newClientsRaw, "utf8");
}

export async function getPersonalOAuthClient(
  email: string,
): Promise<OAuth2Client | undefined> {
  const clientsRaw = readFileSync(clientsPath, "utf8");
  const clients: Record<string, Client> = JSON.parse(clientsRaw);

  const tokens = clients[email];

  if (tokens) {
    const oAuthClient = getOAuthClient();
    oAuthClient.setCredentials(tokens);
    return oAuthClient;
  } else {
    return undefined;
  }
}

export default router;
