import {Request} from 'next/dist/compiled/@edge-runtime/primitives/fetch';
import { NextResponse } from 'next/server';

export async function GET() {
    const data = await (await fetch('https://sheet.best/api/sheets/9a5d4f63-ebda-45df-8d17-6a3d9246848c')).json();
    var random_bafko = data[Math.floor(Math.random() * data.length)]
    random_bafko = {
        "BAfko": random_bafko["BAGGER Afkortingen Die Dan Wel Dan Niet Gemaakt Worden Door Het Woord BAGGER Voor Een Ander Woord Te Zetten"],
        "betekenis": random_bafko["2"]
    }

    return NextResponse.json(random_bafko);
}
