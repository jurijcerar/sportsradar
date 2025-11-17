CREATE TABLE sports (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
);

CREATE TABLE venues (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    location TEXT
);

CREATE TABLE teams (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    _sport_id INTEGER,
    FOREIGN KEY(_sport_id) REFERENCES sports(id)
);

CREATE TABLE events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,        
    time TEXT NOT NULL,           
    _sport_id INTEGER,
    _venue_id INTEGER,
    _team1_id INTEGER,
    _team2_id INTEGER,
    description TEXT,
    FOREIGN KEY(_sport_id) REFERENCES sports(id),
    FOREIGN KEY(_venue_id) REFERENCES venues(id),
    FOREIGN KEY(_team1_id) REFERENCES teams(id),
    FOREIGN KEY(_team2_id) REFERENCES teams(id)
);
