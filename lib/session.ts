"use server";
import 'server-only';
import {jwtVerify, SignJWT} from 'jose';
import {cookies} from "next/headers";
import {getPersonalOAuthClient, setPersonalOAuthClient} from "@/lib/GoogleAuth";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

type SessionPayload = {
    userId: string,
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
        console.log('Failed to verify session:', session);
    }
}

export async function getSessionUser() {
    // TODO refresh
    const session = cookies().get('session');
    if (session?.value) {
        const sessionPayload = await decrypt(session.value);
        if (sessionPayload?.userId) {
            const email: string = sessionPayload.userId as string;
            const personalOAuthClient = await getPersonalOAuthClient(email);
            // Store refreshed Google tokens
            personalOAuthClient?.on("tokens", (tokens => {
                console.log("Refreshed Google tokens for", email);
                setPersonalOAuthClient(email, tokens);
            }));
            return personalOAuthClient;
        } else {
            return undefined;
        }
    }
}

export async function createSession(userId: string) {
    // TODO replace with dayjs
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const session = await encrypt({ userId, expiresAt });

    cookies().set('session', session, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    });
}

export async function deleteSession() {
    cookies().delete('session');
}

// TODO add refresh tokens
export async function updateSession() {
    const session = cookies().get('session')?.value;
    const payload = await decrypt(session);

    if (!session || !payload) {
        return null;
    }

    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    cookies().set('session', session, {
        httpOnly: true,
        secure: true,
        expires: expires,
        sameSite: 'lax',
        path: '/',
    });
}
