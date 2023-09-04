export const dynamic = 'force-dynamic';

export async function GET() {
    "use server";
    return new Response(`${Math.random() < 0.17 ? "Trek bak" : "No spang"}`);
}
