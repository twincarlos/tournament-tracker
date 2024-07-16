"use client";
import "./CreateTournament.css";
import { useState } from "react";

export default function CreateTournament({ tournaments, setTournaments, setShowModal }) {
    const [data, setData] = useState({
        tournamentName: "",
        tournamentDate: ""
    });
    async function onSubmit() {
        const response = await fetch(`/api/create-tournament`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
                'Expires': '0'
            },
            body: JSON.stringify(data)
        });
        const tournament = await response.json();
        setTournaments([...tournaments, tournament]);
        setShowModal(false);
    };
    return (
        <div className="create-tournament-modal">
            <div>
                <h2>Create Tournament</h2>
            </div>
            <div className="form">
                <label>
                    Tournament Name:
                    <input type="text" value={data.tournamentName} onChange={e => setData({ ...data, tournamentName: e.target.value })} />
                </label>
                <label>
                    Tournament Date:
                    <input type="date" value={data.tournamentDate} onChange={e => setData({ ...data, tournamentDate: e.target.value })} />
                </label>
                <button className="Primary" type="submit" onClick={onSubmit}>Submit</button>
            </div>
        </div>
    );
};