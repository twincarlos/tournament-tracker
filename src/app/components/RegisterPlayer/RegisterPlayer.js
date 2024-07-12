"use client";
import "./RegisterPlayer.css";
import { useState } from "react";

export default function RegisterPlayer({ tournament, setTournament, tournamentId }) {
    const [data, setData] = useState({
        tournamentId,
        playerName: "",
        playerRating: null,
        playerIsEstimated: false,
        playerDOB: "",
        playerLocation: "",
        playerClub: ""
    });
    async function onSubmit() {
        const response = await fetch(`/api/register-player`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
                'Expires': '0'
            },
            body: JSON.stringify({
                tournamentId: data.tournamentId,
                playerName: data.playerName.length ? data.playerName : null,
                playerRating: data.playerRating,
                playerIsEstimated: data.playerIsEstimated,
                playerDOB: data.playerDOB.length ? data.playerDOB : null,
                playerLocation: data.playerLocation,
                playerClub: data.playerClub
            })
        });
        const player = await response.json();
        setTournament({
            ...tournament,
            players: [
                ...tournament.players,
                player
            ]
        });
        setData({
            tournamentId,
            playerName: "",
            playerRating: "",
            playerIsEstimated: false,
            playerDOB: "",
            playerLocation: "",
            playerClub: ""
        });
    };
    return (
        <div className="register-player-modal">
            <div>
                <h2>Register Player</h2>
            </div>
            <div className="form">
                <label>
                    Player Name:
                    <input type="text" value={data.playerName} onChange={e => setData({ ...data, playerName: e.target.value })} />
                </label>
                <label>
                    Player Rating:
                    <input type="number" value={data.playerRating === null ? "" : data.playerRating} onChange={e => setData({ ...data, playerRating: e.target.value === "" ? null : Number(e.target.value) })} />
                </label>
                <label>
                    Player DOB:
                    <input type="date" value={data.playerDOB} onChange={e => setData({ ...data, playerDOB: e.target.value })} />
                </label>
                <label>
                    Player Location:
                    <input type="text" value={data.playerLocation} onChange={e => setData({ ...data, playerLocation: e.target.value })} />
                </label>
                <label>
                    Player Club:
                    <input type="text" value={data.playerClub} onChange={e => setData({ ...data, playerClub: e.target.value })} />
                </label>
                <label className="checkbox">
                    <input type="checkbox" value={data.playerIsEstimated} onChange={e => setData({ ...data, playerIsEstimated: e.target.value })} />
                    Player rating is estimated
                </label>
                <button type="submit" onClick={onSubmit}>Submit</button>
            </div>
        </div>
    );
};