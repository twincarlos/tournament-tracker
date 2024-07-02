export const fetchCache = 'force-no-store';
import { sql } from "@vercel/postgres";

export async function GET(req, { params }) {
    const { rows } = await sql`
    SELECT 
    g."groupId",
    g."groupNumber",
    e."tournamentId",
    e."eventId",
    e."eventName",
    e."eventDate",
    e."eventTime",
    p."playerId",
    p."playerName",
    p."playerRating",
    p."playerLocation",
    p."playerClub",
    ep."eventPlayerId",
    ep."groupWins",
    ep."groupLosses",
    ep."groupPosition"
    FROM Groups g
    JOIN Events e ON g."eventId" = e."eventId"
    JOIN EventPlayers ep ON g."groupId" = ep."groupId"
    JOIN Players p ON ep."playerId" = p."playerId"
    WHERE g."eventId" = ${params.eventId}
    ORDER BY g."groupNumber" ASC, p."playerRating" DESC;`;

    const groups = [];
    let currentGroupNumber;

    for (const group of rows) {
        if (currentGroupNumber === group.groupNumber) {
            groups[groups.length - 1].groupPlayers.push({
                playerId: group.playerId,
                eventPlayerId: group.eventPlayerId,
                groupWins: group.groupWins,
                groupLosses: group.groupLosses,
                groupPosition: group.groupPosition,
                playerName: group.playerName,
                playerRating: group.playerRating,
                playerIsEstimated: group.playerIsEstimated,
                playerDOB: group.playerDOB,
                playerLocation: group.playerLocation,
                playerClub: group.playerClub
            });
        } else {
            groups.push({
                tournamentId: group.tournamentId,
                eventId: group.eventId,
                eventName: group.eventName,
                eventDate: group.eventDate,
                eventTime: group.eventTime,
                groupId: group.groupId,
                groupNumber: group.groupNumber,
                groupDate: group.groupDate,
                groupTime: group.groupTime,
                groupStatus: group.groupStatus,
                groupPlayers: [{
                    playerId: group.playerId,
                    eventPlayerId: group.eventPlayerId,
                    groupWins: group.groupWins,
                    groupLosses: group.groupLosses,
                    groupPosition: group.groupPosition,
                    playerName: group.playerName,
                    playerRating: group.playerRating,
                    playerIsEstimated: group.playerIsEstimated,
                    playerDOB: group.playerDOB,
                    playerLocation: group.playerLocation,
                    playerClub: group.playerClub
                }]
            });
            currentGroupNumber = group.groupNumber;
        };
    };
    return new Response(JSON.stringify(groups));
};