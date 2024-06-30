import TournamentCard from "./components/TournamentCard/TournamentCard";
import EventCard from "./components/EventCard/EventCard";
import MatchCard from "./components/MatchCard/MatchCard";

export default function Home() {
  return (
    <main>
      <TournamentCard />
      <EventCard />
      <MatchCard />
    </main>
  );
};