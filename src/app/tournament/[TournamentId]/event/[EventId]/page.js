"use client";
import "./Event.css";
import { useState } from "react";
import GroupCard from "@/app/components/GroupCard/GroupCard";
import Header from "@/app/components/Header/Header";
import { useFetch } from "@/app/hooks/useFetch";
import { useSubscribe } from "@/app/hooks/useSubscribe";

export default function Event({ params }) {
    const [groups, setGroups] = useState([]);
    useFetch(`/api/get-all-groups/${params.eventId}`, setGroups);
    useSubscribe(
        `event_${params.eventId}_groups`,
        "update_groups",
        data => setGroups(data)
    );
    return (
        <main>
            <Header backLink={`/tournament/${params.tournamentId}`} headerTitle={groups[0]?.eventName} />
            <section className="gallery">
                { groups.map(group =>  <GroupCard key={group.groupId} group={group} />) }
            </section>
        </main>
    );
};