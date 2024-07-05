"use client";
import "./Event.css";
import { useState } from "react";
import Header from "@/app/components/Header/Header";
import { useFetch } from "@/app/hooks/useFetch";
import GroupsList from "@/app/components/GroupsList/GroupsList";

export default function Event({ params }) {
    const [groups, setGroups] = useState([]);
    useFetch(`/api/get-event/${params.eventId || params.EventId}`, data => setGroups(data.groups));
    return (
        <main>
            <Header backLink={`/tournament/${params.tournamentId}`} headerTitle={groups[0]?.eventName} />
            <GroupsList groups={groups} />
        </main>
    );
};