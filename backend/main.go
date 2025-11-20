package main

import (
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/sportsradar/controllers"
	"github.com/sportsradar/db"
)

func main() {
	database := db.ConnectDB()
	db.InitSchema(database)
	db.InitializeSeedData(database)

	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173", "http://127.0.0.1:5173"}, //need to use both localhost and 127.. otherwise some browsers block requests
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization", "X-Requested-With"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	h := controllers.NewController(database)

	r.GET("/events", h.GetEvents)
	r.GET("/events/:id", h.GetEvent)
	r.POST("/events", h.CreateEvent)
	r.GET("/teams", h.GetTeams)
	r.GET("/sports", h.GetSports)
	r.GET("/venues", h.GetVenues)

	r.Run(":8080")
}
