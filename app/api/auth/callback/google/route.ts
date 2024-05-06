'use server';

import {exchangeForTokens} from "@/lib/GoogleAuth";
import {NextRequest, NextResponse} from "next/server";

// TODO redirect back to original page
// ensure this is done securely, so to the original navigation state and not just any url
export async function GET(request: NextRequest) {
    const response = await exchangeForTokens(request);

    if (response) {
        return response;
    }

    return new NextResponse('Ding');
}
