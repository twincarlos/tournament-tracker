export const fetchCache = 'force-no-store';
import { sql } from "@vercel/postgres";

export async function PUT(req) {
    const data = await req.json();
    await sql `UPDATE Groups SET "groupStatus" = 'Ready' WHERE "eventId" = ${data.eventId};`;
    await sql `UPDATE Matches SET "matchStatus" = 'Ready' WHERE "eventId" = ${data.eventId} AND "matchStage" = 'Groups';`;
    await sql `UPDATE Events SET "eventStatus" = 'In Progress', "eventStage" = 'Groups' WHERE "eventId" = ${data.eventId};`;
    return new Response(JSON.stringify({}));
};