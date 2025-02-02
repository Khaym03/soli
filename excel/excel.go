package excel

import (
	"bufio"
	"fmt"
	"strings"
	"time"

	"github.com/xuri/excelize/v2"
)

var sheetName = "Sheet1"

const (
	logoWidth   float64 = 30
	titleWidth  float64 = 62
	formatWidth float64 = 20

	headerSizeInRows = 5
)

type Excel struct {
	file         *excelize.File
	headerFormat *HeaderFormat
}

func NewExcel() *Excel {
	headerFormat, err := loadHeaderFormat()
	if err != nil {
		panic(err)
	}
	return &Excel{headerFormat: headerFormat}
}

func (e *Excel) Load(filename string) {
	f, err := excelize.OpenFile(filename)
	if err != nil {
		panic(err)
	}
	e.file = f

	sheetName = e.file.GetSheetList()[0]

}

func (e *Excel) SaveRequest(rfp RequestFormPayload) {
	e.Load("test.xlsx")

	defer e.file.Close()

	// inicio del cuerpo de la solicitud
	var contetStartRow int

	if e.getLastRow(sheetName) == 0 {
		e.buildHeader()
		contetStartRow = headerSizeInRows + 1
	} else {
		contetStartRow = e.getLastRow(sheetName) + 1
	}

	e.file.SetCellValue(sheetName, fmt.Sprintf("A%d", contetStartRow+1), "Fecha:")
	e.file.SetCellValue(sheetName, fmt.Sprintf("B%d", contetStartRow+1), time.Now().Format("02/01/2006"))

	e.file.SetCellStyle(
		sheetName,
		fmt.Sprintf("A%d", contetStartRow+1),
		fmt.Sprintf("D%d", contetStartRow+1),
		e.dateRowStyle(),
	)

	e.file.SetCellValue(sheetName, fmt.Sprintf("A%d", contetStartRow+2), "Para:")
	e.file.SetCellValue(sheetName, fmt.Sprintf("A%d", contetStartRow+3), "De:")

	e.file.SetCellValue(sheetName, fmt.Sprintf("B%d", contetStartRow+2), rfp.To)
	e.file.SetCellValue(sheetName, fmt.Sprintf("B%d", contetStartRow+3), rfp.From)

	e.file.SetCellValue(sheetName, fmt.Sprintf("A%d", contetStartRow+4), rfp.Service)
	e.file.SetCellValue(sheetName, fmt.Sprintf("A%d", contetStartRow+5), rfp.Materials)
	e.file.SetCellValue(sheetName, fmt.Sprintf("A%d", contetStartRow+6), rfp.Equipment)

	e.file.SetCellValue(sheetName, fmt.Sprintf("B%d", contetStartRow+4), "Servicios")
	e.file.SetCellValue(sheetName, fmt.Sprintf("B%d", contetStartRow+5), "Materiales")
	e.file.SetCellValue(sheetName, fmt.Sprintf("B%d", contetStartRow+6), "Equipos")

	e.file.SetCellValue(sheetName, fmt.Sprintf("A%d", contetStartRow+7), "Cant.")
	e.file.SetCellValue(sheetName, fmt.Sprintf("B%d", contetStartRow+7), "Descripción del material")

	e.file.SetCellValue(sheetName, fmt.Sprintf("C%d", contetStartRow+7), "Justificación")
	e.file.MergeCell(sheetName, fmt.Sprintf("C%d", contetStartRow+7), fmt.Sprintf("D%d", contetStartRow+7))

	e.file.SetCellStyle(
		sheetName,
		fmt.Sprintf("A%d", contetStartRow+7),
		fmt.Sprintf("D%d", contetStartRow+7),
		e.reqItemsHeaderStyle(),
	)

	// Escribir la fila de requerimientos
	for i, req := range rfp.RowReq {
		row := i + contetStartRow + 8

		req.Purify()

		e.file.SetCellStyle(
			sheetName,
			fmt.Sprintf("A%d", row), fmt.Sprintf("D%d", row),
			e.reqItemsRowStyle(),
		)

		e.file.SetCellValue(sheetName, fmt.Sprintf("A%d", row), req.Quantity)
		e.file.SetCellValue(sheetName, fmt.Sprintf("B%d", row), req.Description)
		e.file.SetCellValue(sheetName, fmt.Sprintf("C%d", row), req.Justification)
		e.file.MergeCell(sheetName, fmt.Sprintf("C%d", row), fmt.Sprintf("D%d", row))
		// e.file.SetColWidth(sheetName, fmt.Sprintf("C%d", row), fmt.Sprintf("C%d", row), justifyWidth)

		// Ajustar la altura de la fila en función del contenido
		descriptionHeight := estimateRowHeight(req.Description)
		justificationHeight := estimateRowHeight(req.Justification)
		maxHeight := max(descriptionHeight, justificationHeight)

		// Establecer la altura de la fila
		if err := e.file.SetRowHeight(sheetName, row, maxHeight); err != nil {
			fmt.Println(err)
		}

		// if err := e.file.SetCellStyle(sheetName, fmt.Sprintf("B%d", row), fmt.Sprintf("C%d", row), styleID); err != nil {
		// 	fmt.Println(err)
		// }

	}

	// Guardar los cambios en el archivo existente
	if err := e.file.Save(); err != nil {
		fmt.Println(err)
		return
	}
}

// Función para estimar la altura de una fila basada en el contenido
func estimateRowHeight(content string) float64 {
	const baseHeight = 15.0 // Altura base en puntos
	const lineHeight = 12.0 // Altura por línea en puntos

	var lineCount int
	scanner := bufio.NewScanner(strings.NewReader(content))
	for scanner.Scan() {
		lineCount++
	}

	return baseHeight + (lineHeight * float64(lineCount))
}

func (e *Excel) getLastRow(sheetName string) int {
	rows, err := e.file.GetRows(sheetName)
	if err != nil {
		fmt.Println("Error al obtener filas:", err)
		return 0
	}
	return len(rows)
}

func (e *Excel) File() *excelize.File {
	return e.file
}

func (e *Excel) NewFile() {
	e.file = excelize.NewFile()
}

func (e *Excel) Sheets() []string {
	e.Load("test.xlsx")
	sheets := e.file.GetSheetList()

	return sheets
}

func (e *Excel) CurrentSheet() string {
	return sheetName
}

func SetSheetName(name string) {
	sheetName = name
}

// Función para obtener el máximo entre dos valores
func max(a, b float64) float64 {
	if a > b {
		return a
	}
	return b
}
