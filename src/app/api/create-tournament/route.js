import { sql } from "@vercel/postgres";

export async function POST(req) {
    const data = await req.json();
    const { rows } = await sql `
    INSERT INTO Tournaments (
        "tournamentName",
        "tournamentDate"
    )
    VALUES (
        ${data.tournamentName},
        ${data.tournamentDate}
    )
    RETURNING *;`;
    for (let i = 1; i <= 18; i++) {
        await sql`
        INSERT INTO Tables (
            "tournamentId",
            "tableNumber"
        )
        VALUES (
            ${rows[0].tournamentId},
            ${i}
        );`;
    };
    return new Response(JSON.stringify(rows[0]));
};