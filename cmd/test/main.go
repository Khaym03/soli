package main

import (
	"fmt"

	"github.com/khaym03/soli/excel"
)

var (
	filename  = "test.xlsx"
	sheetName = "Sheet1"
)

func main() {
	// Crear una nueva instancia de Excel
	exc := excel.NewExcel()

	// Crear el archivo Excel
	MakeExcelFile(exc, filename)

	// Establecer el nombre de la hoja
	exc.File().SetSheetName("Hoja1", sheetName)

	// Popular el archivo Excel con datos
	PopulateExcelFile(exc)

	fmt.Println("Archivo Excel creado y populado exitosamente.")
}

// MakeExcelFile crea un archivo Excel válido
func MakeExcelFile(e *excel.Excel, filename string) {
	// Crear un nuevo archivo Excel
	e.NewFile()

	// Guardar el archivo inicial
	if err := e.File().SaveAs(filename); err != nil {
		panic(fmt.Sprintf("Error al guardar el archivo: %v", err))
	}
}

// PopulateExcelFile agrega datos al archivo Excel
func PopulateExcelFile(e *excel.Excel) {
	requests := []excel.RequestFormPayload{
		{
			To:        "Request 1",
			From:      "User 1",
			Service:   true,
			Materials: true,
			Equipment: false,
			RowReq: []excel.RowRequest{
				{Quantity: 1, Description: "Item A", Justification: "Justification A"},
			},
		},
		{
			To:        "Request 2",
			From:      "User 2",
			Service:   false,
			Materials: true,
			Equipment: true,
			RowReq: []excel.RowRequest{
				{Quantity: 3, Description: "Item B", Justification: "Justification B"},
				{Quantity: 5, Description: "Item C", Justification: "Justification C"},
			},
		},
		{
			To:        "Test",
			From:      "Test",
			Service:   true,
			Materials: true,
			Equipment: true,
			RowReq: []excel.RowRequest{
				{Quantity: 1, Description: "Test", Justification: "Test"},
				{Quantity: 2, Description: "Otro Test", Justification: "Otra Justificación"},
			},
		},
	}

	for _, req := range requests {
		e.SaveRequest(req)
	}

}
