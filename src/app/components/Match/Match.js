import './Match.css';
export default function Match({ match }) {
    return (
        <div className="card match-card">
            <div className="card-header">
                <div className="card-header-info">
                    <p>{match.eventname} • Group {match.groupnumber}</p>
                </div>
                <div className="card-header-tables">
                    <p>Tables {match.matchtables ? match.matchtables : "TBD"}</p>
                </div>
            </div>
            <div className="match-card-body">
                <div className="match-player-info">
                    <p>{match.player1rating} • {match.player1name}</p>
                </div>
                <div className="match-player-scores">
                    <div className="match-game-counter match-game-score">
                        <p>{match.player1gameswon}</p>
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
                        <p>{match.player2gameswon}</p>
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
                        match.bestof === 7 ? (
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
                <div className="match-player-info">
                    <p>{match.player2rating} • {match.player2name}</p>
                </div>
            </div>
        </div>
    );
};