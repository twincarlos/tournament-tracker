import "./DrawMatchCard.css";
import PlayerInfo from "../PlayerInfo/PlayerInfo";
import { useMatch } from "@/app/context/MatchContext";
import { useModal } from "@/app/context/ModalContext";

export default function DrawMatchCard({ match, inModal }) {
    const { setShowModal } = useModal();
    const { setMatch } = useMatch();

    function translateRound(round) {
        if (round === 8) {
            return "Quarterfinals"
        }
        else if (round === 4) {
            return "Semifinals"
        }
        else if (round === 2) {
            return "Finals"
        }
        else {
            return `Round of ${round}`;
        };
    };
    
    return (
        <div className="card draw-card">
            <div className="card-header">
                <div className="card-header-info">
                    {
                        inModal ? null : (
                            <button onClick={async () => {
                                const response = await fetch(`/api/get-match/${match.matchId}`, {
                                    headers: {
                                        'Cache-Control': 'no-cache',
                                        'Pragma': 'no-cache',
                                        'Expires': '0'
                                    }
                                });
                                const updatedMatch = await response.json();
                                setMatch({ ...match, ...updatedMatch });
                                setShowModal(true);
                            }} className="icon-button">
                                <i className="fa-regular fa-eye" />
                            </button>
                        )
                    }
                    <div className="draw-card-header-info">
                        <div className="draw-card-detail">
                            <p>{match.eventName}</p>
                            <p>{match.tableNumber ? `Table ${match.tableNumber}` : 'No Table'}</p>
                        </div>
                        <div className="draw-card-detail">
                            <span className="card-bubble">{match.matchStatus}</span>
                            <p>{translateRound(match.matchRound)}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="draw-card-body">
                <div className="player-section">
                    <div className="player-games-won">
                        {match.player1GamesWon}
                    </div>
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
                <div className="player-games-won">
                        {match.player2GamesWon}
                    </div>
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