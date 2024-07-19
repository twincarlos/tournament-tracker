import "./DrawList.css";
import DrawMatchCard from "../DrawMatchCard/DrawMatchCard";
import Modal from "../Modal/Modal";
import { useMatch } from "@/app/context/MatchContext";
import { useModal } from "@/app/context/ModalContext";
import EditableMatch from "../EditableMatch/EditableMatch";
import MatchCard from "../MatchCard/MatchCard";
import TableFinder from "../TableFinder/TableFinder";
import MatchSettings from "../MatchSettings/MatchSettings";

export default function DrawList({ drawPrintRef, event, player }) {
    const { match } = useMatch();
    const {showModal} = useModal();

    if (!event.draw.length) return null;

    return (
        <div ref={drawPrintRef}>
            {showModal === "Draw Match" && <Modal>
                <div className="admin-modal">
                    {
                        match ? ((match.matchStatus === "Finished" || match.matchStatus === "Upcoming") ? <MatchCard match={match} inModal={true} /> : ((player && player.isAdmin) ? <EditableMatch match={match} /> : <MatchCard match={match} inModal={true} />)) : null
                    }
                    {(player && player.isAdmin) && <div className="match-settings">
                        <TableFinder tournamentId={event.tournamentId} matchId={match?.matchId} />
                        <MatchSettings matchId={match?.matchId} />
                    </div>}
                </div>
            </Modal>}
            <div style={{ display: 'none' }} className="print-event-name">
                <h1>{event.eventName}</h1>
                <p>{new Date(event.eventDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'America/New_York' })} • {event.eventTime?.slice(0, 5)}</p>
            </div>
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
        </div>
    );
};