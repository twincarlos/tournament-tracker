export const fetchCache = 'force-no-store';
import { sql } from "@vercel/postgres";

export async function GET(req, { params }) {
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
    WHERE g."eventId" = ${params.eventId || params.EventId}
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

    const drawQuery = await sql`
    SELECT
    m.*,
    p1."playerId" AS "player1Id",
    p1."playerName" AS "player1Name",
    p1."playerRating" AS "player1Rating",
    p1."playerLocation" AS "player1Location",
    p1."playerClub" AS "player1Club",
    p1."playerDOB" AS "player1DOB",
    p1."playerIsEstimated" AS "player1IsEstimated",
    ep1."eventPlayerId" AS "eventPlayer1Id",
    ep1."groupWins" AS "player1GroupWins",
    ep1."groupLosses" AS "player1GroupLosses",
    ep1."groupPosition" AS "player1GroupPosition",
    p2."playerId" AS "player2Id",
    p2."playerName" AS "player2Name",
    p2."playerRating" AS "player2Rating",
    p2."playerLocation" AS "player2Location",
    p2."playerClub" AS "player2Club",
    p2."playerDOB" AS "player2DOB",
    p2."playerIsEstimated" AS "player2IsEstimated",
    ep2."eventPlayerId" AS "eventPlayer2Id",
    ep2."groupWins" AS "player2GroupWins",
    ep2."groupLosses" AS "player2GroupLosses",
    ep2."groupPosition" AS "player2GroupPosition",
    e."tournamentId",
    e."eventId",
    e."eventName"
    FROM
        Matches m
    FULL OUTER JOIN 
        EventPlayers ep1 ON ep1."eventPlayerId" = m."eventPlayer1Id"
    FULL OUTER JOIN 
        EventPlayers ep2 ON ep2."eventPlayerId" = m."eventPlayer2Id"
    FULL OUTER JOIN 
        Players p1 ON p1."playerId" = ep1."playerId"
    FULL OUTER JOIN 
        Players p2 ON ep2."playerId" = p2."playerId"
    JOIN
        Events e ON  e."eventId" = m."eventId"
    WHERE 
        e."eventId" = ${params.eventId || params.EventId}
    AND
        m."matchStage" = 'Draw'
    ORDER BY 
        m."matchRound" DESC, m."matchSequence" ASC;`;
    
    const drawTablesQuery = await sql`
    SELECT t.*, tm.*
    FROM TableMatches tm
    JOIN Tables t ON t."tableId" = tm."tableId"
    JOIN Matches m ON m."matchId" = tm."matchId"
    WHERE m."eventId" = ${params.eventId || params.EventId} AND m."matchStage" = 'Draw'
    ORDER BY m."matchRound" DESC, m."matchSequence" ASC;`;
    
    const draw = [];
    for (const drawMatch of drawQuery.rows) {
        const drawTables = [];
        for (const drawTable of drawTablesQuery.rows) {
            if (drawMatch.matchId === drawTable.matchId) {
                drawTables.push(drawTable);
            }
        };
        draw.push({ ...drawMatch, tables: drawTables });
    };

    const orderedDraw = [];
    for (const match of draw) {
        if (orderedDraw.length === 0) {
            orderedDraw.push([match]);
        } else {
            if (orderedDraw[orderedDraw.length - 1][0].matchRound === match.matchRound) {
                orderedDraw[orderedDraw.length - 1].push(match);
            } else {
                orderedDraw.push([match]);
            };
        };
    };

    const eventPlayersQuery = await sql`
    SELECT ep.*, p.*
    FROM EventPlayers ep
    JOIN Players p ON p."playerId" = ep."playerId"
    WHERE "eventId" = ${params.eventId || params.EventId}`;
    const eventQuery = await sql`SELECT * FROM Events WHERE "eventId" = ${params.eventId || params.EventId};`;
    const allPlayersQuery = await sql`SELECT * FROM Players WHERE "tournamentId" = ${eventQuery.rows[0].tournamentId} ORDER BY "playerRating" DESC;`;

    return new Response(JSON.stringify({ ...eventQuery.rows[0], eventPlayers: eventPlayersQuery.rows, groups, draw: orderedDraw, players: allPlayersQuery.rows }));
};