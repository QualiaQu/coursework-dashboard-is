package rest

import (
	"dashboard/server/internal/database"
	"dashboard/server/internal/services"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
)

func StartServer() {
	r := gin.Default()
	r.Use(cors.Default())

	db := database.Start()

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

	r.POST("/set_version_info", func(c *gin.Context) {
		version := c.DefaultQuery("version", "")
		store := c.DefaultQuery("store", "")
		deployDate := c.DefaultQuery("deployDate", "")
		approvalDate := c.DefaultQuery("approvalDate", "")
		installPercentageStr := c.DefaultQuery("installPercentage", "")
		installPercentage, err := strconv.ParseFloat(installPercentageStr, 64)

		if version == "" || store == "" {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "Параметры 'version' и 'store' должны быть указаны.",
			})
			return
		}

		err = database.SetVersionInfo(db, version, store, deployDate, approvalDate, installPercentage)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "О нет! Ошибочка при добавлении данных в бд",
			})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"message": "Информация о версии успешно добавлена.",
		})
	})

	r.GET("/get_version_info", func(c *gin.Context) {
		version := c.DefaultQuery("version", "")

		if version == "" {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "Параметр 'version' не указан.",
			})
			return
		}
		versions, err := database.GetVersionInfo(db, version)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "О нет! Ошибочка при добавлении данных в бд",
			})
			return
		}

		c.JSON(http.StatusOK, versions)
	})

	err := r.Run(":8080")
	if err != nil {
		return
	}
}
