'use server';

import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';

dayjs.extend(weekOfYear);

export async function GET() {
    return new Response(`${dayjs().week()}`);
}
