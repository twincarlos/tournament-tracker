import "./TournamentCard.css";

export default function TournamentCard({ tournament }) {
    return (
        <div className="card tournament-card">
            <div className="card-title">
                <p>{tournament.tournamentname}</p>
            </div>
            <div>
                <p>{new Date(tournament.tournamentdate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
        </div>
    );
};