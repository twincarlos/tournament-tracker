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
    if (lengthOfPlayers === 5) {
        return [
            [1,4],
            [3,5],
            [1,3],
            [2,4],
            [2,5],
            [3,4],
            [4,5],
            [1,2],
            [1,5],
            [2,3],
        ]
    };
    if (lengthOfPlayers === 10) {
        return [
            [1,6],
            [5,7],
            [4,8],
            [3,9],
            [2,10],
            [1,5],
            [4,6],
            [3,7],
            [2,8],
            [9,10],
            [1,4],
            [3,5],
            [2,6],
            [7,10],
            [8,9],
            [1,3],
            [2,4],
            [5,10],
            [6,9],
            [7,8],
            [1,10],
            [2,9],
            [3,8],
            [4,7],
            [5,6],
            [1,9],
            [8,10],
            [2,7],
            [3,6],
            [4,5],
            [1,8],
            [7,9],
            [6,10],
            [2,5],
            [3,4],
            [1,7],
            [6,8],
            [5,9],
            [4,10],
            [2,3],
            [3,10],
            [4,9],
            [5,8],
            [6,7],
            [1,2]
        ];
    };
};