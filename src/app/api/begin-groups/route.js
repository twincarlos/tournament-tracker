export const fetchCache = 'force-no-store';
import { sql } from "@vercel/postgres";

export async function PUT(req) {
    const data = await req.json();
    await sql `UPDATE Groups SET "groupStatus" = 'Ready' WHERE "eventId" = ${data.eventId} RETURNING *;`;
    await sql `UPDATE Matches SET "matchStatus" = 'Ready' WHERE "eventId" = ${data.eventId} AND "matchStage" = 'Groups';`;
    return new Response(JSON.stringify({}));
};