export const fetchCache = 'force-no-store';
import { sql } from "@vercel/postgres";

export async function POST(req) {
    const data = await req.json();

    if (data.groupId) {
        const tableMatchesQuery = await sql`
            SELECT tm."tableMatchId", m."matchId"
            FROM Groups g
            JOIN Matches m ON m."groupId" = g."groupId"
            JOIN TableMatches tm ON tm."matchId" = m."matchId"
            JOIN Tables t ON t."tableId" = tm."tableId"
            WHERE m."groupId" = ${data.groupId}`;
        
        for (const tableMatch of tableMatchesQuery.rows) {
            await sql`DELETE FROM TableMatches WHERE "tableMatchId" = ${tableMatch.tableMatchId}`;
        };
    
        const groupMatches = await sql`SELECT "matchId" FROM Matches WHERE "groupId" = ${data.groupId}`;
    
        const newTables = [];
        for (const tableId of data.tables) {
            for (const groupMatch of groupMatches.rows) {
                const newTable = await sql`INSERT INTO TableMatches("tableId", "matchId") VALUES(${tableId}, ${groupMatch.matchId}) RETURNING *;`;
                if (newTables.length === 0) {
                    newTables.push(newTable.rows[0]);
                } else {
                    if (newTables[newTables.length - 1].tableId !== newTable.tableId) {
                        newTables.push(newTable.rows[0])
                    };
                };
            };
        };
    
        return new Response(JSON.stringify(newTables));
    } else {
        const tableMatchesQuery = await sql`
            SELECT tm."tableMatchId", m."matchId"
            FROM TableMatches tm
            JOIN Matches m ON m."matchId" = tm."matchId"
            JOIN Tables t ON t."tableId" = tm."tableId"
            WHERE m."matchId" = ${data.matchId}`;
        
        for (const tableMatch of tableMatchesQuery.rows) {
            await sql`DELETE FROM TableMatches WHERE "matchId" = ${tableMatch.matchId};`;
        };

        for (const tableId of data.tables) {
            await sql`INSERT INTO TableMatches("matchId", "tableId") VALUES(${data.matchId}, ${tableId})`;
        };

        return new Response(JSON.stringify([]));
    };

};