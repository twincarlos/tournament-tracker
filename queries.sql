-- LIST ALL TOURNAMENTS
SELECT * FROM Tournaments;



-- LIST ALL EVENTS
SELECT * FROM Events;

-- GET EVENT BY EVENT ID
SELECT * FROM Events WHERE EventId = EventId;

-- LIST GROUPS OF EVENT BY EVENT ID
SELECT 
    g.*,
    p.*,
    ep.*
FROM 
    Groups g
JOIN 
    EventPlayers ep ON g.GroupId = ep.GroupId
JOIN 
    Players p ON ep.PlayerId = p.PlayerId
WHERE 
    g.EventId = EventId
ORDER BY 
    g.GroupNumber, p.PlayerRating;

-- CHANGE EVENT DATE
UPDATE Events
SET EventDate = EventDate
WHERE EventId = EventId;
RETURNING *;

-- CHANGE EVENT STATUS
UPDATE Events
SET EventStatus = EventStatus
WHERE EventId = EventId;
RETURNING *;

-- CHANGE EVENT STAGE
UPDATE Events
SET EventStage = EventStage
WHERE EventId = EventId;
RETURNING *;



-- LIST MATCHES IN A GROUP BY GROUP ID
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
    ep2.GroupPosition AS Player2GroupPosition
FROM 
    Matches m
JOIN 
    EventPlayers ep1 ON m.EventPlayer1Id = ep1.EventPlayerId
JOIN 
    EventPlayers ep2 ON m.EventPlayer2Id = ep2.EventPlayerId
JOIN 
    Players p1 ON ep1.PlayerId = p1.PlayerId
JOIN 
    Players p2 ON ep2.PlayerId = p2.PlayerId
WHERE 
    m.GroupId = GroupId
ORDER BY 
    m.MatchSequence;

-- CHANGE GROUP STATUS
UPDATE Groups
SET GroupStatus = GroupStatus
WHERE GroupId = GroupId
RETURNING *;




-- GET MATCH
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
    ep2.GroupPosition AS Player2GroupPosition
FROM 
    Matches m
JOIN 
    EventPlayers ep1 ON m.EventPlayer1Id = ep1.EventPlayerId
JOIN 
    EventPlayers ep2 ON m.EventPlayer2Id = ep2.EventPlayerId
JOIN 
    Players p1 ON ep1.PlayerId = p1.PlayerId
JOIN 
    Players p2 ON ep2.PlayerId = p2.PlayerId
WHERE 
    m.MatchId = MatchId

-- CHANGE MATCH STATUS
UPDATE Matches
SET MatchStatus = MatchStatus
WHERE MatchId = MatchId
RETURNING *;

-- FINISH MATCH
UPDATE Matches
SET
    WinnerId = WinnerId,
    LoserId = LoserId,
    MatchStatus = 'Finished',
    Player1GamesWon = Player1GamesWon,
    Player2GamesWon = Player2GamesWon
WHERE MatchId = MatchId
RETURNING *;