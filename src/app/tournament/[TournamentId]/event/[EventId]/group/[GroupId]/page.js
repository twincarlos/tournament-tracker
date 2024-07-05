"use client";
import "./Group.css";
import { useState } from "react";
import { useFetch } from "@/app/hooks/useFetch";
import { useMatch } from "@/app/context/MatchContext";
import MatchCard from "@/app/components/MatchCard/MatchCard";
import EditableMatch from "@/app/components/EditableMatch/EditableMatch";
import Modal from "@/app/components/Modal/Modal";
import Header from "@/app/components/Header/Header";

export default function Group({ params }) {
    const [matches, setMatches] = useState([]);
    const { match } = useMatch();
    useFetch(`/api/get-all-group-matches/${params.groupId || params.GroupId}`, setMatches);
    return (
        <main>
            <Header backLink={`/tournament/${params.tournamentId}/event/${params.eventId}`} headerTitle={matches[0] ? `${matches[0]?.eventName} • Group ${matches[0]?.groupNumber}` : null} />
            <Modal>
                {
                    match?.matchStatus === "Finished" ? <MatchCard inModal={true} match={match} /> : <EditableMatch match={match} />
                }
            </Modal>
            <section className="column">
                {
                    matches.map(match => (
                        <MatchCard
                            key={match.matchId}
                            match={match}
                        />
                    ))
                }
            </section>
        </main>
    );
};