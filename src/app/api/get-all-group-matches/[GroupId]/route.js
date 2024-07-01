export const fetchCache = 'force-no-store';
import { sql } from "@vercel/postgres";

export async function GET(req, { params }) {
    const { rows } = await sql `
    SELECT 
    m.*,
    p1.PlayerId AS Player1Id,
    p1.PlayerName AS Player1Name,
    p1.PlayerRating AS Player1Rating,
    p1.PlayerIsEstimated AS Player1IsEstimated,
    ep1.EventPlayerId AS EventPlayer1Id,
    ep1.GroupWins AS Player1GroupWins,
    ep1.GroupLosses AS Player1GroupLosses,
    ep1.GroupPosition AS Player1GroupPosition,
    p2.PlayerId AS Player2Id,
    p2.PlayerName AS Player2Name,
    p2.PlayerRating AS Player2Rating,
    p2.PlayerIsEstimated AS Player2IsEstimated,
    ep2.EventPlayerId AS EventPlayer2Id,
    ep2.GroupWins AS Player2GroupWins,
    ep2.GroupLosses AS Player2GroupLosses,
    ep2.GroupPosition AS Player2GroupPosition,
    e.EventName AS EventName,
    g.GroupNumber AS GroupNumber
    FROM 
        Matches m
    JOIN
        Groups g ON m.GroupId = g.GroupId
    JOIN 
        EventPlayers ep1 ON m.EventPlayer1Id = ep1.EventPlayerId
    JOIN 
        EventPlayers ep2 ON m.EventPlayer2Id = ep2.EventPlayerId
    JOIN 
        Players p1 ON ep1.PlayerId = p1.PlayerId
    JOIN 
        Players p2 ON ep2.PlayerId = p2.PlayerId
    JOIN
        Events e ON ep1.EventId = e.EventId
    WHERE 
        m.GroupId = ${params.GroupId}
    ORDER BY 
        m.MatchSequence;`;
    return new Response(JSON.stringify(rows));
};