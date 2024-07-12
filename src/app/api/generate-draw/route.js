import { sql } from "@vercel/postgres";
import { generateDraw } from "./utils";

export async function POST(req) {
    const data = await req.json();
    let round;

    const qualifiedPlayers = await sql`
    SELECT
    ep."eventPlayerId"
    FROM
    EventPlayers ep
    JOIN Groups g ON g."groupId" = ep."groupId"
    WHERE (ep."eventId" = ${data.eventId}) AND (ep."groupPosition" = 1 OR ep."groupPosition" = 2)
    ORDER BY ep."groupPosition" ASC, g."groupNumber" ASC;`;

    const qualifiedPlayersIds = qualifiedPlayers.rows.map(qualifiedPlayer => qualifiedPlayer.eventPlayerId);
    const allPlayerIds = [...qualifiedPlayersIds, ...data.playerIds];

    if (allPlayerIds.length <= 4) round = 4;
    else if (allPlayerIds.length <= 8) round = 8;
    else if (allPlayerIds.length <= 16) round = 16;
    else if (allPlayerIds.length <= 32) round = 32;

    const sequences = generateDraw(round);
    for (let i = 0; i < sequences.length; i++) {
        const sequence = sequences[i];
        const eventPlayer1Id = allPlayerIds[sequence[0] - 1];
        const eventPlayer2Id = allPlayerIds[sequence[1] - 1];
        let matchStatus = "Upcoming";
        let winnerId = null;

        if (!eventPlayer1Id && !eventPlayer2Id) {
            matchStatus = "Finished";
        } else if (!eventPlayer1Id) {
            winnerId = eventPlayer2Id;
            matchStatus = "Finished";
        } else if (!eventPlayer2Id) {
            winnerId = eventPlayer1Id;
            matchStatus = "Finished";
        };

        await sql`
            INSERT INTO Matches (
            "eventPlayer1Id",
            "eventPlayer2Id",
            "matchStage",
            "matchSequence",
            "matchRound",
            "eventId",
            "winnerId",
            "matchStatus"
            )
            VALUES (
            ${eventPlayer1Id},
            ${eventPlayer2Id},
            'Draw',
            ${i + 1},
            ${round},
            ${data.eventId},
            ${winnerId},
            ${matchStatus}
        );`;
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
        e."eventId" = ${data.eventId}
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

    return new Response(JSON.stringify(draw));
};