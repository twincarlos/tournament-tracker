"use client";
import "./GroupsList.css";
import GroupCard from "../GroupCard/GroupCard";
import { useModal } from "@/app/context/ModalContext";
import Modal from "../Modal/Modal";
import AdminEditGroup from "../AdminEditGroup/AdminEditGroup";
import { useState } from "react";

export default function GroupsList({ event }) {
    const { showModal, setShowModal } = useModal();
    const [editGroup, setEditGroup] = useState(null);

    return (
        <section className="groups-list">
            {showModal === "Edit Group" && <Modal>
                <AdminEditGroup event={event} group={editGroup} />
            </Modal>}
            {
                event.groups.map(group => (
                    <div key={group.groupId} className="group-container">
                        {event.eventStage !== "Draw" && group.groupStatus !== "Finished" && <button onClick={() => {
                            setEditGroup(group);
                            setShowModal("Edit Group");
                        }} className="admin-edit-button"><i className="fa-regular fa-pen-to-square"/></button>}
                        <GroupCard tournamentId={event.tournamentId} eventType={event.eventType} group={group} />
                    </div>
                ))
            }
        </section>
    );
};