"use client";
import "./Tournament.css";
import { useState } from "react";
import Link from "next/link";
import EventCard from "@/app/components/EventCard/EventCard";
import Header from "@/app/components/Header/Header";
import { useFetch } from "@/app/hooks/useFetch";

export default function Tournament({ params }) {
    const [events, setEvents] = useState([]);
    useFetch(`/api/get-all-events/${params.tournamentId || params.TournamentId}`, setEvents);
    return (
        <main>
            <Header backLink="/" headerTitle={events[0]?.tournamentName} />
            <section className="gallery">
                {
                    events.map(event => (
                        <Link className="card event-card event-link" href={`/tournament/${params.tournamentId}/event/${event.eventType}/${event.eventId}`} key={event.eventId}>
                            <EventCard event={event} />
                        </Link>
                    ))
                }
            </section>
        </main>
    );
};