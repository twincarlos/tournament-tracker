export const fetchCache = 'force-no-store';
import { sql } from "@vercel/postgres";

export async function PUT(req) {
    const data = await req.json();
    const { rows } = await sql `UPDATE Matches SET "matchBestOf" = ${data.matchBestOf} WHERE "matchId" = ${data.matchId} AND "matchStatus" = 'Upcoming';`;
    return new Response(JSON.stringify(rows[0]));
};