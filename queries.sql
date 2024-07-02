CREATE TABLE Tournaments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    date DATE NOT NULL
);

CREATE TABLE Players (
    id SERIAL PRIMARY KEY,
    tournament_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    rating INT NOT NULL,
    is_estimated BOOLEAN NOT NULL DEFAULT FALSE,
    dob VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    club VARCHAR(255),
    FOREIGN KEY (tournament_id) REFERENCES Tournaments (id)
);

CREATE TABLE Events (
    id SERIAL PRIMARY KEY,
    tournament_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    time TIME,
    type VARCHAR(255) NOT NULL,
    status VARCHAR(255) NOT NULL DEFAULT 'Upcoming',
    stage VARCHAR(255) NOT NULL DEFAULT 'Groups',
    FOREIGN KEY (tournament_id) REFERENCES Tournaments (id)
);

CREATE TABLE Groups (
    id SERIAL PRIMARY KEY,
    event_id INT NOT NULL,
    number VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    time TIME,
    status VARCHAR(255) NOT NULL DEFAULT 'Upcoming',
    FOREIGN KEY (event_id) REFERENCES Events (id)
);

CREATE TABLE EventPlayers (
    id SERIAL PRIMARY KEY,
    player_id INT NOT NULL,
    event_id INT NOT NULL,
    group_id INT NOT NULL,
    group_wins INT NOT NULL DEFAULT 0,
    group_losses INT NOT NULL DEFAULT 0,
    group_position INT,
    FOREIGN KEY (player_id) REFERENCES Players (id),
    FOREIGN KEY (event_id) REFERENCES Events (id),
    FOREIGN KEY (group_id) REFERENCES Groups (id)
);

CREATE TABLE Tables (
    id SERIAL PRIMARY KEY,
    tournament_id INT NOT NULL,
    number INT NOT NULL,
    FOREIGN KEY (tournament_id) REFERENCES Tournaments (id)
);

CREATE TABLE Matches (
    id SERIAL PRIMARY KEY,
    group_id INT,
    event_player1_id INT,
    event_player2_id INT,
    winner_id INT,
    loser_id INT,
    best_of INT NOT NULL DEFAULT 5,
    date DATE NOT NULL,
    time TIME,
    status VARCHAR(255) NOT NULL DEFAULT 'Upcoming',
    stage VARCHAR(255) NOT NULL DEFAULT 'Groups',
    round INT,
    sequence INT NOT NULL,
    g1p1 INT,
    g1p2 INT,
    g2p1 INT,
    g2p2 INT,
    g3p1 INT,
    g3p2 INT,
    g4p1 INT,
    g4p2 INT,
    g5p1 INT,
    g5p2 INT,
    g6p1 INT,
    g6p2 INT,
    g7p1 INT,
    g7p2 INT,
    player1_games_won INT NOT NULL DEFAULT 0,
    player2_games_won INT NOT NULL DEFAULT 0,
    game_defaulted BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (group_id) REFERENCES Groups (id),
    FOREIGN KEY (event_player1_id) REFERENCES EventPlayers (id),
    FOREIGN KEY (event_player2_id) REFERENCES EventPlayers (id),
    FOREIGN KEY (winner_id) REFERENCES EventPlayers (id),
    FOREIGN KEY (loser_id) REFERENCES EventPlayers (id)
);

CREATE TABLE TableMatches (
    id SERIAL PRIMARY KEY,
    table_id INT NOT NULL,
    group_id INT,
    match_id INT,
    busy BOOLEAN NOT NULL DEFAULT True,
    FOREIGN KEY (table_id) REFERENCES Tables (id),
    FOREIGN KEY (group_id) REFERENCES Groups (id),
    FOREIGN KEY (match_id) REFERENCES Matches (id)
);