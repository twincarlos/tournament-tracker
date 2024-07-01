import "./EventCard.css";

export default function EventCard({ event }) {
    return (
        <div className="card event-card">
            <div className="card-title">
                <p>{event.eventname}</p>
            </div>
            <div>
                <p>
                    {
                        new Date(event.eventdate).toLocaleDateString('en-US', {
                            weekday: 'long',
                            month: 'long',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: true,
                            timeZone: 'UTC'
                        }).split(" at ").join(" • ")
                    }
                </p>
            </div>
        </div>
    );
};