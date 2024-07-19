export const fetchCache = 'force-no-store';
import { sql } from "@vercel/postgres";

export async function POST(req) {
    const data = await req.json();
    const player = await sql `SELECT * FROM Players WHERE "playerId" = ${data.playerId};`;
    if (player.rows[0].playerDOB == data.playerDOB) {
        return new Response(JSON.stringify(player.rows[0]));
    } else {
        return new Response(JSON.stringify(false));
    };
};