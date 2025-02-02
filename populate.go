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

	// queries := repository.New(db)

	// Listar todos los autores
	// authors, err := queries.ListAuthors(ctx)
	// if err != nil {
	// 	return err
	// }
	// log.Println(authors)

	// Crear un autor
	// insertedAuthor, err := queries.CreateAuthor(ctx, repository.CreateAuthorParams{
	// 	Name: "Brian Kernighan",
	// 	Bio:  sql.NullString{String: "Co-author of The C Programming Language and The Go Programming Language", Valid: true},
	// })
	// if err != nil {
	// 	return err
	// }
	// log.Println(insertedAuthor)

	// Create maintenance log
	// maintenanceLog, err := queries.CreateMaintenanceLog(ctx, repository.CreateMaintenanceLogParams{
	// 	CreatedAt:             time.Now(),
	// 	UpdatedAt:             time.Now(),
	// 	Emitter:               "Emisor",
	// 	FaultDescription:      "Descripción del fallo",
	// 	IssuingDepartment:     "Departamento de emisión",
	// 	MaintenanceNumber:     "No. mantenimiento",
	// 	DateOfMaintenance:     time.Now(),
	// 	UsedMaterials:         "Materiales utilizados",
	// 	MaintenanceTechnician: "Tecnico",
	// 	Result:                sql.NullString{String: "Resultado", Valid: true},
	// 	Observations:          sql.NullString{String: "Observaciones", Valid: true},
	// })
	// if err != nil {
	// 	return err
	// }
	// log.Println(maintenanceLog)

	// // Listar todos los autores
	// maintenanceLogs, err := queries.GetMaintenanceLogs(ctx)
	// if err != nil {
	// 	return err
	// }
	// log.Println(maintenanceLogs)

	return db, nil

}
