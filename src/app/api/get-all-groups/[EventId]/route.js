export const fetchCache = 'force-no-store';
import { sql } from "@vercel/postgres";

export async function GET(req, { params }) {
    const { rows } = await sql`
    SELECT 
    g.id AS "groupId",
    g.number AS "groupNumber",
    g.date AS "groupDate",
    g.time AS "groupTime",
    g.status AS "groupStatus",
    e.tournament_id AS "tournamentId",
    e.id AS "eventId",
    e.name AS "eventName",
    e.date AS "eventDate",
    e.time AS "eventTime",
    e.type AS "eventType",
    e.status AS "eventStatus",
    e.stage AS "eventStage",
    p.id AS "playerId",
    p.name AS "playerName",
    p.rating AS "playerRating",
    p.is_estimated AS "playerIsEstimated",
    p.dob AS "playerDOB",
    p.location AS "playerLocation",
    p.club AS "playerClub",
    ep.id AS "eventPlayerId",
    ep.group_wins AS "groupWins",
    ep.group_losses AS "groupLosses",
    ep.group_position AS "groupPosition"
    FROM Groups g
    JOIN Events e ON g.event_id = e.id
    JOIN EventPlayers ep ON g.id = ep.group_id
    JOIN Players p ON ep.player_id = p.id
    WHERE g.event_id = ${params.eventId}
    ORDER BY g.number ASC, p.rating DESC;`;

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