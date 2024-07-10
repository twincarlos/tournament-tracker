function checkIfGameScoreIsValid(score1, score2) {
    if (score1 === null || score2 === null) return false;
    if (score1 === 11 && (score2 >= 0 && score2 <= 9)) return true;
    if (score2 === 11 && (score1 >= 0 && score1 <= 9)) return true;
    if ((score1 > 11 || score2 > 11) && (Math.abs(score1 - score2) === 2)) return true;
    return false;
};

export function updateGameScore(match) {
    let player1GamesWon = 0;
    let player2GamesWon = 0;
    let scoresAreValid = true;

    // GAME 1
    if (checkIfGameScoreIsValid(match.g1p1, match.g1p2)) {
        if (match.g1p1 > match.g1p2) player1GamesWon++;
        if (match.g1p1 < match.g1p2) player2GamesWon++;
    } else {
        scoresAreValid = false;
    };
    // GAME 2
    if (checkIfGameScoreIsValid(match.g2p1, match.g2p2)) {
        if (match.g2p1 > match.g2p2) player1GamesWon++;
        if (match.g2p1 < match.g2p2) player2GamesWon++;
    } else {
        scoresAreValid = false;
    };
    // GAME 3
    if (checkIfGameScoreIsValid(match.g3p1, match.g3p2)) {
        if (match.g3p1 > match.g3p2) player1GamesWon++;
        if (match.g3p1 < match.g3p2) player2GamesWon++;
    } else {
        scoresAreValid = false;
    };
    // GAME 4
    if (checkIfGameScoreIsValid(match.g4p1, match.g4p2)) {
        if ((match.matchBestOf === 5) && (player1GamesWon === 3 || player2GamesWon === 3)) scoresAreValid = false;
        if (match.g4p1 > match.g4p2) player1GamesWon++;
        if (match.g4p1 < match.g4p2) player2GamesWon++;
    } else if (match.g4p1 === null && match.g4p2 === null) {
        if ((match.matchBestOf === 5) && (player1GamesWon === 2 || player2GamesWon === 2)) scoresAreValid = false;
    } else {
        scoresAreValid = false;
    };
    // GAME 5
    if (checkIfGameScoreIsValid(match.g5p1, match.g5p2)) {
        if ((match.matchBestOf === 5) && (player1GamesWon === 3 || player2GamesWon === 3)) scoresAreValid = false;
        if ((match.matchBestOf === 7) && (player1GamesWon === 4 || player2GamesWon === 4)) scoresAreValid = false;
        if (match.g5p1 > match.g5p2) player1GamesWon++;
        if (match.g5p1 < match.g5p2) player2GamesWon++;
    } else if (match.g5p1 === null && match.g5p2 === null) {
        if ((match.matchBestOf === 5) && (player1GamesWon === 2 || player2GamesWon === 2)) scoresAreValid = false;
        if ((match.matchBestOf === 7) && (player1GamesWon > 0 && player1GamesWon > 0)) scoresAreValid = false;
    } else {
        scoresAreValid = false;
    };
    // GAME 6
    if (checkIfGameScoreIsValid(match.g6p1, match.g6p2)) {
        if (match.matchBestOf === 5) return false;
        if ((match.matchBestOf === 7) && (player1GamesWon === 1 || player2GamesWon === 1)) scoresAreValid = false;
        if (match.g6p1 > match.g6p2) player1GamesWon++;
        if (match.g6p1 < match.g6p2) player2GamesWon++;
    } else if (match.g6p1 === null && match.g6p2 === null) {
        if ((match.matchBestOf === 7) && (player1GamesWon === 2 || player2GamesWon === 2)) scoresAreValid = false;
    } else {
        scoresAreValid = false;
    };
    // GAME 7
    if (checkIfGameScoreIsValid(match.g7p1, match.g7p2)) {
        if (match.matchBestOf === 5) return false;
        if ((match.matchBestOf === 7) && (player1GamesWon === 2 || player2GamesWon === 2)) scoresAreValid = false;
        if (match.g7p1 > match.g7p2) player1GamesWon++;
        if (match.g7p1 < match.g7p2) player2GamesWon++;
    } else if (match.g7p1 === null && match.g7p2 === null) {
        if ((match.matchBestOf === 7) && (player1GamesWon === 3 || player2GamesWon === 3)) scoresAreValid = false;
    } else {
        scoresAreValid = false;
    };
    return {
        ...match,
        player1GamesWon,
        player2GamesWon,
        matchStatus: scoresAreValid ? "Pending" : "In Progress",
        winnerId: scoresAreValid ? (player1GamesWon === ((match.matchBestOf === 5) ? 3 : 4) ? match.eventPlayer1Id : match.eventPlayer2Id) : null,
        loserId: scoresAreValid ? (player1GamesWon === ((match.matchBestOf === 5) ? 3 : 4) ? match.eventPlayer2Id : match.eventPlayer1Id) : null
    };
};