"use client";
import "./GroupsList.css";
import GroupCard from "../GroupCard/GroupCard";
import { useModal } from "@/app/context/ModalContext";
import Modal from "../Modal/Modal";
import AdminEditGroup from "../AdminEditGroup/AdminEditGroup";
import { useState } from "react";

export default function GroupsList({ setEvent, groupsPrintRef, event, player }) {
    const { showModal, setShowModal } = useModal();
    const [editGroup, setEditGroup] = useState(null);
    const [swap, setSwap] = useState(false);
    const [eventPlayerSwap, setEventPlayerSwap] = useState([]);

    async function swapEventPlayers() {
        const response = await fetch(`/api/swap-players/groups`, {
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
        const groups = await response.json();
        setEventPlayerSwap([]);
        setEvent({ ...event, groups });
    };

    return (
        <section className="groups-list-container" ref={groupsPrintRef}>
            {(player && player.isAdmin && event.eventStatus === 'Upcoming' && event.eventStage === 'Groups') && <div className="swap-buttons">
                {
                    swap === false ? (
                        <button className="Secondary" onClick={() => setSwap(true)}><i className="fa-regular fa-pen-to-square" /> Edit Seeds</button>
                    ) : (
                        <>
                            <button className="Primary" onClick={swapEventPlayers}><i className="fa-solid fa-shuffle" /> SWAP</button>
                            <button className="Secondary" onClick={() => {
                                setSwap(false);
                                setEventPlayerSwap([]);
                            }}>Cancel</button>
                        </>
                    )
                }
            </div>}
            <div style={{ display: 'none' }} className="print-event-name">
                <h1>{event.eventName}</h1>
                <p>{new Date(event.eventDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'America/New_York' })} • {event.eventTime?.slice(0, 5)}</p>
            </div>
            <div className="groups-list">
                {showModal === "Edit Group" && <Modal>
                    <AdminEditGroup event={event} group={editGroup} />
                </Modal>}
                {
                    event.groups.map(group => (
                        <div key={group.groupId} className="group-container">
                            {(player && player.isAdmin) && (event.eventStage !== "Draw" && group.groupStatus !== "Finished") && <button onClick={() => {
                                setEditGroup(group);
                                setShowModal("Edit Group");
                            }} className="admin-edit-button"><i className="fa-regular fa-pen-to-square"/></button>}
                            <GroupCard swap={swap} eventPlayerSwap={eventPlayerSwap} setEventPlayerSwap={setEventPlayerSwap} tournamentId={event.tournamentId} eventType={event.eventType} group={group} />
                        </div>
                    ))
                }
            </div>
        </section>
    );
};