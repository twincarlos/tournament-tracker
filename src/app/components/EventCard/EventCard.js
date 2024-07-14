import "./EventCard.css";

export default function EventCard({ event }) {
    return (
        <div>
            <div className="card-title">
                <p>{event.eventName}</p>
            </div>
            <div>
                <p>
                    {
                        new Date(event.eventDate).toLocaleDateString('en-US', {
                            weekday: 'long',
                            month: 'long',
                            day: 'numeric'
                        })
                    }
                </p>
            </div>
            <div className="card-details">
                <span className="card-bubble type">{event.eventType}</span>
                <span className="card-bubble type">{event.eventStatus}</span>
                <span className="card-bubble type">{event.eventStage}</span>
            </div>
        </div>
    );
};