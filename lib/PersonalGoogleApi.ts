"use server";

import {google, sheets_v4} from "googleapis";
import {SheetContent} from "@/lib/GoogleApi";
import {getSessionUser} from "@/lib/session";
import {GaxiosResponse} from "gaxios";

export async function getSheet(spreadsheetId: string, range: string): Promise<SheetContent> {
    "use server";

    const sessionUser = await getSessionUser();

    if (!sessionUser) {
        return null;
    }

    const sheets = google.sheets({version: 'v4', auth: sessionUser});

    return new Promise((resolve, reject) => {
        sheets.spreadsheets.values.get({
            spreadsheetId,
            range,
        }, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
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

    return sheets.spreadsheets.values.append({
        spreadsheetId,
        range,
        valueInputOption,
        requestBody: {
            values,
        },
    });
}
