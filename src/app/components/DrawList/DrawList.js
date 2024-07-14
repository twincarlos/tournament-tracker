import "./DrawList.css";
import DrawMatchCard from "../DrawMatchCard/DrawMatchCard";
import Modal from "../Modal/Modal";
import { useMatch } from "@/app/context/MatchContext";
import EditableMatch from "../EditableMatch/EditableMatch";
import MatchCard from "../MatchCard/MatchCard";

export default function DrawList({ event }) {
    const { match } = useMatch();

    if (!event.draw.length) return null;
    
    return (
        <>
            <Modal>
                {
                    match?.matchStatus === "Finished" ? <MatchCard match={match} inModal={true} /> : <EditableMatch match={match} />
                }
            </Modal>
            <section className={`draw-list draw-of-${event.draw[0][0].matchRound}`}>
                {
                    event.draw.map((drawRound, index) => (
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
        </>
    );
};