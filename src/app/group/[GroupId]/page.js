"use client";
import "./Group.css";
import { useEffect, useState } from "react";
import { useMatch } from "@/app/context/MatchContext";
import MatchCard from "@/app/components/MatchCard/MatchCard";
import Modal from "@/app/components/Modal/Modal";
import Match from "@/app/components/Match/Match";

export default function Group({ params }) {
    const [matches, setMatches] = useState([]);
    const { match } = useMatch();
    
    useEffect(() => {
        (async function () {
            const response = await fetch(`/api/get-all-group-matches/${params.GroupId}`, {
                headers: {
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache',
                    'Expires': '0'
                }
            });
            const data = await response.json();
            setMatches(data);
        })();
    }, []);
    return (
        <main>
            <Modal>
                <Match match={match} />
            </Modal>
            {
                matches.map(match => (
                    <MatchCard
                        key={match.matchid}
                        match={match}
                    />
                ))
            }
        </main>
    );
};