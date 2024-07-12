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

export default function Event({ params }) {
    const { setShowModal } = useModal();
    const [event, setEvent] = useState({
        players: [],
        eventPlayers: [],
        groups: [],
        draw: []
    });
    const [category, setCategory] = useState("Groups");
    const [modalType, setModalType] = useState(null);
    useFetch(`/api/get-rr-event/${params.eventId || params.EventId}`, setEvent);
    return (
        <main>
            <Header
                backLink={`/tournament/${params.tournamentId || params.TournamentId}`}
                headerTitle={event.eventName}
                headerButtons={[
                    {
                        buttonName: "+ Add Players",
                        buttonClassName: "Primary",
                        onClickFunction: () => {
                            setModalType("Add-Players")
                            setShowModal(true)
                        }
                    },
                    {
                        buttonName: "Generate Group",
                        buttonClassName: "Secondary",
                        onClickFunction: () => {
                            setModalType("Generate-Groups")
                            setShowModal(true)
                        }
                    }
                ]}
            />
            <Modal>
                {
                    modalType === "Add-Players" ? (
                        <CreateEventPlayer
                            event={event}
                            setEvent={setEvent}
                        />
                    ) : (
                        <GenerateGroups
                            event={event}
                            setEvent={setEvent}
                        />
                    )
                }
                </Modal>
                <section className="tabs">
                <button onClick={() => setCategory("Groups")} className={`${category === "Groups" ? "selected" : ""} tab`}>Groups</button>
                <button onClick={() => setCategory("Draw")} className={`${category === "Draw" ? "selected" : ""} tab`}>Draw</button>
                <button onClick={() => setCategory("Players")} className={`${category === "Players" ? "selected" : ""} tab`}>Players</button>
            </section>
            {
                category === "Groups" ? <GroupsList groups={event.groups} /> : (
                    category === "Draw" ? <DrawList draw={event.draw} /> : (
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