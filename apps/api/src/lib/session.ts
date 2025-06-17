import { jwtVerify, SignJWT } from "jose";
import dayjs from "dayjs";
import { CookieOptions, Request, Response } from "express";
import {
  getPersonalOAuthClient,
  removePersonalOAuthClient,
  setPersonalOAuthClient,
} from "../auth.ts";

// TODO add typing to requests and responses

const secretKey = process.env.AUTH_SIGN_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

type SessionPayload = {
  userId: string;
  userName: string;
  expiresAt: Date;
};

// TODO check cookie options
const sessionCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "strict",
  path: "/",
  signed: true,
};

async function encodeSession(payload: SessionPayload) {
  return (
    new SignJWT(payload)
      // TODO upgrade to RS256 or better
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(encodedKey)
  );
}

async function decodeSession(session: string = "") {
  try {
    const { payload } = await jwtVerify<SessionPayload>(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.error("Failed to verify session:", session);
  }
}

export async function getSessionUser(req: Request) {
  const session = req.signedCookies["session"];
  if (session) {
    const sessionPayload = await decodeSession(session);
    if (sessionPayload?.userId) {
      const email: string = sessionPayload.userId as string;
      const personalOAuthClient = await getPersonalOAuthClient(email);
      if (personalOAuthClient !== undefined) {
        // Store refreshed Google tokens
        personalOAuthClient.on("tokens", (tokens) => {
          setPersonalOAuthClient(email, tokens);
        });
      }
      return personalOAuthClient;
    } else {
      return undefined;
    }
  }
}

export async function getSessionName(
  req: Request,
): Promise<string | undefined> {
  const session = req.signedCookies["session"];
  if (session) {
    const sessionPayload = await decodeSession(session);
    return sessionPayload?.userName as string | undefined;
  }
  return undefined;
}

export async function hasSessionUser(req: Request): Promise<boolean> {
  try {
    const session = req.signedCookies["session"];
    if (session) {
      const sessionPayload = await decodeSession(session);
      if (sessionPayload?.userId) {
        const email: string = sessionPayload.userId as string;
        const personalOAuthClient = await getPersonalOAuthClient(email);

        if (personalOAuthClient) {
          return true;
        }
      }
    }
    return false;
  } catch (err) {
    return false;
  }
}

export async function createSession(
  userId: string,
  userName: string,
  res: Response,
) {
  const expiresAt = dayjs().add(7, "days").toDate();
  const session = await encodeSession({ userId, userName, expiresAt });

  const cookieOptions: CookieOptions = {
    ...sessionCookieOptions,
    expires: expiresAt,
  };

  res.cookie("session", session, cookieOptions);
}

export async function deleteSession(
  req: Request,
  res: Response,
  revokeCredentials = true,
) {
  const session = req.signedCookies["session"];
  if (session) {
    const sessionPayload = await decodeSession(session).catch();
    if (sessionPayload?.userId) {
      const email: string = sessionPayload.userId as string;
      await removePersonalOAuthClient(email, revokeCredentials).catch(() =>
        console.error("Failed to delete client for", email),
      );
    }
  }
  res.clearCookie("session");
}

export async function updateSession(req: Request, res: Response) {
  const session = req.signedCookies["session"];
  const payload = await decodeSession(session);

  if (!session || !payload) {
    return null;
  }

  const expires = dayjs().add(7, "days").toDate();

  const cookieOptions: CookieOptions = {
    ...sessionCookieOptions,
    expires: expires,
  };

  res.cookie("session", session, cookieOptions);
}
