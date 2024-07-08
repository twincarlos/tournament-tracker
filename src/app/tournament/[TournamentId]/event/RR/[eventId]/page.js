"use client";
import "./Event.css";
import { useState } from "react";
import Header from "@/app/components/Header/Header";
import { useFetch } from "@/app/hooks/useFetch";
import GroupsList from "@/app/components/GroupsList/GroupsList";
import DrawList from "@/app/components/DrawList/DrawList";

export default function Event({ params }) {
    const [event, setEvent] = useState({
        groups: [],
        draw: []
    });
    const [category, setCategory] = useState("Groups");
    useFetch(`/api/get-rr-event/${params.eventId || params.EventId}`, setEvent);
    if (!event.groups.length) return null;
    return (
        <main>
            <Header backLink={`/tournament/${params.tournamentId || params.TournamentId}`} headerTitle={event.groups[0].eventName} />
            <section className="tabs">
                <button onClick={() => setCategory("Groups")} className={`${category === "Groups" ? "selected" : ""} tab`}>Groups</button>
                <button onClick={() => setCategory("Draw")} className={`${category === "Draw" ? "selected" : ""} tab`}>Draw</button>
            </section>
            {category === "Groups" ? <GroupsList groups={event.groups} /> : <DrawList draw={event.draw} />}
        </main>
    );
};