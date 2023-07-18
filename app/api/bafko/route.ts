'use server';
import { NextResponse } from 'next/server';
import {google, sheets_v4} from 'googleapis';
import {GaxiosResponse} from 'gaxios';

function getJwt() {
    return new google.auth.JWT(
        process.env.SERVICE_CLIENT_EMAIL, undefined, process.env.SERVICE_CLIENT_KEY,
        ['https://www.googleapis.com/auth/spreadsheets']
    );
}

type SheetContent =  GaxiosResponse<sheets_v4.Schema$ValueRange> | null | undefined

async function getSheet(): Promise<SheetContent> {
    const sheets = google.sheets({version: 'v4'});
    return new Promise((resolve, reject) => {
        sheets.spreadsheets.values.get({
            spreadsheetId: process.env.BAFKO_SHEET_ID,
            range: 'A3:C',
            auth: getJwt(),
            key: process.env.SHEETS_API_KEY,
        }, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
}

const getBafkos = async (): Promise<GaxiosResponse<sheets_v4.Schema$ValueRange>['data']['values'] | null> => {
    const sheetData = await getSheet();
    return sheetData?.data.values;
};

export async function GET() {
    const data = await getBafkos();
    if (data) {
        const random_index = Math.floor(Math.random() * data.length);
        const random_bafko = data[random_index];
        return NextResponse.json({
            "BAfko": random_bafko[0],
            "betekenis": random_bafko[2],
        });
    } else {
        return NextResponse.json({ error: 'Could not find the sheet'}, {status: 404});
    }
}
