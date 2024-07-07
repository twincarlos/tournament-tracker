import "./DrawList.css";
import DrawMatchCard from "../DrawMatchCard/DrawMatchCard";

export default function DrawList({ draw }) {
    return (
        <section className={`draw-list draw-of-${draw[0][0].matchRound}`}>
            {
                draw.map((drawRound, index) => (
                    <div key={drawRound[0].matchId} className={`draw-round round-of-${drawRound[0].matchRound} column-${index + 1}`}>
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