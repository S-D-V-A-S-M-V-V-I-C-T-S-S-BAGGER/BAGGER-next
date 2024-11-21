'use server';

import {exchangeForTokens} from "@/lib/GoogleAuth";
import {NextRequest} from "next/server";
import {cookies} from "next/headers";

const redirect_cookie_name = 'google_redirect';

export async function GET(request: NextRequest) {
    const response = await exchangeForTokens(request);

    if (response) {
        return response;
    }

    // Navigate the user back to the page from where they logged in
    const redirectCookie = cookies().get(redirect_cookie_name);
    return Response.redirect(new URL(redirectCookie?.value ?? "/", "https://dispuutbagger.nl"));
}
