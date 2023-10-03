package services

import "time"

type RedmineResponse struct {
	Issues     []RedmineIssue `json:"issues"`
	Limit      int            `json:"limit"`
	Offset     int            `json:"offset"`
	TotalCount int            `json:"total_count"`
}
type Project struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}
type Tracker struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}
type Status struct {
	ID       int    `json:"id"`
	Name     string `json:"name"`
	IsClosed bool   `json:"is_closed"`
}
type Priority struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}
type Author struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}
type AssignedTo struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}
type TargetVersion struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

type RedmineIssue struct {
	ID                  int           `json:"id"`
	Project             Project       `json:"project"`
	Tracker             Tracker       `json:"tracker"`
	Status              Status        `json:"status"`
	Priority            Priority      `json:"priority"`
	Author              Author        `json:"author"`
	AssignedTo          AssignedTo    `json:"assigned_to,omitempty"`
	TargetVersion       TargetVersion `json:"fixed_version,omitempty"`
	Subject             string        `json:"subject"`
	Description         string        `json:"description"`
	StartDate           string        `json:"start_date"`
	DueDate             any           `json:"due_date"`
	DoneRatio           int           `json:"done_ratio"`
	IsPrivate           bool          `json:"is_private"`
	EstimatedHours      any           `json:"estimated_hours"`
	TotalEstimatedHours any           `json:"total_estimated_hours"`
	SpentHours          float64       `json:"spent_hours"`
	TotalSpentHours     float64       `json:"total_spent_hours"`
	CreatedOn           time.Time     `json:"created_on"`
	UpdatedOn           time.Time     `json:"updated_on"`
	ClosedOn            any           `json:"closed_on"`
}

type Issue struct {
	Subject   string
	Status    Status
	Priority  Priority
	Assignee  AssignedTo
	StartDate string
	DueDate   any
}

func (r RedmineResponse) GetVersions() []TargetVersion {
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

func (r RedmineResponse) GetTargetIssues(targetVersion string) []Issue {
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
