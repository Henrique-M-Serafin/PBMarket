package main

import (
	"github.com/Henrique-M-Serafin/pbmarket_backend/database"
	"github.com/Henrique-M-Serafin/pbmarket_backend/routes"
)

func main() {
	database.DatabaseConnection()
	routes.HandleRoutes()
}
