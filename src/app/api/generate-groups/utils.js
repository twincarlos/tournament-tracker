export function generateGroups(players) {
    const groups = [[], []];
    for (let i = 9; i <= players.length; i = i + 4) {
        groups.push([]);
    };

    const counter = {
        number: 0,
        direction: "up",
        hasBegan: false
    };

    for (let i = 0; i < players.length; i++) {
        groups[counter.number].push(players[i]);
        if (counter.hasBegan) {
            if (counter.direction === "up") {
                if (counter.number === groups.length - 1) {
                    counter.direction = "down";
                }
                else {
                    counter.number++;
                };
            } else {
                if (counter.number === 0) {
                    counter.direction = "up";
                } else {
                    counter.number--;
                };
            };
        }
        else {
            counter.number++;
            counter.hasBegan = true;
        };
    };

    return groups;
};

export function orderOfPlay(lengthOfPlayers) {
    if (lengthOfPlayers === 3) return [
        [1,3],
        [1,2],
        [2,3]
    ];
    if (lengthOfPlayers === 4) return [
        [1,3],
        [2,4],
        [3,4],
        [1,2],
        [1,4],
        [2,3]
    ];
};