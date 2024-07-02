"use client";
import { useState } from "react";
import TournamentCard from "./components/TournamentCard/TournamentCard";
import Link from "next/link";
import Header from "./components/Header/Header";
import { useFetch } from "./hooks/useFetch";

export default function Home() {
  const [tournaments, setTournaments] = useState([]);
  useFetch("/api/get-all-tournaments", setTournaments);
  return (
    <main>
      <Header headerTitle={"Tournaments"} />
      <section>
        {tournaments.map(tournament => (
            <Link className="card tournament-card"
              href={`/tournament/${tournament.tournamentId}`} key={tournament.tournamentId}>
              <TournamentCard tournament={tournament} />
            </Link>
          )
        )}
      </section>
    </main>
  );
};