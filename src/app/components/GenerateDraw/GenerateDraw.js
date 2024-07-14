"use client";
import "./GenerateDraw.css";
import { useState } from "react";

export default function GenerateDraw({ event, setEvent, setShowModal }) {
    const [generateThirdPlace, setGenerateThirdPlace] = useState(false);
    async function onSubmit() {
        const response = await fetch(`/api/generate-draw`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
                'Expires': '0'
            },
            body: JSON.stringify({ eventId: event.eventId, generateThirdPlace })
        });
        const draw = await response.json();
        setEvent({
            ...event,
            draw
        });
        setShowModal(false);
    };
    return (
        <div className="create-event-player-modal">
            <div className="form">
                <label>
                    <input type="checkbox" onChange={() => setGenerateThirdPlace(!generateThirdPlace)} />
                    Generate third place match
                </label>
                <button type="submit" onClick={onSubmit}>Submit</button>
            </div>
        </div>
    );
};
