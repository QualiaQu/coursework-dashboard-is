package services

import "time"

type Response struct {
	Issues     []Issues `json:"issues"`
	Limit      int      `json:"limit"`
	Offset     int      `json:"offset"`
	TotalCount int      `json:"total_count"`
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
type Issues struct {
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

func (r Response) GetAllFixedVersions() []TargetVersion {
	fixedVersions := make([]TargetVersion, 0)

	for _, issue := range r.Issues {
		if issue.TargetVersion.ID != 0 { // Проверяем, что TargetVersion задан
			fixedVersions = append(fixedVersions, issue.TargetVersion)
		}
	}

	return fixedVersions
}
