"use client";
import "./Event.css";
import { useState } from "react";
import GroupCard from "@/app/components/GroupCard/GroupCard";
import Header from "@/app/components/Header/Header";
import { useFetch } from "@/app/hooks/useFetch";

export default function Event({ params }) {
    const [groups, setGroups] = useState([]);
    useFetch(`/api/get-all-groups/${params.eventId || params.EventId}`, setGroups);
    return (
        <main>
            <Header backLink={`/tournament/${params.tournamentId}`} headerTitle={groups[0]?.eventName} />
            <section className="gallery">
                { groups.map(group =>  <GroupCard key={group.groupId} group={group} />) }
            </section>
        </main>
    );
};