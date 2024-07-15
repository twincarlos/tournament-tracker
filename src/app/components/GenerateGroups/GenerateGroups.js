"use client"
import "./GenerateGroups.css";
import { useState } from "react";

export default function GenerateGroups({ event, setEvent }) {
    const [date, setDate] = useState(event.eventDate ? event.eventDate.slice(0, 10) : "");
    const [time, setTime] = useState(event.eventTime || "");

    async function onSubmit() {
        const response = await fetch(`/api/generate-groups`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
                'Expires': '0'
            },
            body: JSON.stringify({ eventId: event.eventId, matchesDate: event.eventDate, matchesTime: event.eventTime, groupsDate: date, groupsTime: time })
        });
        const groups = await response.json();
        setEvent({
            ...event,
            groups
        });
    };
    
    return (
        <div className="generate-groups-modal">
            <div className="player-list">
                {
                    event.eventPlayers.map(eventPlayer => (
                        <div key={eventPlayer.playerId} className="generate-groups-modal-player-details">
                            <p>
                                {eventPlayer.playerRating}
                            </p>
                            <p>
                                {eventPlayer.playerName}
                            </p>
                        </div>
                    ))
                }
            </div>
            <fieldset>
                <legend>Date and Time</legend>
                <input type="date" value={date} onChange={e => setDate(e.target.value)} />
                <input type="time" value={time} onChange={e => setTime(e.target.value)} />
            </fieldset>
            <button onClick={onSubmit}>Generate Groups</button>
        </div>
    );
};