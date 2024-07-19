"use client"
import "./AdminEditGroup.css";
import TableFinder from "../TableFinder/TableFinder";
import GroupCard from "../GroupCard/GroupCard";
import { usePlayer } from "@/app/context/PlayerContext";

export default function AdminEditGroup({ event, group }) {
    const {player} = usePlayer()
    if (!group) return null;
    return (
        <div className="admin-modal">
            <GroupCard group={group} tournamentId={event.tournamentId} eventType={event.eventType} />
            {player && player.isAdmin && <TableFinder groupId={group.groupId} tournamentId={event.tournamentId} />}
        </div>
    );
};