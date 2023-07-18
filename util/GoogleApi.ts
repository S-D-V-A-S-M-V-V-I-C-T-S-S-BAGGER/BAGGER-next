'use server';
import {google, sheets_v4} from 'googleapis';
import {GaxiosResponse} from 'gaxios';

function getJwt() {
    return new google.auth.JWT(
        process.env.SERVICE_CLIENT_EMAIL, undefined, process.env.SERVICE_CLIENT_KEY,
        ['https://www.googleapis.com/auth/spreadsheets']
    )
}

export type SheetContent =  GaxiosResponse<sheets_v4.Schema$ValueRange> | null | undefined

export async function getSheet(spreadsheetId: string, range: string): Promise<SheetContent> {
    const sheets = google.sheets({version: 'v4'})
    return new Promise((resolve, reject) => {
        sheets.spreadsheets.values.get({
            spreadsheetId,
            range,
            auth: getJwt(),
            key: process.env.SHEETS_API_KEY
        }, (err, res) => {
            if (err) {
                reject(err)
            } else {
                resolve(res)
            }
        })
    })
}

export type SheetValues = GaxiosResponse<sheets_v4.Schema$ValueRange>['data']['values'];

export async function getSheetValues(spreadsheetId: string, range: string): Promise<SheetValues | null> {
    const sheetData = await getSheet(spreadsheetId, range);
    return sheetData?.data.values;
}
