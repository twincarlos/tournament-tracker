import "./PlayerInfo.css";

export default function PlayerInfo({ player }) {
    return (
        <div className="player-info">
            <div className="player-location">
                <p>{player.playerRating} • {player.playerClub} {`(${player.playerLocation})`}</p>
            </div>
            <div className="player-name">
                <p>{player.playerName}</p>
            </div>
        </div>
    );
};