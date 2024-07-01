export const fetchCache = 'force-no-store';
import { sql } from "@vercel/postgres";

export async function GET(req, { params }) {
    const { rows } = await sql`
    SELECT 
    g.*,
    p.*,
    ep.*
    FROM Groups g
    JOIN EventPlayers ep ON g.groupid = ep.groupid
    JOIN Players p ON ep.playerid = p.playerid
    WHERE g.eventid = ${params.EventId}
    ORDER BY g.groupnumber, p.playerrating;`;

    const groups = [];
    let currentGroupNumber;

    for (const group of rows) {
        if (currentGroupNumber === group.groupnumber) {
            groups[groups.length - 1].GroupPlayers.push(
                {
                    playerid: group.playerid,
                    eventplayerid: group.eventplayerid,
                    groupid: group.groupid,
                    groupwins: group.groupwins,
                    grouplosses: group.grouplosses,
                    groupposition: group.groupposition,
                    playername: group.playername,
                    playerrating: group.playerrating,
                    playerisestimated: group.playerisestimated
                }
            );
        } else {
            groups.push({
                groupid: group.groupid,
                groupnumber: group.groupnumber,
                grouptables: group.grouptables,
                groupstatus: group.groupstatus,
                GroupPlayers: [{
                    playerid: group.playerid,
                    eventplayerid: group.eventplayerid,
                    groupid: group.groupid,
                    groupwins: group.groupwins,
                    grouplosses: group.grouplosses,
                    groupposition: group.groupposition,
                    playername: group.playername,
                    playerrating: group.playerrating,
                    playerisestimated: group.playerisestimated
                }]
            });
            currentGroupNumber = group.groupnumber;
        };
    };
    return new Response(JSON.stringify(groups));
};