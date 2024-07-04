"use client";
import './EditableMatch.css';
import PlayerInfo from '../PlayerInfo/PlayerInfo';
import { useState } from 'react';
import { useMatch } from '@/app/context/MatchContext';
import { useSubscribe } from '@/app/hooks/useSubscribe';

export default function EditableMatch({ match }) {
    const { setMatch } = useMatch();
    useSubscribe(
        `match_${match.matchId}`,
        "update_match",
        data => setMatch(data)
    );
    const [gameScores, setGameScores] = useState({
        g1p1: match.g1p1,
        g1p2: match.g1p2,
        g2p1: match.g2p1,
        g2p2: match.g2p2,
        g3p1: match.g3p1,
        g3p2: match.g3p2,
        g4p1: match.g4p1,
        g4p2: match.g4p2,
        g5p1: match.g5p1,
        g5p2: match.g5p2,
        g6p1: match.g6p1,
        g6p2: match.g6p2,
        g7p1: match.g7p1,
        g7p2: match.g7p2
    });
    const [matchScore, setMatchScore] = useState({
        player1GamesWon: match.player1GamesWon,
        player2GamesWon: match.player2GamesWon
    });
    const [result, setResult] = useState({
        winnerId: match.winerId,
        loserId: match.loserId
    });
    const [validScores, setValidScores] = useState(false);
    const [playersYY, setPlayersYY] = useState({
        player1YY: "",
        player2YY: ""
    });

    function checkIfGameScoreIsValid(score1, score2) {
        if (score1 === null || score2 === null) return false;
        if (score1 === 11 && (score2 >= 0 && score2 <= 9)) return true;
        if (score2 === 11 && (score1 >= 0 && score1 <= 9)) return true;
        if ((score1 > 11 || score2 > 11) && (Math.abs(score1 - score2) === 2)) return true;
        return false;
    };
    function updateGameScore(gameNumber, playerNumber, score) {
        const updatedGameScores = { ...gameScores, [`g${gameNumber}p${playerNumber}`]: score === "" ? null : Number(score) };
        let player1GamesWon = 0;
        let player2GamesWon = 0;
        let matchIsFinished = true;

        // GAME 1
        if (checkIfGameScoreIsValid(updatedGameScores.g1p1, updatedGameScores.g1p2)) {
            if (updatedGameScores.g1p1 > updatedGameScores.g1p2) player1GamesWon++;
            if (updatedGameScores.g1p1 < updatedGameScores.g1p2) player2GamesWon++;
        } else {
            matchIsFinished = false;
        };
        // GAME 2
        if (checkIfGameScoreIsValid(updatedGameScores.g2p1, updatedGameScores.g2p2)) {
            if (updatedGameScores.g2p1 > updatedGameScores.g2p2) player1GamesWon++;
            if (updatedGameScores.g2p1 < updatedGameScores.g2p2) player2GamesWon++;
        } else {
            matchIsFinished = false;
        };
        // GAME 3
        if (checkIfGameScoreIsValid(updatedGameScores.g3p1, updatedGameScores.g3p2)) {
            if (updatedGameScores.g3p1 > updatedGameScores.g3p2) player1GamesWon++;
            if (updatedGameScores.g3p1 < updatedGameScores.g3p2) player2GamesWon++;
        } else {
            matchIsFinished = false;
        };
        // GAME 4
        if (checkIfGameScoreIsValid(updatedGameScores.g4p1, updatedGameScores.g4p2)) {
            if ((match.matchBestOf === 5) && (player1GamesWon === 3 || player2GamesWon === 3)) matchIsFinished = false;
            if (updatedGameScores.g4p1 > updatedGameScores.g4p2) player1GamesWon++;
            if (updatedGameScores.g4p1 < updatedGameScores.g4p2) player2GamesWon++;
        } else if (updatedGameScores.g4p1 === null && updatedGameScores.g4p2 === null) {
            if ((match.matchBestOf === 5) && (player1GamesWon === 2 || player2GamesWon === 2)) matchIsFinished = false;
        } else {
            matchIsFinished = false;
        };
        // GAME 5
        if (checkIfGameScoreIsValid(updatedGameScores.g5p1, updatedGameScores.g5p2)) {
            if ((match.matchBestOf === 5) && (player1GamesWon === 3 || player2GamesWon === 3)) matchIsFinished = false;
            if ((match.matchBestOf === 7) && (player1GamesWon === 4 || player2GamesWon === 4)) matchIsFinished = false;
            if (updatedGameScores.g5p1 > updatedGameScores.g5p2) player1GamesWon++;
            if (updatedGameScores.g5p1 < updatedGameScores.g5p2) player2GamesWon++;
        } else if (updatedGameScores.g5p1 === null && updatedGameScores.g5p2 === null) {
            if ((match.matchBestOf === 5) && (player1GamesWon === 2 || player2GamesWon === 2)) matchIsFinished = false;
            if ((match.matchBestOf === 7) && (player1GamesWon > 0 && player1GamesWon > 0)) matchIsFinished = false;
        } else {
            matchIsFinished = false;
        };
        // GAME 6
        if (checkIfGameScoreIsValid(updatedGameScores.g6p1, updatedGameScores.g6p2)) {
            if (match.matchBestOf === 5) return false;
            if ((match.matchBestOf === 7) && (player1GamesWon === 1 || player2GamesWon === 1)) matchIsFinished = false;
            if (updatedGameScores.g6p1 > updatedGameScores.g6p2) player1GamesWon++;
            if (updatedGameScores.g6p1 < updatedGameScores.g6p2) player2GamesWon++;
        } else if (updatedGameScores.g6p1 === null && updatedGameScores.g6p2 === null) {
            if ((match.matchBestOf === 7) && (player1GamesWon === 2 || player2GamesWon === 2)) matchIsFinished = false;
        } else {
            matchIsFinished = false;
        };
        // GAME 7
        if (checkIfGameScoreIsValid(updatedGameScores.g7p1, updatedGameScores.g7p2)) {
            if (match.matchBestOf === 5) return false;
            if ((match.matchBestOf === 7) && (player1GamesWon === 2 || player2GamesWon === 2)) matchIsFinished = false;
            if (updatedGameScores.g7p1 > updatedGameScores.g7p2) player1GamesWon++;
            if (updatedGameScores.g7p1 < updatedGameScores.g7p2) player2GamesWon++;
        } else if (updatedGameScores.g7p1 === null && updatedGameScores.g7p2 === null) {
            if ((match.matchBestOf === 7) && (player1GamesWon === 3 || player2GamesWon === 3)) matchIsFinished = false;
        } else {
            matchIsFinished = false;
        };
        if (player1GamesWon !== matchScore.player1GamesWon) {
            setMatchScore({ ...matchScore, player1GamesWon });
        };
        if (player2GamesWon !== matchScore.player2GamesWon) {
            setMatchScore({ ...matchScore, player2GamesWon });
        };
        setGameScores(updatedGameScores);
        setValidScores(matchIsFinished);
    };

    return (
        <div className="card match-card">
            <div className="card-header">
                <div className="card-header-info">
                    <p>{match.eventName} • Group {match.groupNumber}</p>
                </div>
                <div className="card-header-tables">
                    <p>TBD</p>
                </div>
            </div>
            <div className="match-card-body">
                <div className="player-section">
                    <div className="player-buttons">
                        <button className="check-in-button"><i className="fa-solid fa-user-check" /></button>
                        <input className="check-in-input" type="number" placeholder="YY" value={playersYY.player1YY}
                        onChange={e => e.target.value.length < 3 && setPlayersYY({ ...playersYY, player1YY: e.target.value }) } />
                    </div>
                    <PlayerInfo player={{
                        playerName: match.player1Name,
                        playerRating: match.player1Rating,
                        playerClub: match.player1Club,
                        playerLocation: match.player1Location
                    }} />
                </div>
                <div className="match-player-scores">
                    <div className="match-game-counter match-game-score">
                        <p>{matchScore.player1GamesWon}</p>
                    </div>
                    <div className="match-game-score">
                        <input
                            type="number"
                            disabled={false}
                            value={gameScores.g1p1 === null ? "" : gameScores.g1p1}
                            onChange={e => updateGameScore(1, 1, e.target.value)}
                        />
                    </div>
                    <div className="match-game-score">
                        <input
                            type="number"
                            disabled={false}
                            value={gameScores.g2p1 === null ? "" : gameScores.g2p1}
                            onChange={e => updateGameScore(2, 1, e.target.value)}
                        />
                    </div>
                    <div className="match-game-score">
                        <input
                            type="number"
                            disabled={false}
                            value={gameScores.g3p1 === null ? "" : gameScores.g3p1}
                            onChange={e => updateGameScore(3, 1, e.target.value)}
                        />
                    </div>
                    <div className="match-game-score">
                        <input
                            type="number"
                            disabled={false}
                            value={gameScores.g4p1 === null ? "" : gameScores.g4p1}
                            onChange={e => updateGameScore(4, 1, e.target.value)}
                        />
                    </div>
                    <div className="match-game-score">
                        <input
                            type="number"
                            disabled={false}
                            value={gameScores.g5p1 === null ? "" : gameScores.g5p1}
                            onChange={e => updateGameScore(5, 1, e.target.value)}
                        />
                    </div>
                    {
                        match.bestof === 7 ? (
                            <>
                                <div className="match-game-score">
                                    <input
                                        type="number"
                                        disabled={false}
                                        value={gameScores.g6p1 === null ? "" : gameScores.g6p1}
                                        onChange={e => updateGameScore(6, 1, e.target.value)}
                                    />
                                </div>
                                <div className="match-game-score">
                                    <input
                                        type="number"
                                        disabled={false}
                                        value={gameScores.g7p1 === null ? "" : gameScores.g7p1}
                                        onChange={e => updateGameScore(7, 1, e.target.value)}
                                    />
                                </div>
                            </>
                        ) : null
                    }
                </div>
                <div className="match-player-scores">
                    <div className="match-game-counter match-game-score">
                        <p>{matchScore.player2GamesWon}</p>
                    </div>
                    <div className="match-game-score">
                        <input
                            type="number"
                            disabled={false}
                            value={gameScores.g1p2 === null ? "" : gameScores.g1p2}
                            onChange={e => updateGameScore(1, 2, e.target.value)}
                        />
                    </div>
                    <div className="match-game-score">
                        <input
                            type="number"
                            disabled={false}
                            value={gameScores.g2p2 === null ? "" : gameScores.g2p2}
                            onChange={e => updateGameScore(2, 2, e.target.value)}
                        />
                    </div>
                    <div className="match-game-score">
                        <input
                            type="number"
                            disabled={false}
                            value={gameScores.g3p2 === null ? "" : gameScores.g3p2}
                            onChange={e => updateGameScore(3, 2, e.target.value)}
                        />
                    </div>
                    <div className="match-game-score">
                        <input
                            type="number"
                            disabled={false}
                            value={gameScores.g4p2 === null ? "" : gameScores.g4p2}
                            onChange={e => updateGameScore(4, 2, e.target.value)}
                        />
                    </div>
                    <div className="match-game-score">
                        <input
                            type="number"
                            disabled={false}
                            value={gameScores.g5p2 === null ? "" : gameScores.g5p2}
                            onChange={e => updateGameScore(5, 2, e.target.value)}
                        />
                    </div>
                    {
                        match.bestOf === 7 ? (
                            <>
                                <div className="match-game-score">
                                    <input
                                        type="number"
                                        disabled={false}
                                        value={gameScores.g6p2 === null ? "" : gameScores.g6p2}
                                        onChange={e => updateGameScore(6, 2, e.target.value)}
                                    />
                                </div>
                                <div className="match-game-score">
                                    <input
                                        type="number"
                                        disabled={false}
                                        value={gameScores.g7p2 === null ? "" : gameScores.g7p2}
                                        onChange={e => updateGameScore(7, 2, e.target.value)}
                                    />
                                </div>
                            </>
                        ) : null
                    }
                </div>
                <div className="player-section">
                    <div className="player-buttons">
                        <button className="check-in-button"><i className="fa-solid fa-user-check" /></button>
                        <input className="check-in-input" type="number" placeholder="YY" value={playersYY.player2YY}
                        onChange={e => e.target.value.length < 3 && setPlayersYY({ ...playersYY, player2YY: e.target.value })} />
                    </div>
                    <PlayerInfo player={{
                        playerName: match.player2Name,
                        playerRating: match.player2Rating,
                        playerClub: match.player2Club,
                        playerLocation: match.player2Location
                    }} />
                </div>
            </div>
        </div>
    );
};