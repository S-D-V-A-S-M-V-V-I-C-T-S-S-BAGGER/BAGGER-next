"use server";
import 'server-only';
import {jwtVerify, SignJWT} from 'jose';
import {cookies} from "next/headers";
import {getPersonalOAuthClient, removePersonalOAuthClient, setPersonalOAuthClient} from "@/lib/GoogleAuth";
import dayjs from "dayjs";
import {experimental_taintObjectReference} from "react";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

type SessionPayload = {
    userId: string,
    userName: string,
    expiresAt: Date,
}

export async function encrypt(payload: SessionPayload) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(encodedKey);
}

export async function decrypt(session: string | undefined = '') {
    try {
        const { payload } = await jwtVerify(session, encodedKey, {
            algorithms: ['HS256'],
        });
        return payload;
    } catch (error) {
        console.error('Failed to verify session:', session);
    }
}

export async function getSessionUser() {
    "use server";
    const session = cookies().get('session');
    if (session?.value) {
        const sessionPayload = await decrypt(session.value);
        if (sessionPayload?.userId) {
            const email: string = sessionPayload.userId as string;
            const personalOAuthClient = await getPersonalOAuthClient(email);
            if (personalOAuthClient !== undefined) {
                experimental_taintObjectReference("No leaky pls", personalOAuthClient);
                // Store refreshed Google tokens
                personalOAuthClient.on("tokens", (tokens => {
                    setPersonalOAuthClient(email, tokens);
                }));
            }
            return personalOAuthClient;
        } else {
            return undefined;
        }
    }
}

export async function getSessionName(): Promise<string | undefined> {
    "use server";
    const session = cookies().get('session');
    if (session?.value) {
        const sessionPayload = await decrypt(session.value);
        return sessionPayload?.userName as (string | undefined);
    }
    return undefined;
}

export async function hasSessionUser(): Promise<boolean> {
    "use server";
    try {
        const session = cookies().get('session');
        if (session?.value) {
            const sessionPayload = await decrypt(session.value);
            if (sessionPayload?.userId) {
                const email: string = sessionPayload.userId as string;
                const personalOAuthClient = await getPersonalOAuthClient(email);

                if (personalOAuthClient) {
                    experimental_taintObjectReference("No leaky pls", personalOAuthClient);
                    return true;
                }
            }
        }
        return false;
    } catch (err) {
        return false;
    }
}

export async function createSession(userId: string, userName: string) {
    const expiresAt = dayjs().add(7, "days").toDate();
    const session = await encrypt({ userId, userName, expiresAt });

    cookies().set('session', session, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    });
}

export async function deleteSession(revokeCredentials = true) {
    const session = cookies().get('session');
    if (session?.value) {
        const sessionPayload = await decrypt(session.value).catch();
        if (sessionPayload?.userId) {
            const email: string = sessionPayload.userId as string;
            await removePersonalOAuthClient(email, revokeCredentials).catch(() => console.error("Failed to delete client for", email));
        }
    }
    cookies().delete('session');
}

export async function updateSession() {
    const session = cookies().get('session')?.value;
    const payload = await decrypt(session);

    if (!session || !payload) {
        return null;
    }

    const expires = dayjs().add(7, "days").toDate();
    cookies().set('session', session, {
        httpOnly: true,
        secure: true,
        expires: expires,
        sameSite: 'lax',
        path: '/',
    });
}
