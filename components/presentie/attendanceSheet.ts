"use server";
import {appendSheetValues, getSheetValues, SheetValues, updateSheetValues} from "@/lib/GoogleApi";
import dayjs from "dayjs";
import Attendance from "@/app/presentie/page";

type Attendance = Record<string, boolean>;

let currentRow: number | undefined;
let currentAttendance: Attendance | undefined;
let currentAttendanceDate: string | undefined;

export async function getAttendanceSheet(): Promise<SheetValues | null> {
    "use server";
    return getSheetValues(process.env.PRESENTIE_SHEET_ID!, process.env.PRESENTIE_SHEET_RANGE!);
}

export async function getActieveLeden(): Promise<SheetValues | null> {
    "use server";
    return getSheetValues(process.env.PRESENTIE_SHEET_ID!, process.env.PRESENTIE_SHEET_ACTIEVE_LEDEN_RANGE!);
}

export async function getCurrentAttendance(): Promise<Attendance> {
    if (!currentAttendance || !currentAttendanceDate || !currentRow) {
        // Abuse append the get the last row
        const emptyAppend = await appendSheetValues(process.env.PRESENTIE_SHEET_ID!, process.env.PRESENTIE_SHEET_RANGE!, []);
        const rawRow = emptyAppend.data.updates?.updatedRange ?? undefined;
        currentRow = parseInt(rawRow?.split('!')[1].slice(1)??'') - 1;

        console.log('Current Row:', currentRow);

        const attendanceSheet = await getSheetValues(process.env.PRESENTIE_SHEET_ID!, process.env.PRESENTIE_SHEET_RANGE!+'!'+currentRow+":"+currentRow);
        if (!attendanceSheet || attendanceSheet.length !== 1) {
            throw new Error('Could not retrieve attendance sheet');
        }
        const attendanceRow = attendanceSheet[0] as string[];

        const newAttendance: Record<string, boolean> = {};

        for (let i = 1; i < attendanceRow.length; i = i + 2) {
            const person = attendanceRow[i];
            const present = attendanceRow[i + 1] === 'TRUE';
            newAttendance[person] = present;
        }

        currentAttendance = newAttendance;
        currentAttendanceDate = attendanceRow[0];
    }

    return currentAttendance;
}

export async function createCurrentAttendance(): Promise<Attendance> {
    // A new day starts at 6 in the morning
    const today = dayjs().subtract(6, 'hours').format('DD-MM-YYYY');
    const row = [today];

    const actieveLeden = await getActieveLeden();
    const people: string[][] = actieveLeden ? actieveLeden : [];

    const newAttendance: Attendance = {};

    for (const [person] of people) {
        row.push(person);
        row.push('FALSE');
        newAttendance[person] = false;
    }

    const result = await appendSheetValues(process.env.PRESENTIE_SHEET_ID!, process.env.PRESENTIE_SHEET_RANGE!, [row]);

    const rawRow = result.data.updates?.updatedRange ?? undefined;
    currentRow = parseInt(rawRow?.split('!')[1].slice(1)??'') - 1;
    currentAttendanceDate = today;
    currentAttendance = newAttendance;

    return currentAttendance;
}

export async function updateCurrentAttendance(): Promise<void> {
    if (!currentAttendance || !currentAttendanceDate || !currentRow) {
        throw new Error('No data to set with');
    }

    const row: string[] = [currentAttendanceDate];

    for (const attendancePerson in currentAttendance) {
        row.push(attendancePerson);
        row.push(currentAttendance[attendancePerson] ? 'TRUE' : 'FALSE');
    }

    await updateSheetValues(process.env.PRESENTIE_SHEET_ID!, process.env.PRESENTIE_SHEET_RANGE! + '!' + currentRow + ":" + currentRow, [row]);
}

export async function togglePerson(name: string): Promise<Attendance> {
    if (!currentAttendance || !currentAttendanceDate || !currentRow) {
        throw new Error('No data to set with');
    }

    const newAttendance = {...currentAttendance};

    if (!(name in newAttendance)) {
        throw new Error('Unknown person');
    }

    newAttendance[name] = !newAttendance[name];

    currentAttendance = newAttendance;

    await updateCurrentAttendance();

    return currentAttendance;
}

export async function addPerson(name: string): Promise<Attendance> {
    if (!currentAttendance || !currentAttendanceDate || !currentRow) {
        throw new Error('No data to set with');
    }

    const newAttendance = {...currentAttendance};

    newAttendance[name] = true;

    currentAttendance = newAttendance;

    await updateCurrentAttendance();

    return currentAttendance;
}
