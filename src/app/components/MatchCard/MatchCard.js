import "./MatchCard.css";
import { useModal } from "@/app/context/ModalContext";
import { useMatch } from "@/app/context/MatchContext";
import PlayerInfo from "../PlayerInfo/PlayerInfo";

export default function MatchCard({ match, inModal }) {
    const { setShowModal } = useModal();
    const { setMatch } = useMatch();

    return (
        <div className="card match-card">
            <div className="card-header">
                <div className="card-header-info">
                    {
                        inModal ? null : (
                            <button onClick={() => {
                                setShowModal(true);
                                setMatch(match);
                            }} className="icon-button">
                                <i className="fa-regular fa-eye" />
                            </button>
                        )
                    }
                    <p>{match.eventName} • {match.matchStage} {match.groupNumber || match.matchRound}</p>
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
                    <PlayerInfo player={{
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
                        <input type="number" value={match.g1p1 || ""} disabled={true} />
                    </div>
                    <div className="match-game-score">
                        <input type="number" value={match.g2p1 || ""} disabled={true} />
                    </div>
                    <div className="match-game-score">
                        <input type="number" value={match.g3p1 || ""} disabled={true} />
                    </div>
                    <div className="match-game-score">
                        <input type="number" value={match.g4p1 || ""} disabled={true} />
                    </div>
                    <div className="match-game-score">
                        <input type="number" value={match.g5p1 || ""} disabled={true} />
                    </div>
                    {
                        match.matchBestOf === 7 ? (
                            <>
                                <div className="match-game-score">
                                    <input type="number" value={match.g6p1 || ""} disabled={true} />
                                </div>
                                <div className="match-game-score">
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
                    <div className="match-game-score">
                        <input type="number" value={match.g1p2 || ""} disabled={true} />
                    </div>
                    <div className="match-game-score">
                        <input type="number" value={match.g2p2 || ""} disabled={true} />
                    </div>
                    <div className="match-game-score">
                        <input type="number" value={match.g3p2 || ""} disabled={true} />
                    </div>
                    <div className="match-game-score">
                        <input type="number" value={match.g4p2 || ""} disabled={true} />
                    </div>
                    <div className="match-game-score">
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
                <div className="player-section">
                    <PlayerInfo player={{
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
    );
};