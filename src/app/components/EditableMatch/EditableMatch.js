"use client";
import './EditableMatch.css';
import PlayerInfo from '../PlayerInfo/PlayerInfo';
import { useMatch } from '@/app/context/MatchContext';
import { useSubscribe } from '@/app/hooks/useSubscribe';

export default function EditableMatch({ match }) {
    const { setMatch } = useMatch();

    useSubscribe(
        `match_${match.matchId}`,
        "update_match",
        data => setMatch({ ...match, ...data })
    );
    
    async function playerCheckIn(playerNumber) {
        setMatch({ ...match, [`player${playerNumber}Ready`]: true });
        await fetch(`/api/update-match/match_${match.matchId}/player-check-in/player-${playerNumber}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
                'Expires': '0'
            },
            body: JSON.stringify({ matchId: match.matchId, groupId: match.groupId })
        });
    };
    async function updateGameScore(gameNumber, score) {
        setMatch({ ...match, [gameNumber]: score, player1Verified: false, player2Verified: false });
        await fetch(`/api/update-match/match_${match.matchId}/score-update/${gameNumber}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
                'Expires': '0'
            },
            body: JSON.stringify({ matchId: match.matchId, score })
        });
    };
    async function verifyScores(playerNumber) {
        setMatch({ ...match, [`player${playerNumber}Verified`]: true });
        await fetch(`/api/update-match/match_${match.matchId}/verify-scores/player-${playerNumber}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
                'Expires': '0'
            },
            body: JSON.stringify({ matchId: match.matchId, groupId: match.groupId })
        });
    };

    return (
        <>
            <div className="card match-card">
                <div className="card-header">
                    <div className="card-header-info">
                        <p>{match.eventName} • Group {match.groupNumber}</p>
                        <span className={`card-bubble ${match.matchStatus}`}>{match.matchStatus}</span>
                    </div>
                    <div className="card-header-tables">
                    <p>
                        {
                            match.tables && match.tables.length > 0 ? (
                                `Table${match.tables.length > 1 ? "s" : ""} ${match.tables.map(table => table.tableNumber).join(", ")}`
                            ) : "No table"
                        }
                    </p>
                </div>
                </div>
                <div className="match-card-body">
                    <div className="player-section">
                        {
                            match.matchStatus === "Ready" ? (
                                <div className="player-buttons">
                                    <button
                                        className="check-in-button"
                                        disabled={match.player1Ready}
                                        onClick={() => playerCheckIn(1)}>
                                        <i className="fa-solid fa-user-check" /> Check In
                                    </button>
                                </div>
                            ) : null
                        }
                        {
                            match.matchStatus === "Pending" ? (
                                <div className="player-buttons">
                                    <button
                                        className="check-in-button"
                                        disabled={match.player1Verified}
                                        onClick={() => verifyScores(1)}>
                                        <i className="fa-solid fa-check" /> Verify
                                    </button>
                                </div>
                            ) : null
                        }
                        <PlayerInfo player={{
                            eventPlayerId: match.eventPlayer1Id,
                            playerName: match.player1Name,
                            playerRating: match.player1Rating,
                            playerClub: match.player1Club,
                            playerLocation: match.player1Location
                        }} />
                        {
                            (match.winnerId && match.winnerId === match.eventPlayer1Id) ? (
                                <div className="winner-icon">
                                    <i className="fa-solid fa-trophy" />
                                </div>
                            ) : null
                        }
                    </div>
                    <div className="match-player-scores">
                        <div className="match-game-counter match-game-score">
                            <p>{match.player1GamesWon}</p>
                        </div>
                        <div className="match-game-score">
                            <input
                                type="number"
                                disabled={match.matchStatus !== "In Progress" && match.matchStatus !== "Pending"}
                                value={match.g1p1 === null ? "" : match.g1p1}
                                onChange={e => updateGameScore("g1p1", e.target.value === "" ? null : Number(e.target.value))}
                            />
                        </div>
                        <div className="match-game-score">
                            <input
                                type="number"
                                disabled={match.matchStatus !== "In Progress" && match.matchStatus !== "Pending"}
                                value={match.g2p1 === null ? "" : match.g2p1}
                                onChange={e => updateGameScore("g2p1", e.target.value === "" ? null : Number(e.target.value))}
                            />
                        </div>
                        <div className="match-game-score">
                            <input
                                type="number"
                                disabled={match.matchStatus !== "In Progress" && match.matchStatus !== "Pending"}
                                value={match.g3p1 === null ? "" : match.g3p1}
                                onChange={e => updateGameScore("g3p1", e.target.value === "" ? null : Number(e.target.value))}
                            />
                        </div>
                        <div className="match-game-score">
                            <input
                                type="number"
                                disabled={match.matchStatus !== "In Progress" && match.matchStatus !== "Pending"}
                                value={match.g4p1 === null ? "" : match.g4p1}
                                onChange={e => updateGameScore("g4p1", e.target.value === "" ? null : Number(e.target.value))}
                            />
                        </div>
                        <div className="match-game-score">
                            <input
                                type="number"
                                disabled={match.matchStatus !== "In Progress" && match.matchStatus !== "Pending"}
                                value={match.g5p1 === null ? "" : match.g5p1}
                                onChange={e => updateGameScore("g5p1", e.target.value === "" ? null : Number(e.target.value))}
                            />
                        </div>
                        {
                            match.matchBestOf === 7 ? (
                                <>
                                    <div className="match-game-score">
                                        <input
                                            type="number"
                                            disabled={match.matchStatus !== "In Progress" && match.matchStatus !== "Pending"}
                                            value={match.g6p1 === null ? "" : match.g6p1}
                                            onChange={e => updateGameScore("g6p1", e.target.value === "" ? null : Number(e.target.value))}
                                        />
                                    </div>
                                    <div className="match-game-score">
                                        <input
                                            type="number"
                                            disabled={match.matchStatus !== "In Progress" && match.matchStatus !== "Pending"}
                                            value={match.g7p1 === null ? "" : match.g7p1}
                                            onChange={e => updateGameScore("g7p1", e.target.value === "" ? null : Number(e.target.value))}
                                        />
                                    </div>
                                </>
                            ) : null
                        }
                    </div>
                    <div className="match-player-scores">
                        <div className="match-game-counter match-game-score">
                            <p>{match.player2GamesWon}</p>
                        </div>
                        <div className="match-game-score">
                            <input
                                type="number"
                                disabled={match.matchStatus !== "In Progress" && match.matchStatus !== "Pending"}
                                value={match.g1p2 === null ? "" : match.g1p2}
                                onChange={e => updateGameScore("g1p2", e.target.value === "" ? null : Number(e.target.value))}
                            />
                        </div>
                        <div className="match-game-score">
                            <input
                                type="number"
                                disabled={match.matchStatus !== "In Progress" && match.matchStatus !== "Pending"}
                                value={match.g2p2 === null ? "" : match.g2p2}
                                onChange={e => updateGameScore("g2p2", e.target.value === "" ? null : Number(e.target.value))}
                            />
                        </div>
                        <div className="match-game-score">
                            <input
                                type="number"
                                disabled={match.matchStatus !== "In Progress" && match.matchStatus !== "Pending"}
                                value={match.g3p2 === null ? "" : match.g3p2}
                                onChange={e => updateGameScore("g3p2", e.target.value === "" ? null : Number(e.target.value))}
                            />
                        </div>
                        <div className="match-game-score">
                            <input
                                type="number"
                                disabled={match.matchStatus !== "In Progress" && match.matchStatus !== "Pending"}
                                value={match.g4p2 === null ? "" : match.g4p2}
                                onChange={e => updateGameScore("g4p2", e.target.value === "" ? null : Number(e.target.value))}
                            />
                        </div>
                        <div className="match-game-score">
                            <input
                                type="number"
                                disabled={match.matchStatus !== "In Progress" && match.matchStatus !== "Pending"}
                                value={match.g5p2 === null ? "" : match.g5p2}
                                onChange={e => updateGameScore("g5p2", e.target.value === "" ? null : Number(e.target.value))}
                            />
                        </div>
                        {
                            match.matchBestOf === 7 ? (
                                <>
                                    <div className="match-game-score">
                                        <input
                                            type="number"
                                            disabled={match.matchStatus !== "In Progress" && match.matchStatus !== "Pending"}
                                            value={match.g6p2 === null ? "" : match.g6p2}
                                            onChange={e => updateGameScore("g6p2", e.target.value === "" ? null : Number(e.target.value))}
                                        />
                                    </div>
                                    <div className="match-game-score">
                                        <input
                                            type="number"
                                            disabled={match.matchStatus !== "In Progress" && match.matchStatus !== "Pending"}
                                            value={match.g7p2 === null ? "" : match.g7p2}
                                            onChange={e => updateGameScore("g7p2", e.target.value === "" ? null : Number(e.target.value))}
                                        />
                                    </div>
                                </>
                            ) : null
                        }
                    </div>
                    <div className="player-section">
                        {
                            match.matchStatus === "Ready" ? (
                                <div className="player-buttons">
                                    <button
                                        className="check-in-button"
                                        disabled={match.player2Ready}
                                        onClick={() => playerCheckIn(2)}>
                                        <i className="fa-solid fa-user-check" /> Check In
                                    </button>
                                </div>
                            ) : null
                        }
                        {
                            match.matchStatus === "Pending" ? (
                                <div className="player-buttons">
                                    <button
                                        className="check-in-button"
                                        disabled={match.player2Verified}
                                        onClick={() => verifyScores(2)}>
                                        <i className="fa-solid fa-check" /> Verify
                                    </button>
                                </div>
                            ) : null
                        }
                        <PlayerInfo player={{
                            eventPlayerId: match.eventPlayer2Id,
                            playerName: match.player2Name,
                            playerRating: match.player2Rating,
                            playerClub: match.player2Club,
                            playerLocation: match.player2Location
                        }} />
                        {
                            (match.winnerId && match.winnerId === match.eventPlayer2Id) ? (
                                <div className="winner-icon">
                                    <i className="fa-solid fa-trophy" />
                                </div>
                            ) : null
                        }
                    </div>
                </div>
            </div>
        </>
    );
};