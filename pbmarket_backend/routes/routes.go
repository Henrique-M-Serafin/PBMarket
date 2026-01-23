package routes

import (
	"github.com/Henrique-M-Serafin/pbmarket_backend/controllers"
	"github.com/Henrique-M-Serafin/pbmarket_backend/middleware"
	"github.com/gin-gonic/gin"
)

func HandleRoutes() {
	r := gin.Default()
	r.Use(middleware.CORSMiddleware())
	r.GET("/products", controllers.ShowProducts)
	r.GET("/products/:id", controllers.GetProductByID)
	r.POST("/products", controllers.CreateProduct)
	r.DELETE("/products/:id", controllers.DeleteProduct)
	r.PATCH("/products/:id", controllers.UpdateProduct)
	r.Run()
}
