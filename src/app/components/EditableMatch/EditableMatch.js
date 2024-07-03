"use client";
import './EditableMatch.css';
import PlayerInfo from '../PlayerInfo/PlayerInfo';
import { debounce } from 'lodash';
import { useCallback, useState } from 'react';
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

    function checkIfGameScoresAreValid(gameNumber) {
        if (match.matchBestOf === 5) {
            if ((gameNumber >= 4) && (matchScore.player1GamesWon === 3 || matchScore.player2GamesWon === 3)) return false;
        };
        if (match.matchBestOf === 7) {
            if ((gameNumber >= 4) && (matchScore.player1GamesWon === 4 || matchScore.player2GamesWon === 4)) return false;
        };
        for (let i = 1; i < gameNumber; i++) {
            const player1GameScore = gameScores[`g${i}p1`];
            const player2GameScore = gameScores[`g${i}p2`];
            if (!checkIfGameScoreIsValid(player1GameScore, player2GameScore)) {
                return false;
            };
        };
        return true;
    };

    function checkIfGameScoreIsValid(score1, score2) {
        if (!score1 || !score2) return false;
        if (score1 < 11 && score2 < 11) return false;
        if ((score1 > 11 || score2 > 11) && (Math.abs(score1 - score2) !== 2)) return false;
        if ((score1 === 11 || score2 === 11) && (Math.abs(score1 - score2) === 1)) return false;
        return true;
    };

    function updateGameScore(gameNumber, playerNumber, score) {
        setGameScores({ ...gameScores, [`g${gameNumber}p${playerNumber}`]: score });
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
                <PlayerInfo player={{
                    playerName: match.player1Name,
                    playerRating: match.player1Rating,
                    playerClub: match.player1Club,
                    playerLocation: match.player1Location
                }} />
                <div className="match-player-scores">
                    <div className="match-game-counter match-game-score">
                        <p>{matchScore.player1GamesWon}</p>
                    </div>
                    <div className="match-game-score">
                        <input
                            type="number" min={0}
                            value={gameScores.g1p1 || ""}
                            disabled={false}
                            onChange={e => updateGameScore(1, 1, e.target.value)}
                        />
                    </div>
                    <div className="match-game-score">
                        <input
                            type="number"
                            min={0}
                            value={gameScores.g2p1 || ""}
                            disabled={!checkIfGameScoresAreValid(2)}
                            onChange={e => updateGameScore(2, 1, e.target.value)}
                        />
                    </div>
                    <div className="match-game-score">
                        <input
                            type="number"
                            min={0}
                            value={gameScores.g3p1 || ""}
                            disabled={!checkIfGameScoresAreValid(3)}
                            onChange={e => updateGameScore(3, 1, e.target.value)}
                        />
                    </div>
                    <div className="match-game-score">
                        <input
                            type="number"
                            min={0}
                            value={gameScores.g4p1 || ""}
                            disabled={!checkIfGameScoresAreValid(4)}
                            onChange={e => updateGameScore(4, 1, e.target.value)}
                        />
                    </div>
                    <div className="match-game-score">
                        <input
                            type="number"
                            min={0}
                            value={gameScores.g5p1 || ""}
                            disabled={!checkIfGameScoresAreValid(5)}
                            onChange={e => updateGameScore(5, 1, e.target.value)}
                        />
                    </div>
                    {
                        match.bestof === 7 ? (
                            <>
                                <div className="match-game-score">
                                    <input
                                        type="number"
                                        min={0}
                                        value={gameScores.g6p1 || ""}
                                        disabled={!checkIfGameScoresAreValid(6)}
                                        onChange={e => updateGameScore(6, 1, e.target.value)}
                                    />
                                </div>
                                <div className="match-game-score">
                                    <input
                                        type="number"
                                        min={0}
                                        value={gameScores.g7p1 || ""}
                                        disabled={!checkIfGameScoresAreValid(7)}
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
                            min={0}
                            value={gameScores.g1p2 || ""}
                            disabled={false}
                            onChange={e => updateGameScore(1, 2, e.target.value)}
                        />
                    </div>
                    <div className="match-game-score">
                        <input
                            type="number"
                            min={0}
                            value={gameScores.g2p2 || ""}
                            disabled={!checkIfGameScoresAreValid(2)}
                            onChange={e => updateGameScore(2, 2, e.target.value)}
                        />
                    </div>
                    <div className="match-game-score">
                        <input
                            type="number"
                            min={0}
                            value={gameScores.g3p2 || ""}
                            disabled={!checkIfGameScoresAreValid(3)}
                            onChange={e => updateGameScore(3, 2, e.target.value)}
                        />
                    </div>
                    <div className="match-game-score">
                        <input
                            type="number"
                            min={0}
                            value={gameScores.g4p2 || ""}
                            disabled={!checkIfGameScoresAreValid(4)}
                            onChange={e => updateGameScore(4, 2, e.target.value)}
                        />
                    </div>
                    <div className="match-game-score">
                        <input
                            type="number"
                            min={0}
                            value={gameScores.g5p2 || ""}
                            disabled={!checkIfGameScoresAreValid(5)}
                            onChange={e => updateGameScore(5, 2, e.target.value)}
                        />
                    </div>
                    {
                        match.bestOf === 7 ? (
                            <>
                                <div className="match-game-score">
                                    <input
                                        type="number"
                                        min={0}
                                        value={gameScores.g6p2 || ""}
                                        disabled={!checkIfGameScoresAreValid(6)}
                                        onChange={e => updateGameScore(6, 2, e.target.value)}
                                    />
                                </div>
                                <div className="match-game-score">
                                    <input
                                        type="number"
                                        min={0}
                                        value={gameScores.g7p2 || ""}
                                        disabled={!checkIfGameScoresAreValid(7)}
                                        onChange={e => updateGameScore(7, 2, e.target.value)}
                                    />
                                </div>
                            </>
                        ) : null
                    }
                </div>
                <PlayerInfo player={{
                    playerName: match.player2Name,
                    playerRating: match.player2Rating,
                    playerClub: match.player2Club,
                    playerLocation: match.player2Location
                }} />
            </div>
        </div>
    );
};