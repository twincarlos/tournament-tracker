import "./MatchCard.css";
import { useModal } from "@/app/context/ModalContext";
import { useMatch } from "@/app/context/MatchContext";
import { useSubscribe } from "@/app/hooks/useSubscribe";
import PlayerInfo from "../PlayerInfo/PlayerInfo";

export default function MatchCard({ match, inModal }) {
    const { setShowModal } = useModal();
    const { setMatch } = useMatch();

    useSubscribe(
        `match_${match.matchId}`,
        "update_match",
        data => setMatch({ ...match, ...data }),
        inModal
    );

    return (
        <div className="card match-card">
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
                    <p>{match.eventName} • {match.matchStage === "Groups" ? "Group" : match.matchStage} {match.groupNumber || match.matchRound}</p>
                    <span className="card-bubble">{match.matchStatus}</span>
                </div>
                <div className="card-header-tables">
                    <p>
                        {
                            match.tables && match.tables.length > 0 ? (
                                `Table${match.tables.length > 1 ? "s" : ""} ${match.tables.map(table => table.tableNumber).join(", ")}`
                            ) : "No table"
                        }
                    </p>
                </div>
            </div>
            <div className="match-card-body">
                <div className="player-section">
                    <PlayerInfo player={{
                        eventPlayerId: match.eventPlayer1Id,
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
                        <p>{match.g1p1}</p>
                    </div>
                    <div className="match-game-score">
                        <p>{match.g2p1}</p>
                    </div>
                    <div className="match-game-score">
                        <p>{match.g3p1}</p>
                    </div>
                    <div className="match-game-score">
                        <p>{match.g4p1}</p>
                    </div>
                    <div className="match-game-score">
                        <p>{match.g5p1}</p>
                    </div>
                    {
                        match.matchBestOf === 7 ? (
                            <>
                                <div className="match-game-score">
                                    <p>{match.g6p1}</p>
                                </div>
                                <div className="match-game-score">
                                    <p>{match.g7p1}</p>
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
                        <p>{match.g1p2}</p>
                    </div>
                    <div className="match-game-score">
                        <p>{match.g2p2}</p>
                    </div>
                    <div className="match-game-score">
                        <p>{match.g3p2}</p>
                    </div>
                    <div className="match-game-score">
                        <p>{match.g4p2}</p>
                    </div>
                    <div className="match-game-score">
                        <p>{match.g5p2}</p>
                    </div>
                    {
                        match.matchBestOf === 7 ? (
                            <>
                                <div className="match-game-score">
                                    <p>{match.g6p2}</p>
                                </div>
                                <div className="match-game-score">
                                    <p>{match.g7p2}</p>
                                </div>
                            </>
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