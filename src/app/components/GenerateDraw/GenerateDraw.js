"use client";
import "./GenerateDraw.css";
import { useState } from "react";

export default function GenerateDraw({ event, setEvent }) {
    const [keyword, setKeyword] = useState("");
    const [playerIds, setPlayerIds] = useState([]);
    async function onSubmit() {
        const response = await fetch(`/api/generate-draw`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
                'Expires': '0'
            },
            body: JSON.stringify({ eventId: event.eventId, playerIds })
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
                <fieldset onChange={e => playerIds.includes(e.target.value) ? setPlayerIds(playerIds.filter(playerId => playerId !== e.target.value)) : setPlayerIds([...playerIds, e.target.value])}>
                    <legend>Select Players:</legend>
                    {
                        event.players.map(player => (
                            <label key={player.playerId}>
                                <input type="checkbox" value={player.playerId}  />
                                <div className="create-event-player-modal-player-details">
                                    <p>
                                        {player.playerRating}
                                    </p>
                                    <p>
                                        {player.playerName}
                                    </p>
                                </div>
                            </label>
                        ))
                    }
                </fieldset>
                <button type="submit" onClick={onSubmit}>Submit</button>
            </div>
        </div>
    );
};