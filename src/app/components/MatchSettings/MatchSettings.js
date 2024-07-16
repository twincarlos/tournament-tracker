import "./MatchSettings.css";

export default function MatchSettings({ matchId }) {
    async function updateMatchBestOf(matchBestOf) {
        const response = await fetch(`/api/update-match-best-of`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
                'Expires': '0'
            },
            body: JSON.stringify({ matchBestOf, matchId })
        });
    };
    async function startMatch() {
        const response = await fetch(`/api/start-match`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
                'Expires': '0'
            },
            body: JSON.stringify({ matchId })
        });
    };
    return (
        <div className="match-best-of-settings">
            <fieldset>
                <legend>Best of:</legend>
                <button className="Secondary" onClick={() => updateMatchBestOf(5)}>5 games</button>
                <button className="Secondary" onClick={() => updateMatchBestOf(7)}>7 games</button>
            </fieldset>
            <button className="Primary" onClick={startMatch}>Start match</button>
        </div>
    );
};