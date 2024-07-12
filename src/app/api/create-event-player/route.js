import { sql } from "@vercel/postgres";

export async function POST(req) {
    const data = await req.json();
    const eventPlayers = [];
    for (const playerId of data.playerIds) {
        const { rows } = await sql `
        INSERT INTO EventPlayers (
            "playerId",
            "eventId"
        )
        VALUES (
            ${playerId},
            ${data.eventId}
        )
        RETURNING *;`;
        eventPlayers.push(rows[0]);
    };
    return new Response(JSON.stringify(eventPlayers));
};