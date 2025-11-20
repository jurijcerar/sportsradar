package db

import (
	"database/sql"
	"log"
	"os"

	_ "github.com/mattn/go-sqlite3"
)

func ConnectDB() *sql.DB { // connect to SQLite and return the database connection
	db, err := sql.Open("sqlite3", "./db/database.db")
	if err != nil {
		log.Fatal("Failed to open database:", err)
	}

	if err := db.Ping(); err != nil {
		log.Fatal("Failed to connect database:", err)
	}

	return db
}

func InitSchema(db *sql.DB) { // initialize the database schema
	schema, err := os.ReadFile("./db/schema.sql")
	if err != nil {
		log.Fatal("Failed to read schema.sql:", err)
	}

	_, err = db.Exec(string(schema))
	if err != nil {
		log.Fatal("Failed to execute schema:", err)
	}
}

func InitializeSeedData(db *sql.DB) { // seed initial data into the database
	seedSQL := `
	CREATE UNIQUE INDEX IF NOT EXISTS idx_sports_name ON sports(name);
    CREATE UNIQUE INDEX IF NOT EXISTS idx_venues_name_location ON venues(name, location);
    CREATE UNIQUE INDEX IF NOT EXISTS idx_teams_name_sport ON teams(name, _sport_id);

    INSERT OR IGNORE INTO sports (name) VALUES 
        ('Football'),
        ('Basketball');

    INSERT OR IGNORE INTO teams (name, _sport_id) VALUES
        ('Chelsea',     (SELECT id FROM sports WHERE name='Football')),
        ('Arsenal',     (SELECT id FROM sports WHERE name='Football')),
        ('Lakers',      (SELECT id FROM sports WHERE name='Basketball')),
        ('SuperSonics', (SELECT id FROM sports WHERE name='Basketball'));

    INSERT OR IGNORE INTO venues (name, location) VALUES 
        ('Stamford Bridge', 'London'),
        ('Emirates Stadium', 'London'),
        ('Crypto.com Arena', 'Los Angeles'),
        ('KeyArena', 'Seattle');
    `

	_, err := db.Exec(seedSQL)
	if err != nil {
		log.Fatalf("Failed to seed initial data: %v", err)
	}
}
