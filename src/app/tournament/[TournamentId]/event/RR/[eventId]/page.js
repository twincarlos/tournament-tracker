"use client";
import "./Event.css";
import { useState } from "react";
import Header from "@/app/components/Header/Header";
import { useFetch } from "@/app/hooks/useFetch";
import GroupsList from "@/app/components/GroupsList/GroupsList";
import DrawList from "@/app/components/DrawList/DrawList";
import Modal from "@/app/components/Modal/Modal";
import { useModal } from "@/app/context/ModalContext";
import CreateEventPlayer from "@/app/components/CreateEventPlayer/CreateEventPlayer";
import GenerateGroups from "@/app/components/GenerateGroups/GenerateGroups";
import GenerateDraw from "@/app/components/GenerateDraw/GenerateDraw";

export default function Event({ params }) {
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
    async function beginRound(round) {
        const response = await fetch(`/api/begin-round`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
                'Expires': '0'
            },
            body: JSON.stringify({ matchRound: round, eventId: event.eventId })
        });
        const draw = await response.json();
        setEvent({
            ...event,
            draw
        });
    };
    return (
        <main>
            <Header
                backLink={`/tournament/${params.tournamentId || params.TournamentId}`}
                headerTitle={event.eventName}
                headerButtons={[
                    event.eventStatus === "Upcoming" && event.eventStage === null && {
                        buttonName: "+ Add Players",
                        buttonClassName: "Primary",
                        onClickFunction: () => setShowModal("Add Player")
                    },
                    event.eventStatus === "Upcoming" && event.eventStage === null && {
                        buttonName: "Generate Groups",
                        buttonClassName: "Secondary",
                        onClickFunction: () => setShowModal("Generate Groups")
                    },
                    event.eventStage === "Groups" && event.eventStatus === "Upcoming" && {
                        buttonName: "Begin Groups",
                        buttonClassName: "Primary",
                        onClickFunction: () => beginGroups(event.eventId)
                    },
                    event.eventStage === "Groups" && event.eventStatus === "Pending" && {
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
                category === "Groups" ? <GroupsList event={event} /> : (
                    category === "Draw" ? <DrawList event={event} /> : (
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