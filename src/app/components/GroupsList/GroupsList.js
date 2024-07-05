import "./GroupsList.css";
import GroupCard from "../GroupCard/GroupCard";

export default function GroupsList({ groups }) {
    return (
        <section className="gallery groups-list">
            {
                groups.map(group =>  <GroupCard key={group.groupId} group={group} />)
            }
        </section>
    );
};