package app

import (
	"dashboard/models"
	"encoding/json"
	"fmt"
	"github.com/go-resty/resty/v2"
	"io/ioutil"
)

func Run() {
	client := resty.New()
	redmineURL := "http://localhost"
	apiKey := "832e536c999df555352439b7c72927f9731651d0"
	apiURL := fmt.Sprintf("%s/issues.json", redmineURL)
	resp, err := client.R().
		SetHeader("Content-Type", "application/json").
		SetHeader("X-Redmine-API-Key", apiKey).
		Get(apiURL)

	println(apiURL)

	var response models.Response
	if err := json.Unmarshal(resp.Body(), &response); err != nil {
		fmt.Println("Ошибка при разборе JSON:", err)
		return
	}
	fmt.Printf("Количество задач: %d\n", len(response.Issues))

	targetVersions := response.GetAllFixedVersions()
	fmt.Println("Список всех версий FixedVersion:")
	for _, version := range targetVersions {
		fmt.Printf("ID: %d, Название: %s\n", version.ID, version.Name)
	}

	if err != nil {
		fmt.Printf("Ошибка при выполнении запроса: %v\n", err)
		return
	}

	// Проверьте статус ответа
	if resp.StatusCode() != 200 {
		fmt.Printf("Ошибка при получении данных: Код состояния %d\n",
			resp.StatusCode())
		return
	}

	err = saveJSONToFile(resp.Body(), "redmine.json")
	if err != nil {
		fmt.Println("Error:", err)
		return
	}
}

func saveJSONToFile(data []byte, filename string) error {
	err := ioutil.WriteFile(filename, data, 0644)
	if err != nil {
		return err
	}
	fmt.Println("JSON data saved to", filename)
	return nil
}
