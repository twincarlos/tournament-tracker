export const fetchCache = 'force-no-store';
import { sql } from "@vercel/postgres";

export async function GET(req, { params }) {
    const { rows } = await sql`
    SELECT *
    FROM Matches
    WHERE "matchId" = ${params.matchId || params.MatchId};`;

    return new Response(JSON.stringify(rows[0]));
};