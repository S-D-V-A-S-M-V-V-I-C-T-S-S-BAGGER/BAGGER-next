"use server";
import {appendSheetValues, getSheetValues, SheetValues} from '@/lib/PersonalGoogleApi';
import {Dayjs} from "dayjs";

export async function getTallyEventSheet(): Promise<SheetValues | null> {
    "use server";
    return getSheetValues(process.env.TURF_SHEET_ID!, process.env.TURF_EVENT_SHEET_RANGE!);
}

export async function addTallyEventRow(row: string[]) {
    "use server";
    return appendSheetValues(process.env.TURF_SHEET_ID!, process.env.TURF_EVENT_SHEET_RANGE!, [row]);
}

export async function submitTallyEvent(date: string, description: string) {
    "use server";
    await addTallyEventRow([date, description]);
    return getTallyEventSheet();
}

export type TallyEventData = [string, string];
export type TallyEvent = {
    id: number,
    description: string,
    date: Dayjs,
}
export type SerializedTallyEvent = {
    id: number,
    description: string,
    date: string,
}
