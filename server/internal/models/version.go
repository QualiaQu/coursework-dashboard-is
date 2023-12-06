package models

type AppVersion struct {
	Version           string
	Store             string
	DeployDate        string
	InstallPercentage float64
	IsErrors          int
}
