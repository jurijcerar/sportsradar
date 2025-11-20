package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sportsradar/models"
)

func (h *Controller) GetSports(c *gin.Context) {

	query := `
        SELECT s.id, s.name
        FROM events s
		ORDER BY s.name;
    `

	rows, err := h.DB.Query(query)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer rows.Close()

	var sports []models.Sport

	for rows.Next() {
		var s models.Sport
		rows.Scan(&s.ID, &s.Name)

		sports = append(sports, s)
	}

	c.JSON(http.StatusOK, sports)
}
