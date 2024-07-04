export const fetchCache = 'force-no-store';
import { sql } from "@vercel/postgres";

export async function GET(req, { params }) {
    const { rows } = await sql `
    SELECT
    e."eventId",
    e."eventName",
    e."eventDate",
    e."eventTime",
    t."tournamentId",
    t."tournamentName",
    t."tournamentDate"
    FROM Events e
    JOIN Tournaments t ON e."tournamentId" = t."tournamentId"
    WHERE t."tournamentId" = ${params.tournamentId}
    ORDER BY e."eventId";`;
    return new Response(JSON.stringify(rows));
};