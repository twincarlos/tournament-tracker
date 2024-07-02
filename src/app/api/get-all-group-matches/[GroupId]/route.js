export const fetchCache = 'force-no-store';
import { sql } from "@vercel/postgres";

export async function GET(req, { params }) {
    const { rows } = await sql`
    SELECT 
    m.id AS "matchId",
    m.best_of AS "bestOf",
    m.date AS "matchDate",
    m.time AS "matchTime",
    m.status AS "matchStatus",
    m.stage AS "matchStage",
    m.round AS "matchRound",
    m.sequence AS "matchSequence",
    m.g1p1,
    m.g1p2,
    m.g2p1,
    m.g2p2,
    m.g3p1,
    m.g3p2,
    m.g4p1,
    m.g4p2,
    m.g5p1,
    m.g5p2,
    m.g6p1,
    m.g6p2,
    m.g7p1,
    m.g7p2,
    m.player1_games_won AS "player1GamesWon",
    m.player2_games_won AS "player2GamesWon",
    m.match_defaulted AS "matchDefaulted",
    p1.id AS "player1Id",
    p1.name AS "player1Name",
    p1.rating AS "player1Rating",
    p1.is_estimated AS "player1IsEstimated",
    p1.dob AS "player1DOB",
    p1.location AS "player1Location",
    p1.club AS "player1Club",
    ep1.id AS "eventPlayer1Id",
    ep1.group_wins AS "player1GroupWins",
    ep1.group_losses AS "player1GroupLosses",
    ep1.group_position AS "player1GroupPosition",
    p2.id AS "player2Id",
    p2.name AS "player2Name",
    p2.rating AS "player2Rating",
    p2.is_estimated AS "player2IsEstimated",
    p2.dob AS "player2DOB",
    p2.location AS "player2Location",
    p2.club AS "player2Club",
    ep2.id AS "eventPlayer2Id",
    ep2.group_wins AS "player2GroupWins",
    ep2.group_losses AS "player2GroupLosses",
    ep2.group_position AS "player2GroupPosition",
    e.tournament_id AS "tournamentId",
    e.id AS "eventId",
    e.name AS "eventName",
    e.date AS "eventDate",
    e.time AS "eventTime",
    e.type AS "eventType",
    e.status AS "eventStatus",
    e.stage AS "eventStage",
    g.id AS "groupId",
    g.number AS "groupNumber",
    g.date AS "groupDate",
    g.time AS "groupTime",
    g.status AS "groupStatus"
    FROM 
        Matches m
    JOIN
        Groups g ON m.group_id = g.id
    JOIN 
        EventPlayers ep1 ON m.event_player1_id = ep1.id
    JOIN 
        EventPlayers ep2 ON m.event_player2_id = ep2.id
    JOIN 
        Players p1 ON ep1.player_id = p1.id
    JOIN 
        Players p2 ON ep2.player_id = p2.id
    JOIN
        Events e ON ep1.event_id = e.id
    WHERE 
        m.group_id = ${params.groupId}
    ORDER BY 
        m.sequence;`;
    return new Response(JSON.stringify(rows));
};