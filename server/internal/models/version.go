package models

type AppVersion struct {
	Version           string
	Store             string
	DeployDate        string
	ApprovalDate      string
	InstallPercentage float64
}
