package main

import (
	"embed"

	"github.com/khaym03/soli/repository"
	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {

	dbConn, err := setupDB()
	if err != nil {
		panic(err)
	}

	defer dbConn.Close()

	queries := repository.New(dbConn)
	// Create an instance of the app structure
	app := NewApp(queries)

	// Create application with options
	err = wails.Run(&options.App{
		Title:  "soli",
		Width:  1024,
		Height: 768,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		BackgroundColour: &options.RGBA{R: 251, G: 251, B: 251, A: 1},
		OnStartup:        app.startup,
		Bind: []interface{}{
			app,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
