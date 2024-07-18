"use client";
import "./Group.css";
import { useState } from "react";
import { useFetch } from "@/app/hooks/useFetch";
import { useMatch } from "@/app/context/MatchContext";
import { useModal } from "@/app/context/ModalContext";
import MatchCard from "@/app/components/MatchCard/MatchCard";
import EditableMatch from "@/app/components/EditableMatch/EditableMatch";
import Modal from "@/app/components/Modal/Modal";
import Header from "@/app/components/Header/Header";
import TableFinder from "@/app/components/TableFinder/TableFinder";
import MatchSettings from "@/app/components/MatchSettings/MatchSettings";
import { usePlayer } from "@/app/context/PlayerContext";

export default function Group({ params }) {
    const {player} = usePlayer();
    const [matches, setMatches] = useState([]);
    const { match } = useMatch();
    const {showModal} = useModal();
    useFetch(`/api/get-all-group-matches/${params.groupId || params.GroupId}`, setMatches);

    return (
        <main>
            <Header backLink={`/tournament/${params.tournamentId || params.TournamentId}/event/RR/${params.eventId || params.EventId}`} headerTitle={matches[0] ? `${matches[0]?.eventName} • Group ${matches[0]?.groupNumber}` : null} />
            {showModal === "Group Match" && <Modal>
                <div className="admin-modal">
                    {
                        ((match.matchStatus === "Finished" || match.matchStatus === "Upcoming") && (player && player.isAdmin === true)) ? <MatchCard match={match} inModal={true} /> : <EditableMatch match={match} />
                    }
                    {(player && player.isAdmin) && <div className="match-settings">
                        <TableFinder tournamentId={params.tournamentId || params.TournamentId} matchId={match?.matchId} />
                        {match?.matchStatus === "Upcoming" && <MatchSettings matchId={match?.matchId} />}
                    </div>}
                </div>
            </Modal>}
            <section className="column">
                {
                    matches.map(match => (
                        <MatchCard
                            key={match.matchId}
                            match={match}
                            inModal={false}
                        />
                    ))
                }
            </section>
        </main>
    );
};