package main

import (
	"context"
	"fmt"

	"github.com/khaym03/soli/excel"
)

// App struct
type App struct {
	ctx  context.Context
	xlsx *excel.Excel
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{xlsx: excel.NewExcel()}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

func (a *App) SendRequestPayload(payload *excel.RequestFormPayload) {
	fmt.Println(payload.String())
	a.xlsx.SaveRequest(*payload)
}
