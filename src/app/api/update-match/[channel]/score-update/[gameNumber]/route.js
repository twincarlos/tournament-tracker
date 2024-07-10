import { sql } from "@vercel/postgres";
import { PusherServer } from "../../../../../../../pusher";
import { updateGameScore } from "./utils";

export async function PUT(req, { params }) {
    const { matchId, score } = await req.json();
    const getMatchQuery = await sql`
    SELECT
    "player1GamesWon",
    "player2GamesWon",
    "g1p1",
    "g1p2",
    "g2p1",
    "g2p2",
    "g3p1",
    "g3p2",
    "g4p1",
    "g4p2",
    "g5p1",
    "g5p2",
    "g6p1",
    "g6p2",
    "g7p1",
    "g7p2",
    "matchBestOf",
    "eventPlayer1Id",
    "eventPlayer2Id"
    FROM Matches
    WHERE "matchId" = ${matchId}`;

    const match = updateGameScore({ ...getMatchQuery.rows[0], [params.gameNumber || params.GameNumber]: score });

    const updateMatchQuery = await sql
    `UPDATE Matches
    SET
        "player1GamesWon" = ${match.player1GamesWon},
        "player2GamesWon" = ${match.player2GamesWon},
        "g1p1" = ${match.g1p1},
        "g1p2" = ${match.g1p2},
        "g2p1" = ${match.g2p1},
        "g2p2" = ${match.g2p2},
        "g3p1" = ${match.g3p1},
        "g3p2" = ${match.g3p2},
        "g4p1" = ${match.g4p1},
        "g4p2" = ${match.g4p2},
        "g5p1" = ${match.g5p1},
        "g5p2" = ${match.g5p2},
        "g6p1" = ${match.g6p1},
        "g6p2" = ${match.g6p2},
        "g7p1" = ${match.g7p1},
        "g7p2" = ${match.g7p2},
        "matchStatus" = ${match.matchStatus},
        "player1Verified" = false,
        "player2Verified" = false,
        "winnerId" = ${match.winnerId},
        "loserId" = ${match.loserId}
    WHERE
        "matchId" = ${matchId}
    RETURNING *;`;

    PusherServer.trigger(params.channel, "update_match", updateMatchQuery.rows[0]);
    return new Response(JSON.stringify(getMatchQuery.rows));
};