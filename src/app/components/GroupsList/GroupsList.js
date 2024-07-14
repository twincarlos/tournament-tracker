import "./GroupsList.css";
import GroupCard from "../GroupCard/GroupCard";

export default function GroupsList({ event }) {
    return (
        <section className="gallery groups-list">
            {
                event.groups.map(group =>  <GroupCard key={group.groupId} tournamentId={event.tournamentId} eventType={event.eventType} group={group} />)
            }
        </section>
    );
};