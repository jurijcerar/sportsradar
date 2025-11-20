package models

type Event struct {
	ID   int    `json:"id"`
	Date string `json:"date"`
	Time string `json:"time"`

	Sport string `json:"sport"`
	Venue string `json:"venue"`
	Team1 string `json:"team1"`
	Team2 string `json:"team2"`

	SportID int `json:"sport_id,omitempty"`
	VenueID int `json:"venue_id,omitempty"`
	Team1ID int `json:"team1_id,omitempty"`
	Team2ID int `json:"team2_id,omitempty"`

	Description string `json:"description"`
}
