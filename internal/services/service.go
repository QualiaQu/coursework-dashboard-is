package services

import (
	"encoding/json"
	"fmt"
	"github.com/go-resty/resty/v2"
	"io/ioutil"
)

func GetIssues(apiKey string) (IssuesResponse, int) {
	client := resty.New()
	redmineURL := "http://localhost"
	apiURL := fmt.Sprintf("%s/issues.json", redmineURL)
	var response IssuesResponse

	resp, err := client.R().
		SetHeader("Content-Type", "application/json").
		SetHeader("X-Redmine-API-Key", apiKey).
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

	err = saveJSONToFile(resp.Body(), "response.json")
	if err != nil {
		fmt.Println("Error:", err)
		return response, 0
	}

	return response, resp.StatusCode()
}

func GetUser(apiKey string) (UserResponse, int) {
	client := resty.New()
	redmineURL := "http://localhost"
	apiURL := fmt.Sprintf("%s/my/account.json", redmineURL)
	var user UserResponse

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

	err = saveJSONToFile(resp.Body(), "user.json")
	if err != nil {
		fmt.Println("Error:", err)
		return user, resp.StatusCode()
	}

	return user, resp.StatusCode()
}

func (r IssuesResponse) GetVersions() []TargetVersion {
	fixedVersions := make([]TargetVersion, 0)
	uniqueVersions := make(map[TargetVersion]bool)

	for _, issue := range r.Issues {
		if issue.TargetVersion.ID != 0 {
			if !uniqueVersions[issue.TargetVersion] {
				uniqueVersions[issue.TargetVersion] = true
				fixedVersions = append(fixedVersions, issue.TargetVersion)
			}
		}
	}

	return fixedVersions
}

func (r IssuesResponse) GetTargetIssues(targetVersion string) []Issue {
	targetIssues := make([]Issue, 0)

	for _, redmineIssue := range r.Issues {
		if redmineIssue.TargetVersion.Name == targetVersion {
			issue := Issue{
				Subject:   redmineIssue.Subject,
				Status:    redmineIssue.Status,
				Priority:  redmineIssue.Priority,
				Assignee:  redmineIssue.AssignedTo,
				StartDate: redmineIssue.StartDate,
				DueDate:   redmineIssue.DueDate,
			}
			targetIssues = append(targetIssues, issue)
		}
	}

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
