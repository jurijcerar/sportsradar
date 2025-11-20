package controllers

import (
	"database/sql"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sportsradar/models"
)

type Controller struct { //controller struct, could probably be in its own file tbh
	DB *sql.DB
}

func NewController(db *sql.DB) *Controller { //constructor for controller
	return &Controller{DB: db}
}

func (h *Controller) GetEvents(c *gin.Context) { //GET /events handler

	//sql query to get events with related data
	query := ` 
        SELECT e.id, e.date, e.time, 
               s.name, v.name, t1.name, t2.name, 
               e.description
        FROM events e
        JOIN sports s ON e._sport_id = s.id
        JOIN venues v ON e._venue_id = v.id
        JOIN teams t1 ON e._team1_id = t1.id
        JOIN teams t2 ON e._team2_id = t2.id
        ORDER BY e.date, e.time;
    `

	rows, err := h.DB.Query(query)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer rows.Close()

	var events []models.Event

	for rows.Next() {
		var e models.Event
		rows.Scan(&e.ID, &e.Date, &e.Time,
			&e.Sport, &e.Venue, &e.Team1, &e.Team2,
			&e.Description)

		events = append(events, e)
	}

	c.JSON(http.StatusOK, events)
}

func (h *Controller) GetEvent(c *gin.Context) {
	id := c.Param("id")

	query := `
        SELECT e.id, e.date, e.time, 
               s.name, v.name, t1.name, t2.name, 
               e.description
        FROM events e
        JOIN sports s ON e._sport_id = s.id
        JOIN venues v ON e._venue_id = v.id
        JOIN teams t1 ON e._team1_id = t1.id
        JOIN teams t2 ON e._team2_id = t2.id
        WHERE e.id = ?;
    `

	var e models.Event

	err := h.DB.QueryRow(query, id).Scan(
		&e.ID, &e.Date, &e.Time,
		&e.Sport, &e.Venue, &e.Team1, &e.Team2,
		&e.Description,
	)

	if err == sql.ErrNoRows {
		c.JSON(http.StatusNotFound, gin.H{"error": "event not found"})
		return
	}

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, e)
}

func (h *Controller) CreateEvent(c *gin.Context) {

	var req models.Event
	if err := c.BindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid data"})
		return
	}

	query := `
        INSERT INTO events (date, time, _sport_id, _venue_id, _team1_id, _team2_id, description)
        VALUES (?, ?, ?, ?, ?, ?, ?);
    `

	_, err := h.DB.Exec(query,
		req.Date, req.Time,
		req.SportID, req.VenueID,
		req.Team1ID, req.Team2ID,
		req.Description,
	)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "event created"})
}
