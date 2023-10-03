package services

import (
	"dashboard/internal/models"
	"encoding/json"
	"fmt"
	"github.com/go-resty/resty/v2"
	"io/ioutil"
)

func GetIssues(apiKey string) RedmineResponse {
	client := resty.New()
	redmineURL := "http://localhost"
	apiURL := fmt.Sprintf("%s/issues.json", redmineURL)
	var response RedmineResponse

	resp, err := client.R().
		SetHeader("Content-Type", "application/json").
		SetHeader("X-Redmine-API-Key", apiKey).
		Get(apiURL)

	if err != nil {
		fmt.Printf("Ошибка при выполнении запроса: %v\n", err)
		return response
	}
	if resp.StatusCode() != 200 {
		fmt.Printf("Ошибка при получении данных: Код состояния %d\n",
			resp.StatusCode())
		return response
	}

	if err := json.Unmarshal(resp.Body(), &response); err != nil {
		fmt.Println("Ошибка при разборе JSON:", err)
		return response
	}

	return response
}

func GetUser(apiKey string) models.User {
	client := resty.New()
	redmineURL := "http://localhost"
	apiURL := fmt.Sprintf("%s/my/account.json", redmineURL)
	var user models.User

	resp, err := client.R().
		SetHeader("Content-Type", "application/json").
		SetHeader("X-Redmine-API-Key", apiKey).
		Get(apiURL)

	if err != nil {
		fmt.Printf("Ошибка выполнения GET-запроса: %v\n", err)
		return user
	}

	if resp.StatusCode() != 200 {
		fmt.Printf("Ошибка при получении данных. Код статуса: %d\n", resp.StatusCode())
		return user
	}

	if err := json.Unmarshal(resp.Body(), &user); err != nil {
		fmt.Println("Ошибка при разборе JSON:", err)
		return user
	}

	return user
}

func saveJSONToFile(data []byte, filename string) error {
	err := ioutil.WriteFile(filename, data, 0644)
	if err != nil {
		return err
	}
	fmt.Println("JSON data saved to", filename)
	return nil
}
