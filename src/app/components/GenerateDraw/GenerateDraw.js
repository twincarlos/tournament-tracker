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
            body: JSON.stringify({ eventId: event.eventId, generateThirdPlace, estimatedPlayersMayAdvance: event.allowUnratedQualify })
        });
        const draw = await response.json();
        setEvent({
            ...event,
            draw
        });
        setShowModal(false);
    };
    return (
        <div className="generate-draw-modal">
            <div className="form">
                <label>
                    <input type="checkbox" onChange={() => setGenerateThirdPlace(!generateThirdPlace)} />
                    Generate third place match
                </label>
                <button className="Primary" type="submit" onClick={onSubmit}>Submit</button>
            </div>
        </div>
    );
};
