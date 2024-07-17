import "./TournamentCard.css";

export default function TournamentCard({ tournament }) {
    return (
        <div>
            <div className="card-title">
                <p>{tournament.tournamentName}</p>
            </div>
            <div>
                <p>{new Date(tournament.tournamentDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'America/New_York' })}</p>
            </div>
        </div>
    );
};