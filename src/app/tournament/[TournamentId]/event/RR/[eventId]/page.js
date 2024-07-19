"use client";
import "./Event.css";
import { useState, useRef } from "react";
import Header from "@/app/components/Header/Header";
import { useFetch } from "@/app/hooks/useFetch";
import GroupsList from "@/app/components/GroupsList/GroupsList";
import DrawList from "@/app/components/DrawList/DrawList";
import Modal from "@/app/components/Modal/Modal";
import { useModal } from "@/app/context/ModalContext";
import CreateEventPlayer from "@/app/components/CreateEventPlayer/CreateEventPlayer";
import GenerateGroups from "@/app/components/GenerateGroups/GenerateGroups";
import GenerateDraw from "@/app/components/GenerateDraw/GenerateDraw";
import { usePlayer } from "@/app/context/PlayerContext";
import { useReactToPrint } from "react-to-print";

export default function Event({ params }) {
    const groupsPrintRef = useRef();
    const handleGroupsPrint = useReactToPrint({
        content: () => groupsPrintRef.current
    });
    const drawPrintRef = useRef();
    const handleDrawPrint = useReactToPrint({
        content: () => drawPrintRef.current
    });
    const {player} = usePlayer()
    const { showModal, setShowModal } = useModal();
    const [event, setEvent] = useState({
        players: [],
        eventPlayers: [],
        groups: [],
        draw: []
    });
    const [category, setCategory] = useState("Groups");
    useFetch(`/api/get-rr-event/${params.eventId || params.EventId}`, setEvent);
    async function beginGroups(eventId) {
        await fetch(`/api/begin-groups`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
                'Expires': '0'
            },
            body: JSON.stringify({ eventId })
        });
        setEvent({
            ...event,
            groups: event.groups.map(group => ({ ...group, groupStatus: "Ready" }))
        });
    };
    return (
        <main>
            <Header
                headerDate={event.eventDate}
                headerTime={event.eventTime}
                backLink={`/tournament/${params.tournamentId || params.TournamentId}`}
                headerTitle={event.eventName}
                headerButtons={[
                    (player && player.isAdmin) && (event.eventStatus === "Upcoming" && event.eventStage === null) && {
                        buttonName: "+ Add Players",
                        buttonClassName: "Primary",
                        onClickFunction: () => setShowModal("Add Player")
                    },
                    (player && player.isAdmin) && (event.eventStatus === "Upcoming" && event.eventStage === null) && {
                        buttonName: "Generate Groups",
                        buttonClassName: "Secondary",
                        onClickFunction: () => setShowModal("Generate Groups")
                    },
                    (player && player.isAdmin) && (event.eventStage === "Groups" && event.eventStatus === "Upcoming") && {
                        buttonName: "Begin Groups",
                        buttonClassName: "Primary",
                        onClickFunction: () => beginGroups(event.eventId)
                    },
                    (player && player.isAdmin) && (event.eventStage === "Groups" && event.eventStatus === "Pending") && {
                        buttonName: "Generate Draw",
                        buttonClassName: "Primary",
                        onClickFunction: () => setShowModal("Generate Draw")
                    }
                ]}
            />
            {showModal === "Add Player" && <Modal>
                <CreateEventPlayer
                    event={event}
                    setEvent={setEvent}
                />
            </Modal>}
            {showModal === "Generate Groups" && <Modal>
                <GenerateGroups
                    event={event}
                    setEvent={setEvent}
                />
            </Modal>}
            {showModal === "Generate Draw" && <Modal>
                <GenerateDraw event={event}
                    setEvent={setEvent} setShowModal={setShowModal} />
            </Modal>}
            <section className="tabs">
                <button onClick={() => setCategory("Groups")} className={`${category === "Groups" ? "Primary" : "Secondary"}`}>Groups</button>
                <button onClick={() => setCategory("Draw")} className={`${category === "Draw" ? "Primary" : "Secondary"}`}>Draw</button>
                <button onClick={() => setCategory("Players")} className={`${category === "Players" ? "Primary" : "Secondary"}`}>Players</button>
            </section>
            {
                category === "Groups" ? <GroupsList setEvent={setEvent} groupsPrintRef={groupsPrintRef} player={player} event={event} /> : (
                    category === "Draw" ? <DrawList drawPrintRef={drawPrintRef} player={player} event={event} setEvent={setEvent} /> : (
                        <section className="player-list">
                            {
                                event.eventPlayers.map(eventPlayer => (
                                    <div className="player" key={eventPlayer.playerId}>
                                        <p className="player-rating">{eventPlayer.playerRating}</p>
                                        <p>{eventPlayer.playerName}</p>
                                        <p>{eventPlayer.playerLocation}</p>
                                        <p>{eventPlayer.playerClub}</p>
                                    </div>
                                ))
                            }
                        </section>
                    )
                )
            }
        </main>
    );
};