"use client";
import { useState } from "react";
import TournamentCard from "./components/TournamentCard/TournamentCard";
import Link from "next/link";
import Header from "./components/Header/Header";
import { useFetch } from "./hooks/useFetch";
import { useModal } from "./context/ModalContext";
import Modal from "./components/Modal/Modal";
import CreateTournament from "./components/CreateTournament/CreateTournament";
import { usePlayer } from "./context/PlayerContext";

export default function Home() {
  const {player} = usePlayer();
  const [tournaments, setTournaments] = useState([]);
  const { showModal, setShowModal } = useModal();
  useFetch("/api/get-all-tournaments", setTournaments);
  return (
    <main>
      <Header
        headerTitle={"Tournaments"}
        headerButtons={[
          player && player.isAdmin === true && {
              buttonName: "+ Create Tournament",
              buttonClassName: "Primary",
              onClickFunction: () => setShowModal("Create Tournament")
          }
      ]}
      />
      {showModal === "Create Tournament" && <Modal>
        <CreateTournament tournaments={tournaments} setTournaments={setTournaments} setShowModal={setShowModal} />
      </Modal>}
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