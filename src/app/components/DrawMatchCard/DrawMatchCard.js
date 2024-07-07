import "./DrawMatchCard.css";
import PlayerInfo from "../PlayerInfo/PlayerInfo";

export default function DrawMatchCard({ match, inModal }) {
    return (
        <div className="card draw-card">
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
                    <div>
                        <p>Round of {match.matchRound}</p>
                        <p>Table {match.tableNumber}</p>
                    </div>
                    <span className="card-bubble">{match.matchStatus}</span>
                </div>
            </div>
            <div className="draw-card-body">
                <div className="player-section">
                    <PlayerInfo player={{
                        eventPlayerId: match.eventPlayer1Id,
                        playerName: match.player1Name,
                        playerRating: match.player1Rating,
                        playerClub: match.player1Club,
                        playerLocation: match.player1Location
                    }} />
                    {
                        (match.eventPlayer1Id !== null && match.winnerId === match.eventPlayer1Id) ? (
                            <div className="winner-icon">
                                <i className="fa-solid fa-trophy" />
                            </div>
                        ) : null
                    }
                </div>
                <div className="player-section">
                    <PlayerInfo player={{
                        eventPlayerId: match.eventPlayer2Id,
                        playerName: match.player2Name,
                        playerRating: match.player2Rating,
                        playerClub: match.player2Club,
                        playerLocation: match.player2Location
                    }} />
                    {
                        (match.eventPlayer2Id !== null && match.winnerId === match.eventPlayer2Id) ? (
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