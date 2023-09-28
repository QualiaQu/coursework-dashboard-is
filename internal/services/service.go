package services

import (
	"encoding/json"
	"fmt"
	"github.com/go-resty/resty/v2"
	"io/ioutil"
)

func GetResponse(apiKey string) RedmineResponse {
	client := resty.New()
	redmineURL := "http://localhost"
	apiURL := fmt.Sprintf("%s/issues.json", redmineURL)

	resp, err := client.R().
		SetHeader("Content-Type", "application/json").
		SetHeader("X-Redmine-API-Key", apiKey).
		Get(apiURL)

	var response RedmineResponse

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

	err = saveJSONToFile(resp.Body(), "redmine.json")
	if err != nil {
		fmt.Println("Error:", err)
		return response
	}

	return response
}

func (r RedmineResponse) GetVersions() []TargetVersion {
	fixedVersions := make([]TargetVersion, 0)
	uniqueVersions := make(map[TargetVersion]bool)

	for _, issue := range r.Issues {
		if issue.TargetVersion.ID != 0 { // Проверяем, что TargetVersion задан
			// Добавляем TargetVersion в множество уникальных версий
			if !uniqueVersions[issue.TargetVersion] {
				uniqueVersions[issue.TargetVersion] = true
				fixedVersions = append(fixedVersions, issue.TargetVersion)
			}
		}
	}

	return fixedVersions
}

func (r RedmineResponse) GetTargetIssues(targetVersion string) []RedmineIssue {
	targetIssues := make([]RedmineIssue, 0)

	return targetIssues
}

func saveJSONToFile(data []byte, filename string) error {
	err := ioutil.WriteFile(filename, data, 0644)
	if err != nil {
		return err
	}
	fmt.Println("JSON data saved to", filename)
	return nil
}
