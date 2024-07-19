import "./DrawList.css";
import DrawMatchCard from "../DrawMatchCard/DrawMatchCard";
import Modal from "../Modal/Modal";
import { useMatch } from "@/app/context/MatchContext";
import { useModal } from "@/app/context/ModalContext";
import EditableMatch from "../EditableMatch/EditableMatch";
import MatchCard from "../MatchCard/MatchCard";
import TableFinder from "../TableFinder/TableFinder";
import MatchSettings from "../MatchSettings/MatchSettings";
import { useState } from "react";

export default function DrawList({ setEvent, drawPrintRef, event, player }) {
    const { match } = useMatch();
    const { showModal } = useModal();
    const [swap, setSwap] = useState(false);
    const [eventPlayerSwap, setEventPlayerSwap] = useState([]);

    async function swapEventPlayers() {
        console.log(event.draw);
        const response = await fetch(`/api/swap-players/draw`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
                'Expires': '0'
            },
            body: JSON.stringify({
                eventPlayer1: eventPlayerSwap[0],
                eventPlayer2: eventPlayerSwap[1],
                eventId: event.eventId
            })
        });
        const draw = await response.json();
        setEventPlayerSwap([]);
        setEvent({ ...event, draw });
    };
    async function moveEventPlayers() {
        console.log(event.draw);
        const response = await fetch(`/api/move-players`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
                'Expires': '0'
            },
            body: JSON.stringify({
                eventPlayer1: eventPlayerSwap[0],
                eventPlayer2: eventPlayerSwap[1],
                eventId: event.eventId
            })
        });
        const draw = await response.json();
        setEventPlayerSwap([]);
        setEvent({ ...event, draw });
    };

    if (!event.draw.length) return null;

    return (
        <div ref={drawPrintRef}>
            {(player && player.isAdmin && event.eventStage === 'Draw' && event.eventStatus === 'In Progress') && <div className="swap-buttons">
                {
                    swap === false ? (
                        <button className="Secondary" onClick={() => setSwap(true)}><i className="fa-regular fa-pen-to-square" /> Edit Seeds</button>
                    ) : (
                        <>
                            <button className="Primary" onClick={swapEventPlayers}><i className="fa-solid fa-shuffle" /> SWAP</button>
                            <button className="Primary" onClick={moveEventPlayers}><i className="fa-solid fa-square-arrow-up-right" /> Move</button>
                            <button className="Secondary" onClick={() => {
                                setSwap(false);
                                setEventPlayerSwap([]);
                            }}>Cancel</button>
                        </>
                    )
                }
            </div>}
            {showModal === "Draw Match" && <Modal>
                <div className="admin-modal">
                    {
                        match ? ((match.matchStatus === "Finished" || match.matchStatus === "Upcoming") ? <MatchCard match={match} inModal={true} /> : ((player && player.isAdmin) ? <EditableMatch match={match} /> : <MatchCard match={match} inModal={true} />)) : null
                    }
                    {(player && player.isAdmin) && <div className="match-settings">
                        <TableFinder tournamentId={event.tournamentId} matchId={match?.matchId} />
                        <MatchSettings matchId={match?.matchId} />
                    </div>}
                </div>
            </Modal>}
            <div style={{ display: 'none' }} className="print-event-name">
                <h1>{event.eventName}</h1>
                <p>{new Date(event.eventDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'America/New_York' })} • {event.eventTime?.slice(0, 5)}</p>
            </div>
            <section className={`draw-list draw-of-${event.draw[0][0].matchRound}`}>
                {
                    event.draw.map((drawRound, index) => (
                        <div key={drawRound[0].matchId} className={`draw-round round-of-${drawRound[0].matchRound} column-${index + 1}`}>
                            {
                                drawRound.map(drawMatch => (
                                    <DrawMatchCard swap={swap} eventPlayerSwap={eventPlayerSwap} setEventPlayerSwap={setEventPlayerSwap} key={drawMatch.matchId} match={drawMatch} />
                                ))
                            }
                        </div>
                    ))
                }
            </section>
        </div>
    );
};