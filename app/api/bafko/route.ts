export const dynamic = 'force-dynamic';

import {NextResponse} from 'next/server';
import {getSheetValues, SheetValues} from '@/lib/GoogleApi';

const getBafkos = async (): Promise<SheetValues | null> => {
    "use server";
    if (process?.env?.BAFKO_SHEET_ID && process?.env?.BAFKO_SHEET_RANGE) {
        return getSheetValues(process.env.BAFKO_SHEET_ID, process.env.BAFKO_SHEET_RANGE);
    }
    return null;
};

export async function GET() {
    "use server";
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
