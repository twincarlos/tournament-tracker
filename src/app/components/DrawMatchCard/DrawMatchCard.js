import "./DrawMatchCard.css";
import PlayerInfo from "../PlayerInfo/PlayerInfo";
import { useMatch } from "@/app/context/MatchContext";
import { useModal } from "@/app/context/ModalContext";

export default function DrawMatchCard({ swap, eventPlayerSwap, setEventPlayerSwap, match, inModal }) {
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
                                setShowModal("Draw Match");
                            }} className="icon-button">
                                <i className="fa-regular fa-eye" />
                            </button>
                        )
                    }
                    <div className="draw-card-header-info">
                        <div className="draw-card-detail">
                            <p>{match.eventName}</p>
                            <span className={`card-bubble ${match.matchStatus}`}>{match.matchStatus}</span>
                        </div>
                        <div className="draw-card-detail">
                            <p>{(translateRound(match.matchRound) === "Finals" && match.matchSequence === 2) ? "Third Place" : translateRound(match.matchRound)}</p>
                            <p>
                                {
                                    match.tables && match.tables.length > 0 ? (
                                        `Table${match.tables.length > 1 ? "s" : ""} ${match.tables.map(table => table.tableNumber).join(", ")}`
                                    ) : "No table"
                                }
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="draw-card-body">
                <div onClick={() => {
                    if (swap === true) {
                        if (eventPlayerSwap[0]?.eventPlayerId === match.eventPlayer1Id || eventPlayerSwap[1]?.eventPlayerId === match.eventPlayer1Id) {
                            setEventPlayerSwap(eventPlayerSwap.filter(eventPlayer => eventPlayer.eventPlayerId !== match.eventPlayer1Id));
                        } else {
                            if (eventPlayerSwap.length === 2) {
                                setEventPlayerSwap([eventPlayerSwap[0], {
                                    eventPlayerId: match.eventPlayer1Id,
                                    position: 1,
                                    matchId: match.matchId
                                }]);
                            } else {
                                setEventPlayerSwap([...eventPlayerSwap, {
                                    eventPlayerId: match.eventPlayer1Id,
                                    position: 1,
                                    matchId: match.matchId
                                }])
                            };
                        };
                    };
                }} className={`player-section ${swap === true ? "pointer" : ""} ${(((eventPlayerSwap[0]?.eventPlayerId === match.eventPlayer1Id) && (eventPlayerSwap[0]?.matchId === match.matchId)) || ((eventPlayerSwap[1]?.eventPlayerId === match.eventPlayer1Id) && (eventPlayerSwap[1]?.matchId === match.matchId))) ? "swap" : ""}`}>
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
                <div onClick={() => {
                    if (swap === true) {
                        if (((eventPlayerSwap[0]?.eventPlayerId === match.eventPlayer2Id) && (eventPlayerSwap[0]?.matchId === match.matchId)) || ((eventPlayerSwap[1]?.eventPlayerId === match.eventPlayer2Id) && (eventPlayerSwap[1]?.matchId === match.matchId))) {
                            setEventPlayerSwap(eventPlayerSwap.filter(eventPlayer => eventPlayer.eventPlayerId !== match.eventPlayer2Id));
                        } else {
                            if (eventPlayerSwap.length === 2) {
                                setEventPlayerSwap([eventPlayerSwap[0], {
                                    eventPlayerId: match.eventPlayer2Id,
                                    position: 2,
                                    matchId: match.matchId
                                }]);
                            } else {
                                setEventPlayerSwap([...eventPlayerSwap, {
                                    eventPlayerId: match.eventPlayer2Id,
                                    position: 2,
                                    matchId: match.matchId
                                }])
                            };
                        };
                    };
                }} className={`player-section ${swap === true ? "pointer" : ""} ${(((eventPlayerSwap[0]?.eventPlayerId === match.eventPlayer2Id) && (eventPlayerSwap[0]?.matchId === match.matchId)) || ((eventPlayerSwap[1]?.eventPlayerId === match.eventPlayer2Id) && (eventPlayerSwap[1]?.matchId === match.matchId))) ? "swap" : ""}`}>
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