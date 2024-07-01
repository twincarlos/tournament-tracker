import { sql } from "@vercel/postgres";

export async function GET(req, { params }) {
    const { rows } = await sql `SELECT * FROM Tournaments WHERE tournamentid = ${params.TournamentId};`;
    return new Response(JSON.stringify(rows));
};