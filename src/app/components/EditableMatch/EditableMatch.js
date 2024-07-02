"use client";
import './EditableMatch.css';
import PlayerInfo from '../PlayerInfo/PlayerInfo';
import { debounce } from 'lodash';
import { useCallback, useState } from 'react';

export default function EditableMatch({ match }) {
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
                        <input type="number" value={gameScores.g1p1 || ""} disabled={false} />
                    </div>
                    <div className="match-game-score game-won">
                        <input type="number" value={gameScores.g2p1 || ""} disabled={false} />
                    </div>
                    <div className="match-game-score">
                        <input type="number" value={gameScores.g3p1 || ""} disabled={false} />
                    </div>
                    <div className="match-game-score game-won">
                        <input type="number" value={gameScores.g4p1 || ""} disabled={false} />
                    </div>
                    <div className="match-game-score">
                        <input type="number" value={gameScores.g5p1 || ""} disabled={false} />
                    </div>
                    {
                        match.bestof === 7 ? (
                            <>
                                <div className="match-game-score game-won">
                                    <input type="number" value={gameScores.g6p1 || ""} disabled={false} />
                                </div>
                                <div className="match-game-score game-won">
                                    <input type="number" value={gameScores.g7p1 || ""} disabled={false} />
                                </div>
                            </>
                        ) : null
                    }
                </div>
                <div className="match-player-scores">
                    <div className="match-game-counter match-game-score">
                        <p>{matchScore.player2GamesWon}</p>
                    </div>
                    <div className="match-game-score game-won">
                        <input type="number" value={gameScores.g1p2 || ""} disabled={false} />
                    </div>
                    <div className="match-game-score">
                        <input type="number" value={gameScores.g2p2 || ""} disabled={false} />
                    </div>
                    <div className="match-game-score game-won">
                        <input type="number" value={gameScores.g3p2 || ""} disabled={false} />
                    </div>
                    <div className="match-game-score">
                        <input type="number" value={gameScores.g4p2 || ""} disabled={false} />
                    </div>
                    <div className="match-game-score game-won">
                        <input type="number" value={gameScores.g5p2 || ""} disabled={false} />
                    </div>
                    {
                        match.bestOf === 7 ? (
                            <>
                                <div className="match-game-score">
                                    <input type="number" value={gameScores.g6p2 || ""} disabled={false} />
                                </div>
                                <div className="match-game-score">
                                    <input type="number" value={gameScores.g7p2 || ""} disabled={false} />
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