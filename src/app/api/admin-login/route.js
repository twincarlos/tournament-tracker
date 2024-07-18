export const fetchCache = 'force-no-store';
import { sql } from "@vercel/postgres";

export async function POST(req) {
    const data = await req.json();
    const player = await sql `SELECT * FROM Players WHERE "playerId" = ${data.playerId};`;
    console.log(data, player.rows[0])
    if (player.rows[0].playerDOB == data.playerDOB) {
        return new Response(JSON.stringify(true));
    } else {
        return new Response(JSON.stringify(false));
    };
};