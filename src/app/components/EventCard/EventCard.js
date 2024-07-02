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