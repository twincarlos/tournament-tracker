import { sql } from "@vercel/postgres";

export async function GET() {
    const { rows } = await sql `SELECT * FROM Tournaments;`;
    return new Response(JSON.stringify(rows));
};