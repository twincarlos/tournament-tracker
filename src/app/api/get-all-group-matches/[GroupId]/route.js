export const fetchCache = 'force-no-store';
import { sql } from "@vercel/postgres";

export async function GET(req, { params }) {
    const { rows } = await sql`
    SELECT 
    m."matchId",
    m."matchBestOf",
    m."matchDate",
    m."matchTime",
    m."matchSequence",
    m."g1p1",
    m."g1p2",
    m."g2p1",
    m."g2p2",
    m."g3p1",
    m."g3p2",
    m."g4p1",
    m."g4p2",
    m."g5p1",
    m."g5p2",
    m."g6p1",
    m."g6p2",
    m."g7p1",
    m."g7p2",
    m."player1GamesWon",
    m."player2GamesWon",
    m."matchDefaulted",
    p1."playerId" AS "player1Id",
    p1."playerName" AS "player1Name",
    p1."playerRating" AS "player1Rating",
    p1."playerLocation" AS "player1Location",
    p1."playerClub" AS "player1Club",
    ep1."eventPlayerId" AS "eventPlayer1Id",
    ep1."groupWins" AS "player1GroupWins",
    ep1."groupLosses" AS "player1GroupLosses",
    ep1."groupPosition" AS "player1GroupPosition",
    p2."playerId" AS "player2Id",
    p2."playerName" AS "player2Name",
    p2."playerRating" AS "player2Rating",
    p2."playerLocation" AS "player2Location",
    p2."playerClub" AS "player2Club",
    ep2."eventPlayerId" AS "eventPlayer2Id",
    ep2."groupWins" AS "player2GroupWins",
    ep2."groupLosses" AS "player2GroupLosses",
    ep2."groupPosition" AS "player2GroupPosition",
    e."tournamentId",
    e."eventId",
    e."eventName",
    g."groupId",
    g."groupNumber"
    FROM 
        Matches m
    JOIN
        Groups g ON m."groupId" = g."groupId"
    JOIN 
        EventPlayers ep1 ON m."eventPlayer1Id" = ep1."eventPlayerId"
    JOIN 
        EventPlayers ep2 ON m."eventPlayer2Id" = ep2."eventPlayerId"
    JOIN 
        Players p1 ON ep1."playerId" = p1."playerId"
    JOIN 
        Players p2 ON ep2."playerId" = p2."playerId"
    JOIN
        Events e ON ep1."eventId" = e."eventId"
    WHERE 
        m."groupId" = ${params.groupId}
    ORDER BY 
        m."matchSequence";`;
    return new Response(JSON.stringify(rows));
};