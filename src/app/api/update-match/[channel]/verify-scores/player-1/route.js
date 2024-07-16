export const fetchCache = 'force-no-store';
import { sql } from "@vercel/postgres";
import { PusherServer } from "../../../../../../../pusher";
import { determineGroupPositions } from "../utils";

export async function PUT(req, { params }) {
    const { matchId, groupId } = await req.json();
    const getMatchQuery = await sql`SELECT "player2Verified", "matchStatus", "groupId", "matchStage", "matchRound", "matchSequence", "winnerId", "loserId", "eventId" FROM Matches WHERE "matchId" = ${matchId}`;
    let updateMatchQuery;

    if (getMatchQuery.rows[0].matchStage === "Groups") {
        if (getMatchQuery.rows[0].player2Verified === true) {
            const matchesInGroupQuery = await sql`SELECT COUNT("matchStatus") FROM Matches WHERE ("groupId" = ${groupId}) AND ("matchStatus" = 'In Progress' OR "matchStatus" = 'Pending' OR "matchStatus" = 'Ready');`;
            if (Number(matchesInGroupQuery.rows[0].count) === 0) await sql`UPDATE Groups SET "groupStatus" = 'Finished' WHERE "groupId" = ${groupId};`;

            updateMatchQuery = await sql
                `UPDATE Matches
            SET
            "player1Verified" = True,
            "matchStatus" = 'Finished'
            WHERE "matchId" = ${matchId}
            RETURNING *;`;
        } else {
            updateMatchQuery = await sql
                `UPDATE Matches
            SET "player1Verified" = True
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
            const getMatchesQuery = await sql`SELECT * FROM Matches WHERE "groupId" = ${groupId}`;
            const getPlayersQuery = await sql`SELECT * FROM EventPlayers WHERE "groupId" = ${groupId}`;
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
                    WHERE "groupId" = ${groupId}
                    AND "matchStatus" != 'Finished';`;
            if (Number(finishedMatchesCount.rows[0].count) === 0) {
                await sql`UPDATE Groups SET "groupStatus" = 'Finished' WHERE "groupId" = ${groupId};`;

                const finishedGroupsCount = await sql`
                SELECT COUNT("groupId")
                FROM Groups
                WHERE "eventId" = ${getMatchQuery.rows[0].eventId}
                AND "matchStatus" != 'Finished';`;
                if (Number(finishedGroupsCount.rows[0].count) === 0) await sql `UPDATE Event SET "eventStatus" = 'Pending' WHERE "eventId" = ${getMatchQuery.rows[0].eventId};`;
            };
        };

    }

    else {
        if (getMatchQuery.rows[0].player2Verified === true) {
            updateMatchQuery = await sql
                `UPDATE Matches
            SET
            "player1Verified" = True,
            "matchStatus" = 'Finished'
            WHERE "matchId" = ${matchId}
            RETURNING *;`;

            let nextMatchSequence;
            if (getMatchQuery.rows[0].matchSequence % 2 === 0) {
                nextMatchSequence = getMatchQuery.rows[0].matchSequence / 2;
            } else {
                nextMatchSequence = (getMatchQuery.rows[0].matchSequence + 1) / 2;
            };

            if (getMatchQuery.rows[0].matchRound > 2) {
                if (getMatchQuery.rows[0].matchSequence % 2 === 0) {
                    await sql`UPDATE Matches SET "eventPlayer2Id" = ${getMatchQuery.rows[0].winnerId} WHERE "eventId" = ${getMatchQuery.rows[0].eventId} AND "matchStage" = 'Draw' AND "matchRound" = ${getMatchQuery.rows[0].matchRound / 2} AND "matchSequence" = ${nextMatchSequence}`;
                } else {
                    await sql`UPDATE Matches SET "eventPlayer1Id" = ${getMatchQuery.rows[0].winnerId} WHERE "eventId" = ${getMatchQuery.rows[0].eventId} AND "matchStage" = 'Draw' AND "matchRound" = ${getMatchQuery.rows[0].matchRound / 2} AND "matchSequence" = ${nextMatchSequence}`;
                };
            };

            if (getMatchQuery.rows[0].matchRound === 4) {
                if (getMatchQuery.rows[0].matchSequence % 2 === 0) {
                    await sql`UPDATE Matches SET "eventPlayer2Id" = ${getMatchQuery.rows[0].loserId} WHERE "eventId" = ${getMatchQuery.rows[0].eventId} AND "matchStage" = 'Draw' AND "matchRound" = ${getMatchQuery.rows[0].matchRound / 2} AND "matchSequence" = 2`;
                } else {
                    await sql`UPDATE Matches SET "eventPlayer1Id" = ${getMatchQuery.rows[0].loserId} WHERE "eventId" = ${getMatchQuery.rows[0].eventId} AND "matchStage" = 'Draw' AND "matchRound" = ${getMatchQuery.rows[0].matchRound / 2} AND "matchSequence" = 2`;
                };
            };

        } else {
            updateMatchQuery = await sql
                `UPDATE Matches
            SET "player1Verified" = True
            WHERE "matchId" = ${matchId}
            RETURNING *;`;
        };
    };

    PusherServer.trigger(params.channel, "update_match", updateMatchQuery.rows[0]);
    return new Response(JSON.stringify(getMatchQuery.rows));
};
