export const fetchCache = 'force-no-store';
import { sql } from "@vercel/postgres";
import { generateGroups, orderOfPlay } from "./utils";

export async function POST(req) {
    const data = await req.json();
    const eventId = data.eventId;
    const eventType = data.eventType;

    const eventPlayersQuery = await sql`
    SELECT ep.*, p.*
    FROM EventPlayers ep
    JOIN Players p ON p."playerId" = ep."playerId"
    WHERE ep."eventId" = ${eventId}
    ORDER BY p."playerRating" DESC;`;

    const groupsData = [];

    if (eventType === "RR") {
        const groups = generateGroups(eventPlayersQuery.rows, eventType);
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
            RETURNING *;`;
            groupsData.push({ ...groupQuery.rows[0], groupPlayers: [], tables: [] });
            for (const eventPlayer of group) {
                const eventPlayerQuery = await sql`UPDATE EventPlayers ep SET "groupId" = ${groupQuery.rows[0].groupId} FROM Players p WHERE ep."playerId" = p."playerId" AND "eventPlayerId" = ${eventPlayer.eventPlayerId} RETURNING ep.*, p.*;`;
                groupsData[groupsData.length - 1].groupPlayers.push(eventPlayerQuery.rows[0]);
            };
        };
    };

    if (eventType === "GRR") {
        const group1 = await sql`INSERT INTO Groups ("eventId", "groupNumber") VALUES(${eventId}, ${Number(1)}) RETURNING *;`;
        const group2 = await sql`INSERT INTO Groups ("eventId", "groupNumber") VALUES(${eventId}, ${Number(2)}) RETURNING *;`;
        const group3 = await sql`INSERT INTO Groups ("eventId", "groupNumber") VALUES(${eventId}, ${Number(3)}) RETURNING *;`;
        const group4 = await sql`INSERT INTO Groups ("eventId", "groupNumber") VALUES(${eventId}, ${Number(4)}) RETURNING *;`;
        groupsData.push({...group1.rows[0], groupPlayers: [], tables: []});
        groupsData.push({...group2.rows[0], groupPlayers: [], tables: []});
        groupsData.push({...group3.rows[0], groupPlayers: [], tables: []});
        groupsData.push({...group4.rows[0], groupPlayers: [], tables: []});

        if (eventPlayersQuery.rows.length === 44) {
            let counter = 1;
            for (let i = 1; i <= 44; i++) {
                const eventPlayerQuery = await sql`UPDATE EventPlayers ep SET "groupId" = ${groupsData[counter - 1].groupId} FROM Players p WHERE ep."playerId" = p."playerId" AND "eventPlayerId" = ${eventPlayersQuery.rows[i - 1].eventPlayerId} RETURNING ep.*, p.*;`;
                groupsData[counter - 1].groupPlayers.push(eventPlayerQuery.rows[0]);
                if (i === 11 || i === 22 || i === 33 || i === 44) counter++; 
            };
        }
        else if (eventPlayersQuery.rows.length === 43) {
            let counter = 1;
            for (let i = 1; i <= 43; i++) {
                const eventPlayerQuery = await sql`UPDATE EventPlayers ep SET "groupId" = ${groupsData[counter - 1].groupId} FROM Players p WHERE ep."playerId" = p."playerId" AND "eventPlayerId" = ${eventPlayersQuery.rows[i - 1].eventPlayerId} RETURNING ep.*, p.*;`;
                groupsData[counter - 1].groupPlayers.push(eventPlayerQuery.rows[0]);
                if (((counter === 1) && (i === 10)) || (((counter > 1) && (i === 21 || i === 32 || i === 43)))) counter++;
            };
        }
        else if (eventPlayersQuery.rows.length === 42) {
            let counter = 1;
            for (let i = 1; i <= 42; i++) {
                const eventPlayerQuery = await sql`UPDATE EventPlayers ep SET "groupId" = ${groupsData[counter - 1].groupId} FROM Players p WHERE ep."playerId" = p."playerId" AND "eventPlayerId" = ${eventPlayersQuery.rows[i - 1].eventPlayerId} RETURNING ep.*, p.*;`;
                groupsData[counter - 1].groupPlayers.push(eventPlayerQuery.rows[0]);
                if (((counter <= 2) && (i === 10 || i === 20)) || (((counter > 2) && (i === 31 || i === 42)))) counter++;
            };
        }
        else if (eventPlayersQuery.rows.length === 41) {
            let counter = 1;
            for (let i = 1; i <= 41; i++) {
                const eventPlayerQuery = await sql`UPDATE EventPlayers ep SET "groupId" = ${groupQuery.rows[counter - 1].groupId} FROM Players p WHERE ep."playerId" = p."playerId" AND "eventPlayerId" = ${eventPlayersQuery.rows[i - 1].eventPlayerId} RETURNING ep.*, p.*;`;
                groupsData[counter - 1].groupPlayers.push(eventPlayerQuery.rows[0]);
                if (((counter <= 3) && (i === 10 || i === 20 || i === 30)) || (((counter > 3) && (i === 41)))) counter++;
            };
        }
        else if (eventPlayersQuery.rows.length === 40) {
            let counter = 1;
            for (let i = 1; i <= 40; i++) {
                const eventPlayerQuery = await sql`UPDATE EventPlayers ep SET "groupId" = ${groupsData[counter - 1].groupId} FROM Players p WHERE ep."playerId" = p."playerId" AND "eventPlayerId" = ${eventPlayersQuery.rows[i - 1].eventPlayerId} RETURNING ep.*, p.*;`;
                groupsData[counter - 1].groupPlayers.push(eventPlayerQuery.rows[0]);
                if (i === 10 || i === 20 || i === 30 || i === 40) counter++; 
            };
        };
    };

    for (const group of groupsData) {
        const sequence = orderOfPlay(group.groupPlayers.length);
        for (let i = 0; i < sequence.length; i++) {
            const matchSequence = sequence[i];
            await sql`
            INSERT INTO Matches (
            "groupId",
            "eventPlayer1Id",
            "eventPlayer2Id",
            "matchStage",
            "matchSequence",
            "eventId"
            )
            VALUES (
            ${group.groupId},
            ${group.groupPlayers[matchSequence[0] - 1].eventPlayerId},
            ${group.groupPlayers[matchSequence[1] - 1].eventPlayerId},
            'Groups',
            ${i + 1},
            ${eventId}
            );`;
        };
    };

    await sql `UPDATE Events SET "eventStage" = 'Groups' WHERE "eventId" = ${eventId}`;

    return new Response(JSON.stringify(groupsData));
};