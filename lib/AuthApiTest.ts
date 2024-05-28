"use server";

import {getSheetValues} from "@/lib/PersonalGoogleApi";

export async function getQuotes() {
    'use server';
    return getSheetValues(process.env.TEST_SHEET_ID!, "A1:A");
}
