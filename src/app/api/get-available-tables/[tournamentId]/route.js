export const fetchCache = 'force-no-store';
import { sql } from "@vercel/postgres";

export async function GET(req, { params }) {
    const allTables = await sql`SELECT "tableId", "tableNumber" FROM Tables WHERE "tournamentId" = ${params.tournamentId || params.TournamentId};`;
    const tableQueries = await sql`
    SELECT tb."tableId" FROM TableMatches tm
    JOIN Tables tb ON tb."tableId" = tm."tableId"
    JOIN Tournaments t ON t."tournamentId" = tb."tournamentId"
    JOIN Matches m ON m."matchId" = tm."matchId"
    WHERE
    (t."tournamentId" = ${params.tournamentId || params.TournamentId})
    AND
    (m."matchStatus" = 'Ready' OR m."matchStatus" = 'In Progress' OR m."matchStatus" = 'Pending');`;

    const occupiedTables = [];
    for (const table of tableQueries.rows) {
        if (occupiedTables.length === 0) {
            occupiedTables.push(table.tableId);
        } else {
            if (occupiedTables[occupiedTables.length - 1] !== table.tableId) {
                occupiedTables.push(table.tableId);
            };
        };
    };
    return new Response(JSON.stringify({
        allTables: allTables.rows,
        occupiedTables
    }));
};