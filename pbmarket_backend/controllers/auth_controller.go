package controllers

import (
	"github.com/Henrique-M-Serafin/pbmarket_backend/database"
	"github.com/Henrique-M-Serafin/pbmarket_backend/models"
	"github.com/Henrique-M-Serafin/pbmarket_backend/utils"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

// POST /register
func Register(c *gin.Context) {
	var input models.RegisterInput

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(400, gin.H{"error": "Dados inválidos"})
		return
	}

	hash, err := bcrypt.GenerateFromPassword([]byte(input.Password), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(500, gin.H{"error": "Erro ao criptografar senha"})
		return
	}

	user := models.User{
		Name:     input.Name,
		Email:    input.Email,
		Password: string(hash),
	}

	if err := database.DB.Create(&user).Error; err != nil {
		c.JSON(400, gin.H{"error": "Email já cadastrado"})
		return
	}

	c.JSON(201, gin.H{"message": "Usuário criado com sucesso"})
}

// POST /login
func Login(c *gin.Context) {
	var input models.LoginInput
	var user models.User

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(400, gin.H{"error": "Dados inválidos"})
		return
	}

	// Busca usuário por email
	if err := database.DB.Where("email = ?", input.Email).First(&user).Error; err != nil {
		c.JSON(401, gin.H{"error": "E-mail não encontrado!"})
		return
	}

	// Compara senha
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(input.Password)); err != nil {
		c.JSON(401, gin.H{"error": "Credenciais inválidas"})
		return
	}

	// Gera token
	token, err := utils.GenerateToken(user.ID)
	if err != nil {
		c.JSON(500, gin.H{"error": "Erro ao gerar token"})
		return
	}

	c.JSON(200, gin.H{
		"token": token,
		"user": gin.H{
			"id":    user.ID,
			"name":  user.Name,
			"email": user.Email,
		},
	})
}
