"use client";
import "./ReportAs.css";
import { useState } from "react";
import { usePlayer } from "@/app/context/PlayerContext";

export default function ReportAs({ tournament }) {
    const [playerId, setPlayerId] = useState("");
    const [code, setCode] = useState("");
    const [show, setShow] = useState(false);
    const { setPlayer } = usePlayer();

    async function adminLogin() {
        const response = await fetch(`/api/admin-login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
                'Expires': '0'
            },
            body: JSON.stringify({ playerId, playerDOB: code })
        });
        const newPlayer = await response.json();
        if (newPlayer) {
            localStorage.setItem("player", JSON.stringify(newPlayer));
            setPlayer(newPlayer);
        }
        else {
            alert("Wrong code");
        };
    };

    return (
        <div className="report-as-modal">
            <label>
                Report As:
                <select onChange={e => {
                    const localPlayer = JSON.parse(e.target.value);
                    
                    if (localPlayer.isAdmin) {
                        setPlayerId(localPlayer.playerId);
                        setShow(true)
                    } else {
                        setShow(false);
                        localStorage.setItem("player", JSON.stringify(localPlayer));
                        setPlayer(localPlayer);
                    }
                }}>
                    {
                        tournament.players.map(player => (
                            <option value={JSON.stringify(player)} key={player.playerId}>
                                {player.playerRating} - {player.playerName}
                            </option>
                        ))
                    }
                </select>
            </label>
            {(show === true) && <label>
                <input type="text" value={code} onChange={e => setCode(e.target.value)} />
                <button onClick={adminLogin} type="submit">Submit</button>
            </label>}
        </div>
    );
};