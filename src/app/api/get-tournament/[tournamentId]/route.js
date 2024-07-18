export const fetchCache = 'force-no-store';
import { sql } from "@vercel/postgres";

export async function GET(req, { params }) {
    const eventsQuery = await sql `
    SELECT *
    FROM Events
    WHERE "tournamentId" = ${params.tournamentId || params.TournamentId} ORDER BY "eventId" ASC;`;
    const tournamentQuery = await sql `
    SELECT *
    FROM Tournaments
    WHERE "tournamentId" = ${params.tournamentId || params.TournamentId};`;
    const playersQuery = await sql`
    SELECT *
    FROM Players
    WHERE "tournamentId" = ${params.tournamentId || params.TournamentId}
    ORDER BY "playerRating" DESC;`;
    return new Response(JSON.stringify({
        ...tournamentQuery.rows[0],
        events: eventsQuery.rows,
        players: playersQuery.rows
    }));
};