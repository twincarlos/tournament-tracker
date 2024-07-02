"use client";
import "./Event.css";
import { useEffect, useState } from "react";
import GroupCard from "@/app/components/GroupCard/GroupCard";
import Header from "@/app/components/Header/Header";

export default function Event({ params }) {
    const [groups, setGroups] = useState([]);
    useEffect(() => {
        (async function () {
            const response = await fetch(`/api/get-all-groups/${params.eventId}`, {
                headers: {
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache',
                    'Expires': '0'
                }
            });
            const data = await response.json();
            setGroups(data);
        })();
    }, []);
    return (
        <main>
            <Header backLink={`/tournament/${params.tournamentId}`} headerTitle={groups[0]?.eventName} />
            <section className="gallery">
                { groups.map(group =>  <GroupCard key={group.groupId} group={group} />) }
            </section>
        </main>
    );
};