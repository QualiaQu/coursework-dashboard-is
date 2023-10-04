package rest

import (
	"dashboard/internal/services"
	"github.com/gin-gonic/gin"
	"net/http"
)

func StartServer() {
	r := gin.Default()
	//r.Use(cors.Default())

	r.GET("/get_redmine_versions", func(c *gin.Context) {
		token := c.DefaultQuery("token", "")
		if token == "" {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "Параметр 'token' не указан.",
			})
			return
		}
		issues, status := services.GetIssues(token)
		versions := issues.GetVersions()

		c.JSON(status, versions)
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
		issues, status := services.GetIssues(token)
		targetIssues := issues.GetTargetIssues(version)

		c.JSON(status, targetIssues)
	})

	r.GET("/get_user", func(c *gin.Context) {
		token := c.DefaultQuery("token", "")

		if token == "" {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "Параметр 'token' не указан.",
			})
			return
		}
		user, status := services.GetUser(token)

		c.JSON(status, user)
	})

	err := r.Run(":8080")
	if err != nil {
		return
	}
}
