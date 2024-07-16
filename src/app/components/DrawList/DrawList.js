import "./DrawList.css";
import DrawMatchCard from "../DrawMatchCard/DrawMatchCard";
import Modal from "../Modal/Modal";
import { useMatch } from "@/app/context/MatchContext";
import { useModal } from "@/app/context/ModalContext";
import EditableMatch from "../EditableMatch/EditableMatch";
import MatchCard from "../MatchCard/MatchCard";
import TableFinder from "../TableFinder/TableFinder";
import MatchSettings from "../MatchSettings/MatchSettings";

export default function DrawList({ event }) {
    const { match } = useMatch();
    const {showModal} = useModal();

    if (!event.draw.length) return null;

    return (
        <>
            {showModal === "Draw Match" && <Modal>
                <div className="admin-modal">
                    {
                        match ? ((match.matchStatus === "Finished" || match.matchStatus === "Upcoming") ? <MatchCard match={match} inModal={true} /> : <EditableMatch match={match} />) : null
                    }
                    <div className="match-settings">
                        <TableFinder tournamentId={event.tournamentId} matchId={match?.matchId} />
                        <MatchSettings matchId={match?.matchId} />
                    </div>
                </div>
            </Modal>}
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