package database

import (
	"dashboard/server/internal/models"
	"database/sql"
	"log"
	_ "modernc.org/sqlite"
)

func Start() (db *sql.DB) {
	db, err := sql.Open("sqlite", "./server/internal/database/versions-info.db")
	if err != nil {
		log.Fatal(err)
	}

	sqlStmt :=
		`CREATE TABLE IF NOT EXISTS app_versions (
		version TEXT NOT NULL,
		store TEXT NOT NULL,
		deploy_date TEXT NOT NULL,
		install_percentage REAL NOT NULL,
		is_errors INTEGER NOT NULL);`
	_, err = db.Exec(sqlStmt)
	if err != nil {
		log.Printf("%q: %s\n", err, sqlStmt)
		return
	}

	return db
}

func SetVersionInfo(db *sql.DB, version, store, deployDate string, installPercentage float64, isErrors int) error {
	var count int
	err := db.QueryRow("SELECT COUNT(*) FROM app_versions WHERE version=? AND store=?", version, store).Scan(&count)
	if err != nil {
		return err
	}

	if count > 0 {
		stmt, err := db.Prepare("UPDATE app_versions SET deploy_date=?, install_percentage=?, is_errors=? WHERE version=? AND store=?")
		if err != nil {
			return err
		}
		defer stmt.Close()

		_, err = stmt.Exec(deployDate, installPercentage, isErrors, version, store)
		if err != nil {
			return err
		}
	} else {
		stmt, err := db.Prepare("INSERT INTO app_versions(version, store, deploy_date, install_percentage, is_errors) VALUES(?, ?, ?, ?, ?)")
		if err != nil {
			return err
		}
		defer stmt.Close()

		_, err = stmt.Exec(version, store, deployDate, installPercentage, isErrors)
		if err != nil {
			return err
		}
	}

	return nil
}

func GetVersionInfo(db *sql.DB, targetVersion string) ([]models.AppVersion, error) {
	rows, err := db.Query("SELECT * FROM app_versions WHERE version=?", targetVersion)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var appVersions []models.AppVersion
	for rows.Next() {
		var av models.AppVersion
		err := rows.Scan(&av.Version, &av.Store, &av.DeployDate, &av.InstallPercentage, &av.IsErrors)
		if err != nil {
			return nil, err
		}
		appVersions = append(appVersions, av)
	}

	return appVersions, nil
}
