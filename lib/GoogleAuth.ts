"use server";
import 'server-only';
import {google} from "googleapis";
import * as crypto from "node:crypto";
import secrets from '@/config/client_secret.json';
import {NextRequest} from "next/server";
import {cookies} from "next/headers";
import {decodeJwt} from "jose";
import {Credentials, OAuth2Client} from "google-auth-library";
import {createSession} from "@/lib/session";
import {readFileSync, writeFileSync} from "node:fs";
import {experimental_taintObjectReference} from "react";
import {ResponseCookie} from "next/dist/compiled/@edge-runtime/cookies";
import dayjs from "dayjs";
import {GaxiosError} from "gaxios";

experimental_taintObjectReference("No leaky pls", secrets);

const globalOAuthClient = getOAuthClient();
experimental_taintObjectReference("No leaky pls", globalOAuthClient);

const scopes = [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/spreadsheets",
];

const nonce_cookie_name = 'google_nonce';
const redirect_cookie_name = 'google_redirect';

function getOAuthClient() {
    return new google.auth.OAuth2(
        secrets.web.client_id,
        secrets.web.client_secret,
        secrets.web.redirect_uris[0],
    );
}

export async function getAuthorizationUrl(redirect_uri: string) {
    "use server";
    const state = crypto.randomBytes(32).toString("hex");

    const expiresAt = dayjs().add(5, "minutes").toDate();
    const cookieOptions: Partial<ResponseCookie> = {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    };

    // Anti-forgery state token
    cookies().set(nonce_cookie_name, state, cookieOptions);
    // Page within the website to redirect to
    cookies().set(redirect_cookie_name, redirect_uri, cookieOptions);

    return globalOAuthClient.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
        include_granted_scopes: false,
        state: state,
    });
}

export async function exchangeForTokens(request: NextRequest) {
    "use server";
    const nonce = cookies().get(nonce_cookie_name)?.value;
    const code = request.nextUrl.searchParams.get('code');
    const state = request.nextUrl.searchParams.get('state');

    if (nonce !== state) {
        return Response.error();
    }

    if (code) {
        const {tokens} = await globalOAuthClient.getToken(code);
        experimental_taintObjectReference("No leaky pls", tokens);

        const personalClient = getOAuthClient();
        experimental_taintObjectReference("No leaky pls", personalClient);
        personalClient.setCredentials(tokens);

        const userInfo = decodeJwt(tokens.id_token!);
        const email: string | undefined = userInfo.email as string;
        const name: string | undefined = userInfo.given_name as string;

        if (email) {
            await setPersonalOAuthClient(email, tokens);
            await createSession(email, name);
        }
    }
}

const clientsPath = process.env.GOOGLE_CLIENT_SECRETS_PATH!;

type Client = Credentials;

export async function setPersonalOAuthClient(email: string, tokens: Credentials) {
    "use server";
    const clientsRaw = readFileSync(clientsPath, 'utf8');
    const clients: Record<string, Client> = JSON.parse(clientsRaw);

    clients[email] = tokens;

    const newClientsRaw = JSON.stringify(clients, undefined, 2);
    writeFileSync(clientsPath, newClientsRaw, 'utf8');
}

export async function removePersonalOAuthClient(email: string, revokeCredentials = true) {
    "use server";
    const clientsRaw = readFileSync(clientsPath, 'utf8');
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
    writeFileSync(clientsPath, newClientsRaw, 'utf8');
}

export async function getPersonalOAuthClient(email: string): Promise<OAuth2Client | undefined> {
    "use server";
    const clientsRaw = readFileSync(clientsPath, 'utf8');
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
