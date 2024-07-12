"use client";
import "./Tournament.css";
import { useState } from "react";
import Link from "next/link";
import EventCard from "@/app/components/EventCard/EventCard";
import Header from "@/app/components/Header/Header";
import { useFetch } from "@/app/hooks/useFetch";
import { useModal } from "@/app/context/ModalContext";
import CreateEvent from "@/app/components/CreateEvent/CreateEvent";
import RegisterPlayer from "@/app/components/RegisterPlayer/RegisterPlayer";
import Modal from "@/app/components/Modal/Modal";

export default function Tournament({ params }) {
    const [tournament, setTournament] = useState({
        events: [],
        players: []
    });
    const [modalType, setModalType] = useState(null);
    const [category, setCategory] = useState("Players");
    useFetch(`/api/get-tournament/${params.tournamentId || params.TournamentId}`, setTournament);
    const { setShowModal } = useModal();
    return (
        <main>
            <Header
                backLink="/"
                headerTitle={tournament.tournamentName}
                headerButtons={[
                    {
                        buttonName: "+ Create Event",
                        buttonClassName: "Primary",
                        onClickFunction: () => {
                            setModalType("Create-Event")
                            setShowModal(true)
                        }
                    },
                    {
                        buttonName: "Register Player",
                        buttonClassName: "Secondary",
                        onClickFunction: () => {
                            setModalType("Register-Player")
                            setShowModal(true)
                        }
                    }
                ]}
            />
            <Modal>
                {
                    modalType === "Create-Event" ? (
                        <CreateEvent tournament={tournament} setTournament={setTournament} tournamentId={tournament.tournamentId} />
                    ) : (
                        modalType === "Register-Player" ? (
                            <RegisterPlayer tournament={tournament} setTournament={setTournament} tournamentId={tournament.tournamentId} />
                        ) : null
                    )
                }
            </Modal>
            <section className="tabs">
                <button onClick={() => setCategory("Players")} className={`${category === "Players" ? "selected" : ""} tab`}>Players</button>
                <button onClick={() => setCategory("Events")} className={`${category === "Events" ? "selected" : ""} tab`}>Events</button>
            </section>
            {
                category === "Players" ? (
                    <section className="player-list">
                        {
                            tournament.players.map(player => (
                                <div className="player" key={player.playerId}>
                                    <p className="player-rating">{player.playerRating}</p>
                                    <p>{player.playerName}</p>
                                    <p>{player.playerLocation}</p>
                                    <p>{player.playerClub}</p>
                                </div>
                            ))
                        }
                    </section>
                ) : (
                    <section className="gallery">
                        {
                            tournament.events.map(event => (
                                <Link className="card event-card event-link" href={`/tournament/${tournament.tournamentId}/event/${event.eventType}/${event.eventId}`} key={event.eventId}>
                                    <EventCard event={event} />
                                </Link>
                            ))
                        }
                    </section>
                )
            }
        </main>
    );
};