import "./GroupCard.css";
import Link from "next/link";

export default function GroupCard({ TournamentId, EventId, group }) {
    return (
        <div className="card group-card">
            <div className="card-header">
                <div className="card-header-info">
                    <Link href={`/tournament/${TournamentId}/event/${EventId}/group/${group.groupid}`} className="icon-button">
                        <i className="fa-regular fa-eye" />
                    </Link>
                    <p>Group {group.groupnumber}</p>
                </div>
                <div className="card-header-tables">
                    <p>Tables {group.grouptables || "TBD"}</p>
                </div>
            </div>
            <div className="group-card-body">
                {
                    group.GroupPlayers.map(groupPlayer => (
                        <div className="group-card-player" key={groupPlayer.playerid}>
                            <div className="group-card-player-name">
                                <p>{groupPlayer.playerrating} • {groupPlayer.playername}</p>
                            </div>
                            <div className="group-card-player-stats">
                                <p>{groupPlayer.playerposition}</p>
                                <p>{groupPlayer.groupwins} - {groupPlayer.grouplosses}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};