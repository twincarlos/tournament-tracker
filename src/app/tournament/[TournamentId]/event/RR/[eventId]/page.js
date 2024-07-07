"use client";
import "./Event.css";
import { useState } from "react";
import Header from "@/app/components/Header/Header";
import { useFetch } from "@/app/hooks/useFetch";
import GroupsList from "@/app/components/GroupsList/GroupsList";
import DrawList from "@/app/components/DrawList/DrawList";

export default function Event({ params }) {
    const [groups, setGroups] = useState([]);
    const [draw, setDraw] = useState([]);
    useFetch(`/api/get-rr-event/${params.eventId || params.EventId}`, data => {
        setGroups(data.groups);
        setDraw(data.draw);
    });
    return (
        <main>
            <Header backLink={`/tournament/${params.tournamentId}`} headerTitle={groups[0]?.eventName} />
            <DrawList draw={draw} />
            {/* <GroupsList groups={groups} /> */}
        </main>
    );
};