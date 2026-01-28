package routes

import (
	"github.com/Henrique-M-Serafin/pbmarket_backend/controllers"
	"github.com/Henrique-M-Serafin/pbmarket_backend/middleware"
	"github.com/gin-gonic/gin"
)

func HandleRoutes() {
	r := gin.Default()
	r.Use(middleware.CORSMiddleware())

	// Rotas públicas
	r.POST("/register", controllers.Register)
	r.POST("/login", controllers.Login)

	r.GET("/products", controllers.ShowProducts)
	r.GET("/products/:id", controllers.GetProductByID)
	r.GET("/products/search", controllers.SearchProducts)

	// Rotas protegidas
	protected := r.Group("/")
	protected.Use(middleware.AuthMiddleware())

	protected.POST("/products", controllers.CreateProduct)
	protected.DELETE("/products/:id", controllers.DeleteProduct)
	protected.PATCH("/products/:id", controllers.UpdateProduct)

	r.Run()
}
