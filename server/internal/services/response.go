package services

import "time"

type IssuesResponse struct {
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
	Project   Project
	Tracker   Tracker
	Subject   string
	Status    Status
	Priority  Priority
	Assignee  AssignedTo
	StartDate string
	DueDate   any
}

type UserResponse struct {
	User struct {
		ID          int       `json:"id"`
		Login       string    `json:"login"`
		Admin       bool      `json:"admin"`
		Firstname   string    `json:"firstname"`
		Lastname    string    `json:"lastname"`
		Mail        string    `json:"mail"`
		CreatedOn   time.Time `json:"created_on"`
		LastLoginOn time.Time `json:"last_login_on"`
		APIKey      string    `json:"api_key"`
	} `json:"user"`
}
