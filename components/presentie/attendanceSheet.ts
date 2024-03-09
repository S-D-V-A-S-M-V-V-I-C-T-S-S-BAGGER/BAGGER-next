"use server";
import {getSheetValues, SheetValues} from "@/lib/GoogleApi";
import dayjs from "dayjs";

export async function getAttendanceSheet(): Promise<SheetValues | null> {
    "use server";
    return getSheetValues(process.env.PRESENTIE_SHEET_ID!, process.env.PRESENTIE_SHEET_RANGE!);
}

// Returns the row number and content of the current attendance
export async function getCurrentAttendance(): Promise<[number, SheetValues | null]> {
    "use server";
    const attendanceSheet = await getAttendanceSheet();

    if (!attendanceSheet) return [NaN, null];

    // A new day starts at 6 in the morning
    const today = dayjs().subtract(6, 'hours').format('DD-MM-YYYY');
    const mostRecentAttendance = attendanceSheet[attendanceSheet.length - 1];

    if (mostRecentAttendance[0] === today) {
        return [attendanceSheet.length, mostRecentAttendance];
    } else {
        return [attendanceSheet.length + 1, null];
    }
}

export async function getActieveLeden(): Promise<SheetValues | null> {
    "use server";
    return getSheetValues(process.env.PRESENTIE_SHEET_ID!, process.env.PRESENTIE_SHEET_ACTIEVE_LEDEN_RANGE!);
}
