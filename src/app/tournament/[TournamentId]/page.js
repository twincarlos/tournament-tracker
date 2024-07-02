"use client";
import "./Tournament.css";
import { useEffect, useState } from "react";
import Link from "next/link";
import EventCard from "@/app/components/EventCard/EventCard";
import Header from "@/app/components/Header/Header";

export default function Tournament({ params }) {
    const [events, setEvents] = useState([]);
    useEffect(() => {
        (async function () {
            const response = await fetch(`/api/get-all-events/${params.tournamentId}`, {
                headers: {
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache',
                    'Expires': '0'
                }
            });
            const data = await response.json();
            setEvents(data);
        })();
    }, []);
    return (
        <main>
            <Header backLink="/" headerTitle={events[0]?.tournamentName} />
            <section className="gallery">
                {
                    events.map(event => (
                        <Link className="card event-card event-link" href={`/tournament/${params.tournamentId}/event/${event.eventId}`} key={event.eventId}>
                            <EventCard event={event} />
                        </Link>
                    ))
                }
            </section>
        </main>
    );
};