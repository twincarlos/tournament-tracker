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