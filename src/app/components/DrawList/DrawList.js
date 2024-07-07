import "./DrawList.css";
import DrawMatchCard from "../DrawMatchCard/DrawMatchCard";

export default function DrawList({ draw }) {
    return (
        <section className="draw-list">
            {
                draw.map(drawRound => (
                    <div key={drawRound[0].matchId} className={`draw-round round-of-${drawRound[0].matchRound}`}>
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