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
        data => setMatch(data)
    );
    function playerCheckIn(playerNumber) {
        if (playerNumber === 1) {
            setMatch({ ...match, player1Ready: true, matchStatus: match.player2Ready ? "In Progress" : match.matchStatus });
        } else {
            setMatch({ ...match, player2Ready: true, matchStatus: match.player1Ready ? "In Progress" : match.matchStatus });
        };
    };
    function checkIfGameScoreIsValid(score1, score2) {
        if (score1 === null || score2 === null) return false;
        if (score1 === 11 && (score2 >= 0 && score2 <= 9)) return true;
        if (score2 === 11 && (score1 >= 0 && score1 <= 9)) return true;
        if ((score1 > 11 || score2 > 11) && (Math.abs(score1 - score2) === 2)) return true;
        return false;
    };
    function updateGameScore(gameNumber, playerNumber, score) {
        const updatedMatch = { ...match, [`g${gameNumber}p${playerNumber}`]: score === "" ? null : Number(score) };
        let player1GamesWon = 0;
        let player2GamesWon = 0;
        let scoresAreValid = true;

        // GAME 1
        if (checkIfGameScoreIsValid(updatedMatch.g1p1, updatedMatch.g1p2)) {
            if (updatedMatch.g1p1 > updatedMatch.g1p2) player1GamesWon++;
            if (updatedMatch.g1p1 < updatedMatch.g1p2) player2GamesWon++;
        } else {
            scoresAreValid = false;
        };
        // GAME 2
        if (checkIfGameScoreIsValid(updatedMatch.g2p1, updatedMatch.g2p2)) {
            if (updatedMatch.g2p1 > updatedMatch.g2p2) player1GamesWon++;
            if (updatedMatch.g2p1 < updatedMatch.g2p2) player2GamesWon++;
        } else {
            scoresAreValid = false;
        };
        // GAME 3
        if (checkIfGameScoreIsValid(updatedMatch.g3p1, updatedMatch.g3p2)) {
            if (updatedMatch.g3p1 > updatedMatch.g3p2) player1GamesWon++;
            if (updatedMatch.g3p1 < updatedMatch.g3p2) player2GamesWon++;
        } else {
            scoresAreValid = false;
        };
        // GAME 4
        if (checkIfGameScoreIsValid(updatedMatch.g4p1, updatedMatch.g4p2)) {
            if ((match.matchBestOf === 5) && (player1GamesWon === 3 || player2GamesWon === 3)) scoresAreValid = false;
            if (updatedMatch.g4p1 > updatedMatch.g4p2) player1GamesWon++;
            if (updatedMatch.g4p1 < updatedMatch.g4p2) player2GamesWon++;
        } else if (updatedMatch.g4p1 === null && updatedMatch.g4p2 === null) {
            if ((match.matchBestOf === 5) && (player1GamesWon === 2 || player2GamesWon === 2)) scoresAreValid = false;
        } else {
            scoresAreValid = false;
        };
        // GAME 5
        if (checkIfGameScoreIsValid(updatedMatch.g5p1, updatedMatch.g5p2)) {
            if ((match.matchBestOf === 5) && (player1GamesWon === 3 || player2GamesWon === 3)) scoresAreValid = false;
            if ((match.matchBestOf === 7) && (player1GamesWon === 4 || player2GamesWon === 4)) scoresAreValid = false;
            if (updatedMatch.g5p1 > updatedMatch.g5p2) player1GamesWon++;
            if (updatedMatch.g5p1 < updatedMatch.g5p2) player2GamesWon++;
        } else if (updatedMatch.g5p1 === null && updatedMatch.g5p2 === null) {
            if ((match.matchBestOf === 5) && (player1GamesWon === 2 || player2GamesWon === 2)) scoresAreValid = false;
            if ((match.matchBestOf === 7) && (player1GamesWon > 0 && player1GamesWon > 0)) scoresAreValid = false;
        } else {
            scoresAreValid = false;
        };
        // GAME 6
        if (checkIfGameScoreIsValid(updatedMatch.g6p1, updatedMatch.g6p2)) {
            if (match.matchBestOf === 5) return false;
            if ((match.matchBestOf === 7) && (player1GamesWon === 1 || player2GamesWon === 1)) scoresAreValid = false;
            if (updatedMatch.g6p1 > updatedMatch.g6p2) player1GamesWon++;
            if (updatedMatch.g6p1 < updatedMatch.g6p2) player2GamesWon++;
        } else if (updatedMatch.g6p1 === null && updatedMatch.g6p2 === null) {
            if ((match.matchBestOf === 7) && (player1GamesWon === 2 || player2GamesWon === 2)) scoresAreValid = false;
        } else {
            scoresAreValid = false;
        };
        // GAME 7
        if (checkIfGameScoreIsValid(updatedMatch.g7p1, updatedMatch.g7p2)) {
            if (match.matchBestOf === 5) return false;
            if ((match.matchBestOf === 7) && (player1GamesWon === 2 || player2GamesWon === 2)) scoresAreValid = false;
            if (updatedMatch.g7p1 > updatedMatch.g7p2) player1GamesWon++;
            if (updatedMatch.g7p1 < updatedMatch.g7p2) player2GamesWon++;
        } else if (updatedMatch.g7p1 === null && updatedMatch.g7p2 === null) {
            if ((match.matchBestOf === 7) && (player1GamesWon === 3 || player2GamesWon === 3)) scoresAreValid = false;
        } else {
            scoresAreValid = false;
        };
        setMatch({
            ...updatedMatch,
            player1GamesWon,
            player2GamesWon,
            matchStatus: scoresAreValid ? "Pending" : "In Progress",
            player1Verified: false,
            player2Verified: false,
            winnerId: scoresAreValid ? (player1GamesWon === ((match.matchBestOf === 5) ? 3 : 4) ? match.eventPlayer1Id : match.eventPlayer2Id) : null,
            loserId: scoresAreValid ? (player1GamesWon === ((match.matchBestOf === 5) ? 3 : 4) ? match.eventPlayer2Id : match.eventPlayer1Id) : null
        });
    };
    function verifyScores(playerNumber) {
        if (playerNumber === 1) {
            setMatch({ ...match, player1Verified: true, matchStatus: match.player2Verified ? "Finished" : match.matchStatus });
        } else {
            setMatch({ ...match, player2Verified: true, matchStatus: match.player1Verified ? "Finished" : match.matchStatus });
        };
    };

    return (
        <>
            <div className="card match-card">
                <div className="card-header">
                    <div className="card-header-info">
                        <p>{match.eventName} • Group {match.groupNumber}</p>
                        <span className="card-bubble">{match.matchStatus}</span>
                    </div>
                    <div className="card-header-tables">
                        <p>
                            {
                                match.tables.length > 0 ? (
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
                            match.winnerId === match.eventPlayer1Id ? (
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
                                onChange={e => updateGameScore(1, 1, e.target.value)}
                            />
                        </div>
                        <div className="match-game-score">
                            <input
                                type="number"
                                disabled={match.matchStatus !== "In Progress" && match.matchStatus !== "Pending"}
                                value={match.g2p1 === null ? "" : match.g2p1}
                                onChange={e => updateGameScore(2, 1, e.target.value)}
                            />
                        </div>
                        <div className="match-game-score">
                            <input
                                type="number"
                                disabled={match.matchStatus !== "In Progress" && match.matchStatus !== "Pending"}
                                value={match.g3p1 === null ? "" : match.g3p1}
                                onChange={e => updateGameScore(3, 1, e.target.value)}
                            />
                        </div>
                        <div className="match-game-score">
                            <input
                                type="number"
                                disabled={match.matchStatus !== "In Progress" && match.matchStatus !== "Pending"}
                                value={match.g4p1 === null ? "" : match.g4p1}
                                onChange={e => updateGameScore(4, 1, e.target.value)}
                            />
                        </div>
                        <div className="match-game-score">
                            <input
                                type="number"
                                disabled={match.matchStatus !== "In Progress" && match.matchStatus !== "Pending"}
                                value={match.g5p1 === null ? "" : match.g5p1}
                                onChange={e => updateGameScore(5, 1, e.target.value)}
                            />
                        </div>
                        {
                            match.bestof === 7 ? (
                                <>
                                    <div className="match-game-score">
                                        <input
                                            type="number"
                                            disabled={match.matchStatus !== "In Progress" && match.matchStatus !== "Pending"}
                                            value={match.g6p1 === null ? "" : match.g6p1}
                                            onChange={e => updateGameScore(6, 1, e.target.value)}
                                        />
                                    </div>
                                    <div className="match-game-score">
                                        <input
                                            type="number"
                                            disabled={match.matchStatus !== "In Progress" && match.matchStatus !== "Pending"}
                                            value={match.g7p1 === null ? "" : match.g7p1}
                                            onChange={e => updateGameScore(7, 1, e.target.value)}
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
                                onChange={e => updateGameScore(1, 2, e.target.value)}
                            />
                        </div>
                        <div className="match-game-score">
                            <input
                                type="number"
                                disabled={match.matchStatus !== "In Progress" && match.matchStatus !== "Pending"}
                                value={match.g2p2 === null ? "" : match.g2p2}
                                onChange={e => updateGameScore(2, 2, e.target.value)}
                            />
                        </div>
                        <div className="match-game-score">
                            <input
                                type="number"
                                disabled={match.matchStatus !== "In Progress" && match.matchStatus !== "Pending"}
                                value={match.g3p2 === null ? "" : match.g3p2}
                                onChange={e => updateGameScore(3, 2, e.target.value)}
                            />
                        </div>
                        <div className="match-game-score">
                            <input
                                type="number"
                                disabled={match.matchStatus !== "In Progress" && match.matchStatus !== "Pending"}
                                value={match.g4p2 === null ? "" : match.g4p2}
                                onChange={e => updateGameScore(4, 2, e.target.value)}
                            />
                        </div>
                        <div className="match-game-score">
                            <input
                                type="number"
                                disabled={match.matchStatus !== "In Progress" && match.matchStatus !== "Pending"}
                                value={match.g5p2 === null ? "" : match.g5p2}
                                onChange={e => updateGameScore(5, 2, e.target.value)}
                            />
                        </div>
                        {
                            match.bestOf === 7 ? (
                                <>
                                    <div className="match-game-score">
                                        <input
                                            type="number"
                                            disabled={match.matchStatus !== "In Progress" && match.matchStatus !== "Pending"}
                                            value={match.g6p2 === null ? "" : match.g6p2}
                                            onChange={e => updateGameScore(6, 2, e.target.value)}
                                        />
                                    </div>
                                    <div className="match-game-score">
                                        <input
                                            type="number"
                                            disabled={match.matchStatus !== "In Progress" && match.matchStatus !== "Pending"}
                                            value={match.g7p2 === null ? "" : match.g7p2}
                                            onChange={e => updateGameScore(7, 2, e.target.value)}
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
                            match.winnerId === match.eventPlayer2Id ? (
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