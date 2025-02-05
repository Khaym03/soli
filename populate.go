package main

import (
	"context"
	"database/sql"
	_ "embed"

	_ "modernc.org/sqlite"
)

//go:embed schema.sql
var ddl string

func setupDB() (*sql.DB, error) {
	ctx := context.Background()

	// Cambiar ":memory:" a "data.db" para persistir los datos
	db, err := sql.Open("sqlite", "data.db")
	if err != nil {
		return nil, err
	}

	// Crear tablas
	if _, err := db.ExecContext(ctx, ddl); err != nil {
		return nil, err
	}

	if _, err := db.ExecContext(ctx, "INSERT OR IGNORE INTO serial (value) VALUES (0)"); err != nil {
		return nil, err
	}

	return db, nil

}
