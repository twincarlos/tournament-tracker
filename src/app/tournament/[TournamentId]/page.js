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
import ReportAs from "@/app/components/ReportAs/ReportAs";
import Modal from "@/app/components/Modal/Modal";
import { usePlayer } from "@/app/context/PlayerContext";

export default function Tournament({ params }) {
    const {player} = usePlayer();
    const [tournament, setTournament] = useState({
        events: [],
        players: []
    });
    const [category, setCategory] = useState("Events");
    useFetch(`/api/get-tournament/${params.tournamentId || params.TournamentId}`, setTournament);
    const { showModal, setShowModal } = useModal();
    return (
        <main>
            <Header
                backLink="/"
                headerTitle={tournament.tournamentName}
                headerButtons={[
                    {
                        buttonName: "Report As",
                        buttonClassName: "Primary",
                        onClickFunction: () => setShowModal("Report As")
                    },
                    player && player.isAdmin && {
                        buttonName: "+ Create Event",
                        buttonClassName: "Primary",
                        onClickFunction: () => setShowModal("Create Event")
                    },
                    player && player.isAdmin && {
                        buttonName: "Register Player",
                        buttonClassName: "Secondary",
                        onClickFunction: () => setShowModal("Register Player")
                    }
                ]}
            />
            {showModal === "Report As" && <Modal>
                <ReportAs tournament={tournament} />
                </Modal>}
            {showModal === "Create Event" && <Modal>
                <CreateEvent tournament={tournament} setTournament={setTournament} tournamentId={tournament.tournamentId} />
            </Modal>}
            {showModal === "Register Player" && <Modal>
            <RegisterPlayer tournament={tournament} setTournament={setTournament} tournamentId={tournament.tournamentId} />
            </Modal>}
            <section className="tabs">
                <button onClick={() => setCategory("Players")} className={`${category === "Players" ? "Primary" : "Secondary"}`}>Players</button>
                <button onClick={() => setCategory("Events")} className={`${category === "Events" ? "Primary" : "Secondary"}`}>Events</button>
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
                    <section className="event-list">
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