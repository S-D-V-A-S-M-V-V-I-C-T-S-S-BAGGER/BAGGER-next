'use server';
export const revalidate = 0;

export async function GET() {
    return new Response(`${Math.random() < 0.17 ? "Trek bak" : "No spang"}`);
}
