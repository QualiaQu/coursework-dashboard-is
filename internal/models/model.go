package models

import "time"

type User struct {
	ID          int       `json:"id"`
	Login       string    `json:"login"`
	Admin       bool      `json:"admin"`
	Firstname   string    `json:"firstname"`
	Lastname    string    `json:"lastname"`
	Mail        string    `json:"mail"`
	CreatedOn   time.Time `json:"created_on"`
	LastLoginOn time.Time `json:"last_login_on"`
	APIKey      string    `json:"api_key"`
}
