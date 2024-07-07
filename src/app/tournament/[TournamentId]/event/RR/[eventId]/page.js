"use client";
import "./Event.css";
import { useState } from "react";
import Header from "@/app/components/Header/Header";
import { useFetch } from "@/app/hooks/useFetch";
import GroupsList from "@/app/components/GroupsList/GroupsList";
import DrawList from "@/app/components/DrawList/DrawList";

export default function Event({ params }) {
    const [event, setEvent] = useState({});
    useFetch(`/api/get-rr-event/${params.eventId || params.EventId}`, setEvent);
    if (!event.groups) return null;
    return (
        <main>
            <Header backLink={`/tournament/${params.tournamentId}`} headerTitle={event.groups[0].eventName} />
            <DrawList draw={event.draw} />
            {/* <GroupsList groups={event.groups} /> */}
        </main>
    );
};