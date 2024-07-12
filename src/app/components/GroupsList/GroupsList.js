import "./GroupsList.css";
import GroupCard from "../GroupCard/GroupCard";

export default function GroupsList({ groups, tournamentId, eventType }) {
    return (
        <section className="gallery groups-list">
            {
                groups.map(group =>  <GroupCard key={group.groupId} tournamentId={tournamentId} eventType={eventType} group={group} />)
            }
        </section>
    );
};