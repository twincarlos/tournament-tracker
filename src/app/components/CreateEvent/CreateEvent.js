"use client";
import "./CreateEvent.css";
import { useState } from "react";

export default function CreateEvent({ tournament, setTournament, tournamentId }) {
    const [data, setData] = useState({
        tournamentId,
        eventName: "",
        eventDate: "",
        eventTime: "",
        eventType: "RR",
        allowUnratedQualify: false
    });
    async function onSubmit() {
        const response = await fetch(`/api/create-event`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
                'Expires': '0'
            },
            body: JSON.stringify(data)
        });
        const event = await response.json();
        setTournament({
            ...tournament,
            events: [
                ...tournament.events,
                event
            ]
        });
        setData({
            tournamentId,
            eventName: "",
            eventDate: "",
            eventTime: "",
            eventType: "RR",
            allowUnratedQualify: false
        });
    };
    return (
        <div className="create-event-modal">
            <div>
                <h2>Create Event</h2>
            </div>
            <div className="form">
                <label>
                    Event Name:
                    <input type="text" value={data.eventName} onChange={e => setData({ ...data, eventName: e.target.value })} />
                </label>
                <label>
                    Event Date:
                    <input type="date" value={data.eventDate} onChange={e => setData({ ...data, eventDate: e.target.value })} />
                </label>
                <label>
                    Event Time:
                    <input type="time" value={data.eventTime} onChange={e => setData({ ...data, eventTime: e.target.value })} />
                </label>
                <fieldset value={data.eventType} onChange={e => setData({ ...data, eventType: e.target.value })}>
                    <legend>Event Type:</legend>
                    <label>
                        <input type="radio" name="event-type" value="RR" checked={data.eventType === "RR"} />
                        RR
                    </label>
                    <label>
                        <input type="radio" name="event-type" value="GRR" checked={data.eventType === "GRR"} />
                        GRR
                    </label>
                    <label>
                        <input type="radio" name="event-type" value="Teams" checked={data.eventType === "Teams"} />
                        Teams
                    </label>
                    <label>
                        <input type="radio" name="event-type" value="Handicap" checked={data.eventType === "Handicap"} />
                        Handicap
                    </label>
                </fieldset>
                <label className="checkbox">
                    <input type="checkbox" value={data.allowUnratedQualify} onChange={e => setData({ ...data, allowUnratedQualify: e.target.value })} />
                    Allow unrated players to qualify
                </label>
                <button className="Primary" type="submit" onClick={onSubmit}>Submit</button>
            </div>
        </div>
    );
};