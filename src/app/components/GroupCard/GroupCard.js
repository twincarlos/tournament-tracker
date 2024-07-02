import "./GroupCard.css";
import Link from "next/link";
import PlayerInfo from "../PlayerInfo/PlayerInfo";

export default function GroupCard({ group }) {
    return (
        <div className="card group-card">
            <div className="card-header">
                <div className="card-header-info">
                    <Link href={`/tournament/${group.tournamentId}/event/${group.eventId}/group/${group.groupId}`} className="icon-button">
                        <i className="fa-regular fa-eye" />
                    </Link>
                    <p>Group {group.groupNumber}</p>
                </div>
                <div className="card-header-tables">
                    <p>TBD</p>
                </div>
            </div>
            <div className="group-card-body">
                {
                    group.groupPlayers.map(groupPlayer => (
                        <div className="group-card-player" key={groupPlayer.playerId}>
                            <PlayerInfo player={groupPlayer} />
                            <div className="group-card-player-stats">
                                <p>{groupPlayer.groupPosition}</p>
                                <p>{groupPlayer.groupWins} - {groupPlayer.groupLosses}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};