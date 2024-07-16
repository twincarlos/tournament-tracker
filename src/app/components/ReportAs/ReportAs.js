"use client";
import "./ReportAs.css";
import { usePlayer } from "@/app/context/PlayerContext";

export default function ReportAs({tournament}) {
    const {setPlayer} = usePlayer();
    return (
        <div className="report-as-modal">
            <label>
                Report As:
                <select onChange={e => {
                    localStorage.setItem("player", e.target.value);
                    setPlayer(JSON.parse(e.target.value));
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
        </div>
    );
};