import { sql } from "@vercel/postgres";
import { PusherServer } from "../../../../../../../pusher";
import { determineGroupPositions } from "../utils";

export async function PUT(req, { params }) {
    const { matchId } = await req.json();
    const getMatchQuery = await sql`SELECT "player2Verified", "matchStatus", "groupId" FROM Matches WHERE "matchId" = ${matchId}`;
    const updateMatchQuery = await sql
        `UPDATE Matches
    SET
        "player1Verified" = True,
        "matchStatus" = ${getMatchQuery.rows[0].player2Verified === true ? "Finished" : getMatchQuery.rows[0].matchStatus}
    WHERE
        "matchId" = ${matchId}
    RETURNING *;`;

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