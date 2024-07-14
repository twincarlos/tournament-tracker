export const fetchCache = 'force-no-store';
import { sql } from "@vercel/postgres";

export async function GET() {
    const { rows } = await sql `SELECT "tournamentId", "tournamentName", "tournamentDate" FROM Tournaments;`;
    return new Response(JSON.stringify(rows));
};