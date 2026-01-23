package database

import (
	"github.com/Henrique-M-Serafin/pbmarket_backend/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var (
	DB  *gorm.DB
	err error
)

func DatabaseConnection() {
	connectionString := "host=localhost user=admin password=admin123 dbname=pb_market_db port=5433 sslmode=disable"
	DB, err = gorm.Open(postgres.Open(connectionString), &gorm.Config{})
	if err != nil {
		panic("Failed to connect to database!")
	}
	DB.AutoMigrate(&models.Product{})
}
