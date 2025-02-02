package main

import (
	"context"
	"fmt"

	"github.com/khaym03/soli/excel"
	"github.com/khaym03/soli/repository"
	"github.com/wailsapp/wails/v2/pkg/runtime"
)

const (
	// Aviable events
	EventUpdateMaintenanceTable = "update_maintenance_table"
)

// App struct
type App struct {
	ctx     context.Context
	xlsx    *excel.Excel
	queries *repository.Queries
}

// NewApp creates a new App application struct
func NewApp(q *repository.Queries) *App {
	return &App{xlsx: excel.NewExcel(), queries: q}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// Greet returns a greeting for the given name
func (a *App) Sheets() []string {
	return a.xlsx.Sheets()
}

func (a *App) CurrentSheet() string {
	return a.xlsx.CurrentSheet()
}

func (a *App) SendRequestPayload(payload *excel.RequestFormPayload) {
	fmt.Println(payload.String())
	a.xlsx.SaveRequest(*payload)
}

func (a *App) GetMaintenanceLogs() []repository.MaintenanceLog {
	maintenanceLogs, err := a.queries.GetMaintenanceLogs(context.Background())
	if err != nil {
		fmt.Println(err)
		return nil
	}
	return maintenanceLogs
}

func (a *App) CreateMaintenanceLog(params repository.CreateMaintenanceLogParams) repository.MaintenanceLog {

	fmt.Println(params)
	maintenanceLog, err := a.queries.CreateMaintenanceLog(context.Background(), params)
	if err != nil {
		fmt.Println(err)
		return repository.MaintenanceLog{}
	}

	runtime.EventsEmit(a.ctx, EventUpdateMaintenanceTable)

	return maintenanceLog
}

func (a *App) DeleteMaintenanceLog(id int64) {
	err := a.queries.DeleteMaintenanceLog(context.Background(), id)
	if err != nil {
		fmt.Println(err)
	}

	runtime.EventsEmit(a.ctx, EventUpdateMaintenanceTable)
}
