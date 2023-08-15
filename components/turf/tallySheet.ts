"use server";
import {appendSheetValues, getSheetValues, SheetValues} from '@/lib/GoogleApi';

export async function getTallySheet(): Promise<SheetValues | null> {
        "use server";
        return getSheetValues(process.env.TURF_SHEET_ID!, process.env.TURF_SHEET_RANGE!);
}

export async function addTallyRow(row: string[][]) {
        "use server";
        return appendSheetValues(process.env.TURF_SHEET_ID!, process.env.TURF_SHEET_RANGE!, row);
}
