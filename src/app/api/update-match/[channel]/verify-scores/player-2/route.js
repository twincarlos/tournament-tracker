import { sql } from "@vercel/postgres";
import { PusherServer } from "../../../../../../../pusher";
import { determineGroupPositions } from "../utils";

export async function PUT(req, { params }) {
    const { matchId, groupId } = await req.json();
    const getMatchQuery = await sql`SELECT "player1Verified", "matchStatus", "groupId" FROM Matches WHERE "matchId" = ${matchId}`;
    
    let updateMatchQuery;
    if (getMatchQuery.rows[0].player1Verified === true) {
        const matchesInGroupQuery = await sql`SELECT COUNT("matchStatus") FROM Matches WHERE ("groupId" = ${groupId}) AND ("matchStatus" = 'In Progress' OR "matchStatus" = 'Pending' OR "matchStatus" = 'Ready');`;
        if (Number(matchesInGroupQuery.rows[0].count) === 0) await sql`UPDATE Groups SET "groupStatus" = 'Finished' WHERE "groupId" = ${groupId};`;

        updateMatchQuery = await sql
        `UPDATE Matches
        SET
        "player2Verified" = True,
        "matchStatus" = 'Finished'
        WHERE "matchId" = ${matchId}
        RETURNING *;`;
    } else {
        updateMatchQuery = await sql
        `UPDATE Matches
        SET "player2Verified" = True
        WHERE "matchId" = ${matchId}
        RETURNING *;`;
    };

    if (updateMatchQuery.rows[0].matchStatus === "Finished") {
        await sql`
            UPDATE EventPlayers
            SET "groupWins" = "groupWins" + 1
            WHERE "eventPlayerId" = ${updateMatchQuery.rows[0].winnerId};`;
        await sql`
            UPDATE EventPlayers
            SET "groupLosses" = "groupLosses" + 1
            WHERE "eventPlayerId" = ${updateMatchQuery.rows[0].loserId};`;

        if (updateMatchQuery.rows[0].matchStage === "Groups") {
            const getMatchesQuery = await sql`SELECT * FROM Matches WHERE "groupId" = ${updateMatchQuery.rows[0].groupId}`;
            const getPlayersQuery = await sql`SELECT * FROM EventPlayers WHERE "groupId" = ${updateMatchQuery.rows[0].groupId}`;
            const matches = getMatchesQuery.rows;
            const players = getPlayersQuery.rows;
            const groupPositions = determineGroupPositions(players, matches);
            for (let i = 0; i < groupPositions.length; i++) {
                for (const player of groupPositions[i]) {
                    await sql`UPDATE EventPlayers SET "groupPosition" = ${i + 1} WHERE "eventPlayerId" = ${player.eventPlayerId};`;
                };
            };
            const finishedMatchesCount = await sql`
                SELECT COUNT("matchId")
                FROM Matches
                WHERE "groupId" = ${updateMatchQuery.rows[0].groupId}
                AND "matchStatus" != 'Finished';`;
                if (Number(finishedMatchesCount.rows[0].count) === 0) await sql`UPDATE Groups SET "groupStatus" = 'Finished' WHERE "groupId" = ${updateMatchQuery.rows[0].groupId};`;
        };
    };


    PusherServer.trigger(params.channel, "update_match", updateMatchQuery.rows[0]);
    return new Response(JSON.stringify(getMatchQuery.rows));
};