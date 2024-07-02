import './Match.css';
import PlayerInfo from '../PlayerInfo/PlayerInfo';

export default function Match({ match }) {
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
                        <p>{match.player1GamesWon}</p>
                    </div>
                    <div className="match-game-score">
                        <input type="number" value={match.g1p1 || ""} disabled={true} />
                    </div>
                    <div className="match-game-score game-won">
                        <input type="number" value={match.g2p1 || ""} disabled={true} />
                    </div>
                    <div className="match-game-score">
                        <input type="number" value={match.g3p1 || ""} disabled={true} />
                    </div>
                    <div className="match-game-score game-won">
                        <input type="number" value={match.g4p1 || ""} disabled={true} />
                    </div>
                    <div className="match-game-score">
                        <input type="number" value={match.g5p1 || ""} disabled={true} />
                    </div>
                    {
                        match.bestof === 7 ? (
                            <>
                                <div className="match-game-score game-won">
                                    <input type="number" value={match.g6p1 || ""} disabled={true} />
                                </div>
                                <div className="match-game-score game-won">
                                    <input type="number" value={match.g7p1 || ""} disabled={true} />
                                </div>
                            </>
                        ) : null
                    }
                </div>
                <div className="match-player-scores">
                    <div className="match-game-counter match-game-score">
                        <p>{match.player2GamesWon}</p>
                    </div>
                    <div className="match-game-score game-won">
                        <input type="number" value={match.g1p2 || ""} disabled={true} />
                    </div>
                    <div className="match-game-score">
                        <input type="number" value={match.g2p2 || ""} disabled={true} />
                    </div>
                    <div className="match-game-score game-won">
                        <input type="number" value={match.g3p2 || ""} disabled={true} />
                    </div>
                    <div className="match-game-score">
                        <input type="number" value={match.g4p2 || ""} disabled={true} />
                    </div>
                    <div className="match-game-score game-won">
                        <input type="number" value={match.g5p2 || ""} disabled={true} />
                    </div>
                    {
                        match.bestOf === 7 ? (
                            <>
                                <div className="match-game-score">
                                    <input type="number" value={match.g6p2 || ""} disabled={true} />
                                </div>
                                <div className="match-game-score">
                                    <input type="number" value={match.g7p2 || ""} disabled={true} />
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