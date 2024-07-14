"use client";
import "./GenerateDraw.css";
import { useState } from "react";

export default function GenerateDraw({ event, setEvent }) {
    const [keyword, setKeyword] = useState("");
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
    };
    return (
        <div className="create-event-player-modal">
            <div className="form">
                <input type="checkbox" value={generateThirdPlace} onChange={e => setGenerateThirdPlace(!generateThirdPlace)} />
                <button type="submit" onClick={onSubmit}>Submit</button>
            </div>
        </div>
    );
};
