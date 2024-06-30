import "./MatchCard.css";

export default function MatchCard() {
    return (
        <div className="card match-card">
            <div className="card-header">
                <div className="card-header-info">
                    <button className="icon-button">
                        <i className="fa-regular fa-eye" />
                    </button>
                    <p>U2500 RR • Groups • 1</p>
                </div>
                <div className="card-header-tables">
                    <p>Tables 1,2</p>
                </div>
            </div>
            <div className="match-card-body">
                <div className="match-player-info">
                    <p>2083 • Carlos Rodriguez</p>
                </div>
                <div className="match-player-scores">
                    <div className="match-game-counter match-game-score">
                        <p>4</p>
                    </div>
                    <div className="match-game-score">
                        <input type="number" value="9" disabled={true} />
                    </div>
                    <div className="match-game-score game-won">
                        <input type="number" value="11" disabled={true} />
                    </div>
                    <div className="match-game-score">
                        <input type="number" value="9" disabled={true} />
                    </div>
                    <div className="match-game-score game-won">
                        <input type="number" value="11" disabled={true} />
                    </div>
                    <div className="match-game-score">
                        <input type="number" value="9" disabled={true} />
                    </div>
                    <div className="match-game-score game-won">
                        <input type="number" value="11" disabled={true} />
                    </div>
                    <div className="match-game-score game-won">
                        <input type="number" value="11" disabled={true} />
                    </div>
                </div>
                <div className="match-player-scores">
                    <div className="match-game-counter match-game-score">
                        <p>3</p>
                    </div>
                    <div className="match-game-score game-won">
                        <input type="number" value="11" disabled={true} />
                    </div>
                    <div className="match-game-score">
                        <input type="number" value="9" disabled={true} />
                    </div>
                    <div className="match-game-score game-won">
                        <input type="number" value="11" disabled={true} />
                    </div>
                    <div className="match-game-score">
                        <input type="number" value="9" disabled={true} />
                    </div>
                    <div className="match-game-score game-won">
                        <input type="number" value="11" disabled={true} />
                    </div>
                    <div className="match-game-score">
                        <input type="number" value="9" disabled={true} />
                    </div>
                    <div className="match-game-score">
                        <input type="number" value="9" disabled={true} />
                    </div>
                </div>
                <div className="match-player-info">
                    <p>2143 • Luis Mejia</p>
                </div>
            </div>
        </div>
    );
};