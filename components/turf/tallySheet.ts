"use server";
import {appendSheetValues, getSheetValues, SheetValues} from '@/lib/GoogleApi';

export async function getTallySheet(): Promise<SheetValues | null> {
        "use server";
        return getSheetValues(process.env.TURF_SHEET_ID!, 'A1:D');
}

export async function addTallyRow(row: string[][]) {
        "use server";
        return appendSheetValues(process.env.TURF_SHEET_ID!, 'A1:D', row);
}
