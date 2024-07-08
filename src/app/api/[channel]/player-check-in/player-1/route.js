import { sql } from "@vercel/postgres";
import { PusherServer } from "../../../../../../pusher";

export async function PUT(req, { params }) {
    const { matchId } = await req.json();
    const getMatchQuery = await sql`SELECT "player2Ready", "matchStatus" FROM Matches WHERE "matchId" = ${matchId}`;
    const updateMatchQuery = await sql
    `UPDATE Matches
    SET
        "player1Ready" = True,
        "matchStatus" = ${getMatchQuery.rows[0].player2Ready === true ? "In Progress" : getMatchQuery.rows[0].matchStatus}
    WHERE
        "matchId" = ${matchId}
    RETURNING *;`;
    PusherServer.trigger(params.channel, "update_match", updateMatchQuery.rows[0]);
    return new Response(JSON.stringify(getMatchQuery.rows));
};