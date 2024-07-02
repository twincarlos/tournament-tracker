"use client";
import { useEffect, useState } from "react";
import TournamentCard from "./components/TournamentCard/TournamentCard";
import Link from "next/link";
import Header from "./components/Header/Header";

export default function Home() {
  const [tournaments, setTournaments] = useState([]);
  useEffect(() => {
    (async function () {
      const response = await fetch("/api/get-all-tournaments", {
        headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Expires': '0'
        }
    });
      const data = await response.json();
      setTournaments(data);
    })();
  }, []);
  return (
    <main>
      <Header headerTitle={"Tournaments"} />
      <section>
        {tournaments.map(tournament => (
            <Link
              href={`/tournament/${tournament.tournamentId}`} key={tournament.tournamentId}>
              <TournamentCard tournament={tournament} />
            </Link>
          )
        )}
      </section>
    </main>
  );
};