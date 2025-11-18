package main

import (
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/sportsradar/db"
	"github.com/sportsradar/handlers"
)

func main() {
	database := db.ConnectDB()
	db.InitSchema(database)

	r := gin.Default()

	// CORS middleware configuration
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173", "http://127.0.0.1:5173"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization", "X-Requested-With"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	h := handlers.NewHandler(database)

	r.GET("/events", h.GetEvents)
	r.GET("/events/:id", h.GetEvent)
	r.POST("/events", h.CreateEvent)

	r.Run(":8080")
}
