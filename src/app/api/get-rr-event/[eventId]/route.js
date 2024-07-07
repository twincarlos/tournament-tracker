export const fetchCache = 'force-no-store';
import { sql } from "@vercel/postgres";

export async function GET(req, { params }) {
    const groupsQuery = await sql`
    SELECT 
    g."groupId",
    g."groupNumber",
    g."groupStatus",
    e."tournamentId",
    e."eventId",
    e."eventName",
    e."eventDate",
    e."eventTime",
    e."eventType",
    p."playerId",
    p."playerName",
    p."playerRating",
    p."playerLocation",
    p."playerClub",
    ep."eventPlayerId",
    ep."groupWins",
    ep."groupLosses",
    ep."groupPosition"
    FROM Groups g
    JOIN Events e ON g."eventId" = e."eventId"
    JOIN EventPlayers ep ON g."groupId" = ep."groupId"
    JOIN Players p ON ep."playerId" = p."playerId"
    WHERE g."eventId" = ${params.eventId || params.EventId}
    ORDER BY g."groupNumber" ASC, p."playerRating" DESC;`;

    const groupTablesQuery = await sql`
    SELECT DISTINCT ON (tm."tableId")
    tm."groupId",
    t."tableId",
    t."tableNumber"
    FROM TableMatches tm
    JOIN Tables t ON t."tableId" = tm."tableId"
    WHERE tm."eventId" = ${params.eventId || params.EventId} AND tm."groupId" IS NOT NULL;`;

    const groups = [];
    let currentGroupNumber;

    for (const group of groupsQuery.rows) {
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
                playerClub: group.playerClub
            });
        } else {
            const groupTablesInfo = groupTablesQuery.rows.filter(table => table.groupId === group.groupId);
            groups.push({
                tables: groupTablesInfo,
                tournamentId: group.tournamentId,
                eventId: group.eventId,
                eventName: group.eventName,
                eventDate: group.eventDate,
                eventTime: group.eventTime,
                eventType: group.eventType,
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
                    playerClub: group.playerClub
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
    e."eventName",
    t."tableId",
    t."tableNumber"
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
    FULL OUTER JOIN
        TableMatches tm ON tm."matchId" = m."matchId"
    FULL OUTER JOIN
        Tables t ON t."tableId" = tm."tableId"
    WHERE 
        e."eventId" = ${params.eventId || params.EventId}
    AND
        m."matchStage" = 'Draw'
    ORDER BY 
        m."matchRound" DESC, m."matchSequence" ASC;`;
    
    const draw = [];
    for (const drawMatch of drawQuery.rows) {
        if (draw.length === 0) {
            draw.push([drawMatch]);
        }
        else if (draw[draw.length - 1][0].matchRound === drawMatch.matchRound) {
            draw[draw.length - 1].push(drawMatch);
        } else {
            draw.push([drawMatch]);
        };
    };

    return new Response(JSON.stringify({ groups, draw }));
};