"use server";
import {appendSheetValues, getSheetValues, SheetValues} from '@/lib/PersonalGoogleApi';
import {Dayjs} from "dayjs";

export async function getQuoteSheet(): Promise<SheetValues | null> {
    "use server";
    return getSheetValues(process.env.QUOTE_SHEET_ID!, process.env.QUOTE_SHEET_RANGE!);
}

export async function addQuoteRow(row: string[]) {
    "use server";
    return appendSheetValues(process.env.QUOTE_SHEET_ID!, process.env.QUOTE_SHEET_RANGE!, [row]);
}

export async function submitQuote(date: string, person: string, text: string) {
    "use server";
    await addQuoteRow([date, person, text]);
    return getQuoteSheet();
}

export type QuoteData = [string, string, string];
export type Quote = {
    id: number,
    name: string,
    text: string,
    date: Dayjs,
}
