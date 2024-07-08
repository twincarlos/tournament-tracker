import "./DrawList.css";
import DrawMatchCard from "../DrawMatchCard/DrawMatchCard";

export default function DrawList({ draw }) {
    function translateRound(round) {
        if (round === 8) {
            return "Quarterfinals"
        }
        else if (round === 4) {
            return "Semifinals"
        }
        else if (round === 2) {
            return "Finals"
        }
        else {
            return `Round of ${round}`;
        };
    };
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