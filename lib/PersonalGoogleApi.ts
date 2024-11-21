"use server";

import {google, sheets_v4} from "googleapis";
import {SheetContent} from "@/lib/GoogleApi";
import {deleteSession, getSessionUser} from "@/lib/session";
import {GaxiosError, GaxiosResponse} from "gaxios";

async function handleAuthError<T>(promise: Promise<T>): Promise<T | undefined> {
    return promise
        .catch(async (err: GaxiosError) => {
            if ((err.status !== undefined && [401, 403].includes(err.status) || (err.message === "No refresh token is set."))) {
                await deleteSession(false).catch();
                return undefined;
            } else {
                throw err;
            }
        });
}

export async function getSheet(spreadsheetId: string, range: string): Promise<SheetContent> {
    "use server";

    const sessionUser = await getSessionUser();

    if (!sessionUser) {
        return null;
    }

    const sheets = google.sheets({version: 'v4', auth: sessionUser});

    return handleAuthError(
        sheets.spreadsheets.values.get({
            spreadsheetId,
            range,
        })
    );
}

export type SheetValues = GaxiosResponse<sheets_v4.Schema$ValueRange>['data']['values'];

export async function getSheetValues(spreadsheetId: string, range: string): Promise<SheetValues | null> {
    const sheetData = await getSheet(spreadsheetId, range);
    return sheetData?.data.values;
}

export async function appendSheetValues(spreadsheetId: string, range: string, values: string[][], valueInputOption: 'RAW' | 'USER_ENTERED' = 'RAW') {
    const sessionUser = await getSessionUser();

    if (!sessionUser) {
        return null;
    }

    const sheets = google.sheets({version: 'v4', auth: sessionUser});

    return handleAuthError(
        sheets.spreadsheets.values.append({
            spreadsheetId,
            range,
            valueInputOption,
            requestBody: {
                values,
            },
        })
    );
}
