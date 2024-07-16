export const fetchCache = 'force-no-store';
import { sql } from "@vercel/postgres";
import { generateDraw } from "./utils";

export async function POST(req) {
    const data = await req.json();
    let round;

    const groupsQuery = await sql`
    SELECT "groupId", "groupNumber" FROM Groups WHERE "eventId" = ${data.eventId}  ORDER BY "groupNumber" ASC;`;

    const firstQualifiedPlayersIds = [];
    const secondQualifiedPlayersIds = [];

    for (const group of groupsQuery.rows) {
        const qualifiedPlayers = await sql`SELECT ep."eventPlayerId", p."playerIsEstimated" FROM EventPlayers ep JOIN Players p ON p."playerId" = ep."playerId" WHERE ep."groupId" = ${group.groupId} AND p."playerIsEstimated" = False ORDER BY ep."groupPosition" ASC LIMIT 2;`;
        firstQualifiedPlayersIds.push(qualifiedPlayers.rows[0].eventPlayerId);
        secondQualifiedPlayersIds.push(qualifiedPlayers.rows[1].eventPlayerId);
    };

    const qualifiedPlayersIds = [...firstQualifiedPlayersIds, ...secondQualifiedPlayersIds];

    if (qualifiedPlayersIds.length <= 4) round = 4;
    else if (qualifiedPlayersIds.length <= 8) round = 8;
    else if (qualifiedPlayersIds.length <= 16) round = 16;
    else if (qualifiedPlayersIds.length <= 32) round = 32;

    const sequences = generateDraw(round);
    const winnerIds = [];
    let currentRound = round;

    // FIRST CHECK
    for (let i = 0; i < sequences.length; i++) {
        const sequence = sequences[i];
        const eventPlayer1Id = qualifiedPlayersIds[sequence[0] - 1];
        const eventPlayer2Id = qualifiedPlayersIds[sequence[1] - 1];
        let matchStatus = "Upcoming";
        let winnerId = null;

        if (!eventPlayer1Id) {
            winnerId = eventPlayer2Id;
            matchStatus = "Finished";
        } else if (!eventPlayer2Id) {
            winnerId = eventPlayer1Id;
            matchStatus = "Finished";
        };

        winnerIds.push(winnerId);

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
            ${currentRound},
            ${data.eventId},
            ${winnerId},
            ${matchStatus}
        );`;
    };

    // SECOND CHECK
    currentRound = round / 2;
    if (currentRound > 2) {
        let counter = 1;
        for (let i = 0; i < winnerIds.length; i = i + 2) {
            const winnerId1 = winnerIds[i];
            const winnerId2 = winnerIds[i + 1];
            await sql`
            INSERT INTO Matches (
            "eventPlayer1Id",
            "eventPlayer2Id",
            "matchStage",
            "matchSequence",
            "matchRound",
            "eventId"
            )
            VALUES (
            ${winnerId1},
            ${winnerId2},
            'Draw',
            ${counter},
            ${currentRound},
            ${data.eventId}
        );`;
        counter++;
        };
    };

    // THIRD CHECK
    for (currentRound = currentRound / 2; currentRound >= 2; currentRound = currentRound / 2) {
        for (let sequence = 1; sequence <= currentRound / 2; sequence++) {
            await sql`
                INSERT INTO Matches (
                "matchStage",
                "matchSequence",
                "matchRound",
                "eventId"
                )
                VALUES (
                'Draw',
                ${sequence},
                ${currentRound},
                ${data.eventId}
            );`;
        };
    };

    if (data.generateThirdPlace) {
        await sql`
                INSERT INTO Matches (
                "matchStage",
                "matchSequence",
                "matchRound",
                "eventId"
                )
                VALUES (
                'Draw',
                2,
                2,
                ${data.eventId}
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

    await sql`UPDATE Events SET "eventStage" = 'Draw' WHERE "eventId" = ${data.eventId};`;

    return new Response(JSON.stringify(draw));
};
