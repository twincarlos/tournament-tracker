export const fetchCache = 'force-no-store';
import { sql } from "@vercel/postgres";

export async function GET(req, { params }) {
    const { rows } = await sql `
    SELECT
    e.*,
    t.*
    FROM Events e
    JOIN Tournaments t ON e.TournamentId = t.TournamentId
    WHERE t.TournamentId = ${params.TournamentId};`;
    return new Response(JSON.stringify(rows));
};