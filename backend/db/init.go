package db

import (
	"database/sql"
	"log"
	"os"
)

func InitSchema(db *sql.DB) {
	schema, err := os.ReadFile("./db/schema.sql")
	if err != nil {
		log.Fatal("Failed to read schema.sql:", err)
	}

	_, err = db.Exec(string(schema))
	if err != nil {
		log.Fatal("Failed to execute schema:", err)
	}
}
