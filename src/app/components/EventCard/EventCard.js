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
                            day: 'numeric',
                            timeZone: 'America/New_York'
                        })
                    }
                </p>
            </div>
            <div className="card-details">
                <span className="card-bubble">{event.eventType}</span>
                <span className={`card-bubble ${event.eventStatus}`}>{event.eventStatus}</span>
                <span className="card-bubble">{event.eventStage}</span>
            </div>
        </div>
    );
};