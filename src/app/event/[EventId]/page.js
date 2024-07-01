"use client";
import "./Event.css";
import { useEffect, useState } from "react";
import GroupCard from "@/app/components/GroupCard/GroupCard";

export default function Event({ params }) {
    const [groups, setGroups] = useState([]);
    useEffect(() => {
        (async function () {
            const response = await fetch(`/api/get-all-groups/${params.EventId}`, {
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
            { groups.map(group =>  <GroupCard key={group.groupid} group={group} />) }
        </main>
    );
};