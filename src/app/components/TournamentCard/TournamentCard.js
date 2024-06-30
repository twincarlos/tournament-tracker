import "./TournamentCard.css";

export default function TournamentCard({ TournamentName, TournamentDate }) {
    return (
        <div className="card tournament-card">
            <div className="card-title">
                <p>{TournamentName}</p>
            </div>
            <div>
                <p>{new Date(TournamentDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
        </div>
    );
};