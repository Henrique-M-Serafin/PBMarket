package controllers

import (
	"net/http"

	"github.com/Henrique-M-Serafin/pbmarket_backend/database"
	"github.com/Henrique-M-Serafin/pbmarket_backend/models"
	"github.com/gin-gonic/gin"
)

func ShowProducts(c *gin.Context) {
	var products []models.Product
	database.DB.Find(&products)
	c.JSON(http.StatusOK, products)
}

func GetProductByID(c *gin.Context) {
	id := c.Param("id")
	var product models.Product
	result := database.DB.First(&product, id)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Product not found"})
		return
	}
	c.JSON(http.StatusOK, product)
}

func CreateProduct(c *gin.Context) {
	var input models.CreateProductInput

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	product := models.Product{
		Name:        input.Name,
		Price:       input.Price,
		Quantity:    input.Quantity,
		Description: input.Description,
	}

	database.DB.Create(&product)

	c.JSON(201, product)
}

func DeleteProduct(c *gin.Context) {
	id := c.Param("id")
	var product models.Product
	result := database.DB.Delete(&product, id)
	if result.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Product not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Product deleted successfully"})
}

func UpdateProduct(c *gin.Context) {
	id := c.Param("id")

	// Model real (tabela products)
	var product models.Product

	if err := database.DB.First(&product, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Product not found"})
		return
	}

	var input models.CreateProductInput

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	product.Name = input.Name
	product.Price = input.Price
	product.Quantity = input.Quantity
	product.Description = input.Description

	database.DB.Save(&product)

	c.JSON(http.StatusOK, product)
}

func SearchProducts(c *gin.Context) {
	name := c.Query("name")

	if name == "" {
		c.JSON(400, gin.H{"error": "name is required"})
		return
	}

	var products []models.Product

	result := database.DB.
		Where("unaccent(name) ILIKE unaccent(?)", "%"+name+"%").
		Find(&products)

	if result.Error != nil {
		c.JSON(500, gin.H{"error": result.Error.Error()})
		return
	}

	if len(products) == 0 {
		c.JSON(404, gin.H{"message": "no products found"})
		return
	}

	c.JSON(200, products)
}
