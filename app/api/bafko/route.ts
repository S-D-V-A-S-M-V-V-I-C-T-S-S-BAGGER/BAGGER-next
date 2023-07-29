'use server';
import {NextResponse} from 'next/server';

const getBafkos = async () => {
    const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${process.env.BAFKO_SHEET_ID}/values/A3:C?key=${process.env.SHEETS_API_KEY}`);
    const responseJson = await response.json();
    return responseJson.values;
};

export async function GET() {
    const data = await getBafkos();
    const random_index = Math.floor(Math.random() * data.length);
    const random_bafko = data[random_index];
    return NextResponse.json({
        "BAfko": random_bafko[0],
        "betekenis": random_bafko[2],
    });
}
