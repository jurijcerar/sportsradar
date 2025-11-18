package models

type Event struct {
	ID          int    `json:"id"`
	Date        string `json:"date"`
	Time        string `json:"time"`
	Sport       string `json:"sport"`
	Venue       string `json:"venue"`
	Team1       string `json:"team1"`
	Team2       string `json:"team2"`
	Description string `json:"description"`
}
