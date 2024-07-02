import "./MatchCard.css";
import { useModal } from "@/app/context/ModalContext";
import { useMatch } from "@/app/context/MatchContext";

export default function MatchCard({ match }) {
    const { setShowModal } = useModal();
    const { setMatch } = useMatch();

    return (
        <div className="card match-card">
            <div className="card-header">
                <div className="card-header-info">
                    <button onClick={() => {
                        setShowModal(true);
                        setMatch(match);
                    }} className="icon-button">
                        <i className="fa-regular fa-eye" />
                    </button>
                    <p>{match.eventName} • Group {match.groupNumber}</p>
                </div>
                <div className="card-header-tables">
                    <p>TBD</p>
                </div>
            </div>
            <div className="match-card-body">
                <div className="match-player-info">
                    <p>{match.player1Rating} • {match.player1Name}</p>
                </div>
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
                        match.matchBestOf === 7 ? (
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
                        match.matchBestOf === 7 ? (
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
                    <p>{match.player2Rating} • {match.player2Name}</p>
                </div>
            </div>
        </div>
    );
};