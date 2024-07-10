import "./DrawList.css";
import DrawMatchCard from "../DrawMatchCard/DrawMatchCard";
import Modal from "../Modal/Modal";
import { useMatch } from "@/app/context/MatchContext";
import EditableMatch from "../EditableMatch/EditableMatch";

export default function DrawList({ draw }) {
    const { match } = useMatch();

    if (!draw.length) return null;
    return (
        <>
            <Modal>
                {
                    match?.matchStatus === "Finished" ? <MatchCard match={match} inModal={true} /> : <EditableMatch match={match} />
                }
            </Modal>
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
        </>
    );
};