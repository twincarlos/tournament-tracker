import { sql } from "@vercel/postgres";
import { generateGroups } from "./utils";

export async function POST(req) {
    const data = await req.json();
    const eventId = data.eventId;

    const eventPlayersQuery = await sql`
    SELECT ep.*, p.*
    FROM EventPlayers ep
    JOIN Players p ON p."playerId" = ep."playerId"
    WHERE ep."eventId" = ${eventId}
    ORDER BY p."playerRating" DESC;`;

    const groups = generateGroups(eventPlayersQuery.rows);
    const groupsData = [];

    for (let i = 0; i < groups.length; i++) {
        const group = groups[i];
        const groupQuery = await sql`
        INSERT INTO Groups (
            "eventId",
            "groupNumber"
        )
        VALUES (
            ${eventId},
            ${Number(i + 1)}
        )
        RETURNING *`;
        groupsData.push({ ...groupQuery.rows[0], groupPlayers: [], tables: [] });
        for (const eventPlayer of group) {
            const eventPlayerQuery = await sql`UPDATE EventPlayers ep SET "groupId" = ${groupQuery.rows[0].groupId} FROM Players p WHERE ep."playerId" = p."playerId" AND "eventPlayerId" = ${eventPlayer.eventPlayerId} RETURNING ep.*, p.*`;
            groupsData[groupsData.length - 1].groupPlayers.push(eventPlayerQuery.rows[0]);
        };
    };

    return new Response(JSON.stringify(groupsData));
};