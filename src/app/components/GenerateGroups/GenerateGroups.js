"use client";
import "./GenerateGroups.css";

export default function GenerateGroups({ event, setEvent }) {
    async function onSubmit() {
        const response = await fetch(`/api/generate-groups`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
                'Expires': '0'
            },
            body: JSON.stringify({ eventId: event.eventId })
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
            <button onClick={onSubmit}>Generate Groups</button>
        </div>
    );
};