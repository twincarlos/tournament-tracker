import { sql } from "@vercel/postgres";

export async function POST(req) {
    const data = await req.json();
    const { rows } = await sql `
    INSERT INTO Players (
        "tournamentId",
        "playerName",
        "playerRating",
        "playerIsEstimated",
        "playerDOB",
        "playerLocation",
        "playerClub"
    )
    VALUES (
        ${data.tournamentId},
        ${data.playerName},
        ${data.playerRating},
        ${data.playerIsEstimated},
        ${data.playerDOB},
        ${data.playerLocation},
        ${data.playerClub}
    )
    RETURNING *;`;
    return new Response(JSON.stringify(rows[0]));
};