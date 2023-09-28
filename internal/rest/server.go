package rest

import (
	"dashboard/internal/services"
	"github.com/gin-gonic/gin"
	"net/http"
)

func StartServer() {
	r := gin.Default()

	r.GET("/get_redmine_versions", func(c *gin.Context) {
		token := c.DefaultQuery("token", "")
		if token == "" {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "Параметр 'token' не указан.",
			})
			return
		}
		c.JSON(http.StatusOK, services.GetResponse(token).GetVersions())
	})

	r.GET("/get_redmine_issues", func(c *gin.Context) {
		token := c.DefaultQuery("token", "")
		version := c.DefaultQuery("version", "")

		if token == "" || version == "" {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "Параметры 'token' и 'version' должны быть указаны.",
			})
			return
		}
		targetIssues := services.GetResponse(token).GetTargetIssues(version)

		c.JSON(http.StatusOK, targetIssues)
	})

	err := r.Run(":8080")
	if err != nil {
		return
	}
}
