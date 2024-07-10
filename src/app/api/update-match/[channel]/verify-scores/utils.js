function filterArrays(players, matches) {
    const playersSet = new Set(players.map(player => player.eventPlayerId));
    return matches.filter(match => playersSet.has(match.eventPlayer1Id) && playersSet.has(match.eventPlayer2Id));
};

export function determineGroupPositions(players, matches) {
    const positions1 = [];
    players.sort((a, b) => ((b.groupWins * 2) + (b.groupLosses + 1)) - ((a.groupWins * 2) + (a.groupLosses + 1)));

    for (const player of players) {
        if (positions1.length === 0) positions1.push([player]);
        else if (positions1[positions1.length - 1][0].groupWins === player.groupWins) positions1[positions1.length - 1].push(player);
        else positions1.push([player]);
    };

    const positions2 = [];
    for (const position of positions1) {
        const eligibleMatches = filterArrays(position, matches);
        const innerGroup = [];
        for (const player of position) {
            let playerPoints = 0;
            for (const match of eligibleMatches) {
                if (match.winnerId === player.eventPlayerId) playerPoints = playerPoints + 2;
                else if (match.loserId === player.eventPlayerId) playerPoints = playerPoints + 1;
            };
            innerGroup.push({ ...player, matchPoints: playerPoints });
        };
        innerGroup.sort((a, b) => b.matchPoints - a.matchPoints);
        for (const player of innerGroup) {
            if (positions2.length === 0) positions2.push([player]);
            else if (positions2[positions2.length - 1][0].matchPoints === player.matchPoints) positions2[positions2.length - 1].push(player);
            else positions2.push([player]);
        };
    };

    const positions3 = [];
    for (const position of positions2) {
        const eligibleMatches = filterArrays(position, matches);
        const innerGroup = [];
        for (const player of position) {
            let gamesWon = 0;
            let gamesLost = 0;
            for (const match of eligibleMatches) {
                if (match.eventPlayer1Id === player.eventPlayerId) {
                    if (match.winnerId === player.eventPlayerId) gamesWon = gamesWon + match.player1GamesWon;
                    else if (match.loserId === player.eventPlayerId) gamesLost = gamesLost + match.player2GamesWon;
                }
                else if (match.eventPlayer2Id === player.eventPlayerId) {
                    if (match.winnerId === player.eventPlayerId) gamesWon = gamesWon + match.player2GamesWon;
                    else if (match.loserId === player.eventPlayerId) gamesLost = gamesLost + match.player1GamesWon;
                };
            };
            innerGroup.push({ ...player, gamesWinLossRatio: Number((gamesWon / gamesLost).toFixed(2)) });
        };
        innerGroup.sort((a, b) => b.gamesWinLossRatio - a.gamesWinLossRatio);
        for (const player of innerGroup) {
            if (positions3.length === 0) positions3.push([player]);
            else if (positions3[positions3.length - 1][0].gamesWinLossRatio === player.gamesWinLossRatio) positions3[positions3.length - 1].push(player);
            else positions3.push([player]);
        };
    };

    const positions4 = [];
    for (const position of positions3) {
        const eligibleMatches = filterArrays(position, matches);
        const innerGroup = [];
        for (const player of position) {
            let pointsWon = 0;
            let pointsLost = 0;
            for (const match of eligibleMatches) {
                if (match.eventPlayer1Id === player.eventPlayerId || match.eventPlayer2Id === player.eventPlayerId) {
                    if (match.eventPlayer1Id === player.eventPlayerId) {
                        pointsWon = pointsWon + match.g1p1 + match.g2p1 + match.g3p1 + (match.g4p1 ? match.g4p1 : 0) + (match.g5p1 ? match.g5p1 : 0) + (match.g6p1 ? match.g6p1 : 0) + (match.g7p1 ? match.g7p1 : 0);
                        pointsLost = pointsLost + match.g1p2 + match.g2p2 + match.g3p2 + (match.g4p2 ? match.g4p2 : 0) + (match.g5p2 ? match.g5p2 : 0) + (match.g6p2 ? match.g6p2 : 0) + (match.g7p2 ? match.g7p2 : 0);
                    } else {
                        pointsLost = pointsLost + match.g1p1 + match.g2p1 + match.g3p1 + (match.g4p1 ? match.g4p1 : 0) + (match.g5p1 ? match.g5p1 : 0) + (match.g6p1 ? match.g6p1 : 0) + (match.g7p1 ? match.g7p1 : 0);
                        pointsWon = pointsWon + match.g1p2 + match.g2p2 + match.g3p2 + (match.g4p2 ? match.g4p2 : 0) + (match.g5p2 ? match.g5p2 : 0) + (match.g6p2 ? match.g6p2 : 0) + (match.g7p2 ? match.g7p2 : 0);
                    };
                };
            };
            innerGroup.push({ ...player, pointsWinLossRatio: Number((pointsWon / pointsLost).toFixed(2)) });
        };
        innerGroup.sort((a, b) => b.pointsWinLossRatio - a.pointsWinLossRatio);
        for (const player of innerGroup) {
            if (positions4.length === 0) positions4.push([player]);
            else if (positions4[positions4.length - 1][0].pointsWinLossRatio === player.pointsWinLossRatio) positions4[positions4.length - 1].push(player);
            else positions4.push([player]);
        };
    };

    return positions4;
};