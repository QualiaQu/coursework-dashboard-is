package rest

import (
	"dashboard/internal/services"
	"github.com/gin-gonic/gin"
	"net/http"
)

func StartServer() {
	r := gin.Default()
	r.GET("/endpoint", func(c *gin.Context) {
		token := c.DefaultQuery("token", "")
		if token == "" {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "Параметр 'token' не указан.",
			})
			return
		}

		services.GetResponse(token)

		c.JSON(http.StatusOK, gin.H{
			"message": "Запрос обработан успешно.",
			"token":   token,
		})
	})

	err := r.Run(":8080")
	if err != nil {
		return
	}

}
