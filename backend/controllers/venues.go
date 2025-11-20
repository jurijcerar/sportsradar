package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sportsradar/models"
)

func (h *Controller) GetVenues(c *gin.Context) {

	query := `
        SELECT v.id, v.name, v.location
        FROM venues v
		ORDER BY v.name;
    `

	rows, err := h.DB.Query(query)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer rows.Close()

	var events []models.Venue

	for rows.Next() {
		var e models.Venue
		rows.Scan(&e.ID, &e.Name, &e.Location)

		events = append(events, e)
	}

	c.JSON(http.StatusOK, events)
}
