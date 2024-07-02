export const fetchCache = 'force-no-store';
import { sql } from "@vercel/postgres";

export async function GET(req, { params }) {
    const { rows } = await sql `
    SELECT
    e.id AS "eventId",
    e.name AS "eventName",
    e.date AS "eventDate",
    e.time AS "eventTime",
    e.type AS "eventType",
    e.status AS "eventStatus",
    e.stage AS "eventStage",
    t.id AS "tournamentId",
    t.name AS "tournamentName",
    t.date AS "tournamentDate"
    FROM Events e
    JOIN Tournaments t ON e.tournament_id = t.id
    WHERE t.id = ${params.tournamentId};`;
    return new Response(JSON.stringify(rows));
};