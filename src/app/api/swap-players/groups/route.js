export const fetchCache = 'force-no-store';
import { sql } from "@vercel/postgres";

export async function PUT(req) {
    const { eventPlayer1, eventPlayer2, eventId } = await req.json();

    await sql `UPDATE EventPlayers SET "playerId" = ${eventPlayer2.playerId} WHERE "eventPlayerId" = ${eventPlayer1.eventPlayerId};`;
    await sql `UPDATE EventPlayers SET "playerId" = ${eventPlayer1.playerId} WHERE "eventPlayerId" = ${eventPlayer2.eventPlayerId};`;

    const groupsQuery = await sql`
    SELECT
    g.*,
    ep.*,
    p.*,
    e.*
    FROM Groups g
    JOIN EventPlayers ep ON g."groupId" = ep."groupId"
    JOIN Players p ON ep."playerId" = p."playerId"
    JOIN Events e ON e."eventId" = g."eventId"
    WHERE g."eventId" = ${eventId}
    ORDER BY g."groupNumber" ASC, p."playerRating" DESC;`;

    const groupTables = [];
    for (let i = 0; i < groupsQuery.rows.length; i++) {
        const group = groupsQuery.rows[i];
        const groupTablesQuery = await sql`
        SELECT t.*, tm.*
        FROM Groups g
        JOIN Matches m ON m."groupId" = g."groupId"
        JOIN TableMatches tm ON tm."matchId" = m."matchId"
        JOIN Tables t ON t."tableId" = tm."tableId"
        WHERE m."groupId" = ${group.groupId}
        ORDER BY t."tableNumber" ASC`;
        for (const table of groupTablesQuery.rows) {
            if (groupTables[i]) {
                if (groupTables[i][groupTables[i].length - 1].tableId !== table.tableId) {
                    groupTables[i].push(table);
                };
            } else {
                groupTables.push([table]);
            };
        };
    };

    const groups = [];
    let currentGroupNumber;
    for (let i = 0; i < groupsQuery.rows.length; i++) {
        const group = groupsQuery.rows[i];
        if (currentGroupNumber === group.groupNumber) {
            groups[groups.length - 1].groupPlayers.push({
                playerId: group.playerId,
                eventPlayerId: group.eventPlayerId,
                groupWins: group.groupWins,
                groupLosses: group.groupLosses,
                groupPosition: group.groupPosition,
                playerName: group.playerName,
                playerRating: group.playerRating,
                playerIsEstimated: group.playerIsEstimated,
                playerDOB: group.playerDOB,
                playerLocation: group.playerLocation,
                playerClub: group.playerClub,
                playerHandicap: group.playerHandicap
            });
        } else {
            groups.push({
                tables: groupTables[i] || [],
                tournamentId: group.tournamentId,
                eventId: group.eventId,
                eventName: group.eventName,
                eventDate: group.eventDate,
                eventTime: group.eventTime,
                eventType: group.eventType,
                allowUnratedQualify: group.allowUnratedQualify,
                groupId: group.groupId,
                groupNumber: group.groupNumber,
                groupDate: group.groupDate,
                groupTime: group.groupTime,
                groupStatus: group.groupStatus,
                groupPlayers: [{
                    playerId: group.playerId,
                    eventPlayerId: group.eventPlayerId,
                    groupWins: group.groupWins,
                    groupLosses: group.groupLosses,
                    groupPosition: group.groupPosition,
                    playerName: group.playerName,
                    playerRating: group.playerRating,
                    playerIsEstimated: group.playerIsEstimated,
                    playerDOB: group.playerDOB,
                    playerLocation: group.playerLocation,
                    playerClub: group.playerClub,
                    playerHandicap: group.playerHandicap
                }]
            });
            currentGroupNumber = group.groupNumber;
        };
    };

    return new Response(JSON.stringify(groups));
};