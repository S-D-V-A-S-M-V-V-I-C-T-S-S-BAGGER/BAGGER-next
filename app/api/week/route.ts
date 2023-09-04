export const dynamic = 'force-dynamic';

import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';

dayjs.extend(weekOfYear);

export async function GET() {
    "use server";
    return new Response(`${dayjs().week()}`);
}
