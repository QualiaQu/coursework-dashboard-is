package services

import (
	"dashboard/server/internal/models"
	"encoding/json"
	"fmt"
	"github.com/go-resty/resty/v2"
	"io/ioutil"
)

func GetIssues(apiKey string) (models.IssuesResponse, int) {
	client := resty.New()
	redmineURL := "http://localhost"
	apiURL := fmt.Sprintf("%s/issues.json", redmineURL)
	var response models.IssuesResponse

	queryParams := map[string]string{
		"status_id": "*",
	}

	resp, err := client.R().
		SetHeader("Content-Type", "application/json").
		SetHeader("X-Redmine-API-Key", apiKey).
		SetQueryParams(queryParams).
		Get(apiURL)

	if err != nil {
		fmt.Printf("Ошибка при выполнении запроса: %v\n", err)
		return response, 0
	}

	if resp.StatusCode() != 200 {
		fmt.Printf("Ошибка при получении данных: Код состояния %d\n",
			resp.StatusCode())
		return response, 0
	}

	if err := json.Unmarshal(resp.Body(), &response); err != nil {
		fmt.Println("Ошибка при разборе JSON:", err)
		return response, 0
	}

	return response, resp.StatusCode()
}

func GetUser(apiKey string) (models.UserResponse, int) {
	client := resty.New()
	redmineURL := "http://localhost"
	apiURL := fmt.Sprintf("%s/my/account.json", redmineURL)
	var user models.UserResponse

	resp, err := client.R().
		SetHeader("Content-Type", "application/json").
		SetHeader("X-Redmine-API-Key", apiKey).
		Get(apiURL)

	if err != nil {
		fmt.Printf("Ошибка выполнения GET-запроса: %v\n", err)
		return user, resp.StatusCode()
	}

	if resp.StatusCode() != 200 {
		fmt.Printf("Ошибка при получении данных. Код статуса: %d\n", resp.StatusCode())
		return user, resp.StatusCode()
	}

	if err := json.Unmarshal(resp.Body(), &user); err != nil {
		fmt.Println("Ошибка при разборе JSON:", err)
		return user, resp.StatusCode()
	}

	return user, resp.StatusCode()
}

func saveJSONToFile(data []byte, filename string) error {
	err := ioutil.WriteFile(filename, data, 0644)
	if err != nil {
		return err
	}
	fmt.Println("JSON data saved to", filename)
	return nil
}
