"use client";
import { useEffect, useState } from "react";
import TournamentCard from "./components/TournamentCard/TournamentCard";
import Link from "next/link";

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
      {tournaments.map(tournament => (
          <Link href={`/tournament/${tournament.tournamentid}`} key={tournament.tournamentid}>
            <TournamentCard
              TournamentName={tournament.tournamentname}
              TournamentDate={tournament.tournamentdate}
            />
          </Link>
        )
      )}
    </main>
  );
};