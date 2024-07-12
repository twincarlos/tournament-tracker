import { sql } from "@vercel/postgres";

export async function POST(req) {
    const data = await req.json();
    const { rows } = await sql `
    INSERT INTO Events (
        "tournamentId",
        "eventName",
        "eventDate",
        "eventTime",
        "eventType",
        "allowUnratedQualify"
    )
    VALUES (
        ${data.tournamentId},
        ${data.eventName},
        ${data.eventDate},
        ${data.eventTime},
        ${data.eventType},
        ${data.allowUnratedQualify}
    )
    RETURNING *;`;
    return new Response(JSON.stringify(rows[0]));
};