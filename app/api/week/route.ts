import {Request} from 'next/dist/compiled/@edge-runtime/primitives/fetch';

import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';

dayjs.extend(weekOfYear)

export async function GET() {
    return new Response(`${dayjs().week()}`);
}
