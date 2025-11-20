package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sportsradar/models"
)

func (h *Controller) GetTeams(c *gin.Context) {

	query := `
        SELECT t.id, t.name, s.name
		FROM teams t
		JOIN sports s ON t._sport_id = s.id
		ORDER BY t.name;
	`

	rows, err := h.DB.Query(query)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer rows.Close()

	var teams []models.Team

	for rows.Next() {
		var t models.Team
		rows.Scan(&t.ID, &t.Name, &t.Sport)

		teams = append(teams, t)
	}

	c.JSON(http.StatusOK, teams)
}
