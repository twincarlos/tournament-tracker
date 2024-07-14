export const fetchCache = 'force-no-store';
import { sql } from "@vercel/postgres";
import { PusherServer } from "../../../../../../../pusher";

export async function PUT(req, { params }) {
    const { matchId, groupId } = await req.json();

    const getMatchQuery = await sql`SELECT "player2Ready", "matchStatus" FROM Matches WHERE "matchId" = ${matchId}`;
    if (getMatchQuery.rows[0].player2Ready === true) {
        const matchesInGroupQuery = await sql`SELECT COUNT("matchStatus") FROM Matches WHERE ("groupId" = ${groupId}) AND ("matchStatus" = 'In Progress' OR "matchStatus" = 'Pending' OR "matchStatus" = 'Finished');`;
        if (Number(matchesInGroupQuery.rows[0].count) === 0) await sql`UPDATE Groups SET "groupStatus" = 'In Progress' WHERE "groupId" = ${groupId};`;

        const updateMatchQuery = await sql
        `UPDATE Matches
        SET
        "player1Ready" = True,
        "matchStatus" = 'In Progress'
        WHERE
            "matchId" = ${matchId}
        RETURNING *;`;
        PusherServer.trigger(params.channel, "update_match", updateMatchQuery.rows[0]);
        return new Response(JSON.stringify(getMatchQuery.rows));
    } else {
        const updateMatchQuery = await sql
        `UPDATE Matches
        SET
        "player1Ready" = True,
        "matchStatus" = ${getMatchQuery.rows[0].matchStatus}
        WHERE
            "matchId" = ${matchId}
        RETURNING *;`;
        PusherServer.trigger(params.channel, "update_match", updateMatchQuery.rows[0]);
        return new Response(JSON.stringify(getMatchQuery.rows));
    };
};