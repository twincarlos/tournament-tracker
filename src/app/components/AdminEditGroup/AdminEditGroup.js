"use client"
import "./AdminEditGroup.css";
import TableFinder from "../TableFinder/TableFinder";
import GroupCard from "../GroupCard/GroupCard";

export default function AdminEditGroup({ event, group }) {
    if (!group) return null;
    return (
        <div className="admin-modal">
            <GroupCard group={group} tournamentId={event.tournamentId} eventType={event.eventType} />
            <TableFinder groupId={group.groupId} tournamentId={event.tournamentId} />
        </div>
    );
};