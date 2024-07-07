import "./DrawList.css";
import DrawMatchCard from "../DrawMatchCard/DrawMatchCard";

export default function DrawList({ draw }) {
    return (
        <section className="draw-list">
            {
                draw.map(drawRound => (
                    <div className={`draw-round round-of-${drawRound[0].matchRound}`}>
                        {
                            drawRound.map(drawMatch => (
                                <DrawMatchCard key={drawMatch.matchId} match={drawMatch} />
                            ))
                        }
                    </div>
                ))
            }
        </section>
    );
};