"use client";
import "./TableFinder.css";
import { useFetch } from "@/app/hooks/useFetch";
import { useState } from "react";

export default function TableFinder({ groupId, tournamentId, matchId }) {
    const [tables, setTables] = useState(null);
    const [newTables, setNewTables] = useState([]);
    useFetch(`/api/get-available-tables/${tournamentId}`, setTables);

    if (!tables) return null;

    async function onSubmit() {
        const response = await fetch(`/api/add-tables-to-group`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
                'Expires': '0'
            },
            body: JSON.stringify({ tables: newTables, groupId, matchId })
        });
        const data = await response.json();
    };

    return (
        <div className="table-finder-container">
            <div className="table-finder">
                {
                    tables.allTables.map(table => (
                        <button className={`table-button ${tables.occupiedTables.includes(table.tableId) ? "occupied" : "available"} ${newTables.includes(table.tableId) ? "selected" : ""}`} key={table.tableId} onClick={() => {
                            if (newTables.includes(table.tableId)) {
                                setNewTables(newTables.filter(newTable => newTable !== table.tableId));
                            } else {
                                setNewTables([...newTables, table.tableId])
                            };
                        }}>
                            {table.tableNumber}
                        </button>
                    ))
                }
            </div>
            <div className="save-button-container">
                <button className="Primary" onClick={onSubmit}>Update tables</button>
            </div>
        </div>
    );
};