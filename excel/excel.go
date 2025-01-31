package excel

import (
	"bufio"
	"fmt"
	"strings"
	"time"

	"github.com/xuri/excelize/v2"
)

var sheetName = "Hoja1"

const (
	primeraColWidth int32 = 15
	segundaColWidth int32 = 50
	terceraColWidth int32 = 50

	logoWidth   float64 = 30
	titleWidth  float64 = 62
	formatWidth float64 = 20
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

}

func (e *Excel) SaveRequest(rfp RequestFormPayload) {
	e.Load("test.xlsx")

	defer e.file.Close()
	e.buildHeader()

	e.file.SetCellValue(sheetName, "A6", "Fecha:")
	e.file.SetCellValue(sheetName, "B6", time.Now().Format("02/01/2006"))

	// inicio del cuerpo de la solicitud
	contetStartRow := 7

	e.file.SetCellValue(sheetName, fmt.Sprintf("A%d", contetStartRow), "Para:")
	e.file.SetCellValue(sheetName, fmt.Sprintf("A%d", contetStartRow+1), "De:")

	e.file.SetCellValue(sheetName, fmt.Sprintf("B%d", contetStartRow), rfp.To)
	e.file.SetCellValue(sheetName, fmt.Sprintf("B%d", contetStartRow+1), rfp.From)

	e.file.SetCellValue(sheetName, fmt.Sprintf("A%d", contetStartRow+2), rfp.Service)
	e.file.SetCellValue(sheetName, fmt.Sprintf("A%d", contetStartRow+3), rfp.Materials)
	e.file.SetCellValue(sheetName, fmt.Sprintf("A%d", contetStartRow+4), rfp.Equipment)

	e.file.SetCellValue(sheetName, fmt.Sprintf("B%d", contetStartRow+2), "Servicios")
	e.file.SetCellValue(sheetName, fmt.Sprintf("B%d", contetStartRow+3), "Materiales")
	e.file.SetCellValue(sheetName, fmt.Sprintf("B%d", contetStartRow+4), "Equipos")

	e.file.SetCellValue(sheetName, fmt.Sprintf("A%d", contetStartRow+5), "Cant.")
	e.file.SetCellValue(sheetName, fmt.Sprintf("B%d", contetStartRow+5), "Descripción del material")

	e.file.SetCellValue(sheetName, fmt.Sprintf("C%d", contetStartRow+5), "Justificación")
	e.file.MergeCell(sheetName, fmt.Sprintf("C%d", contetStartRow+5), fmt.Sprintf("D%d", contetStartRow+5))

	// Crear un estilo con ajuste de texto
	style := excelize.Style{
		Alignment: &excelize.Alignment{
			Horizontal: "left",
			Vertical:   "top",
			WrapText:   true,
		},
	}
	styleID, err := e.file.NewStyle(&style)
	if err != nil {
		fmt.Println("Error al crear estilo:", err)
		return
	}

	justifyWidth := 40.00

	// Escribir la fila de requerimientos
	for i, req := range rfp.RowReq {
		row := i + contetStartRow + 5 + 1

		req.Purify()

		e.file.SetCellValue(sheetName, fmt.Sprintf("A%d", row), req.Quantity)
		e.file.SetCellValue(sheetName, fmt.Sprintf("B%d", row), req.Description)
		e.file.SetCellValue(sheetName, fmt.Sprintf("C%d", row), req.Justification)
		// e.file.MergeCell(sheetName, fmt.Sprintf("C%d", row), fmt.Sprintf("D%d", row))
		e.file.SetColWidth(sheetName, fmt.Sprintf("C%d", row), fmt.Sprintf("C%d", row), justifyWidth)

		// Ajustar la altura de la fila en función del contenido
		descriptionHeight := estimateRowHeight(req.Description)
		justificationHeight := estimateRowHeight(req.Justification)
		maxHeight := max(descriptionHeight, justificationHeight)

		// Establecer la altura de la fila
		if err := e.file.SetRowHeight(sheetName, row, maxHeight); err != nil {
			fmt.Println(err)
		}

		if err := e.file.SetCellStyle(sheetName, fmt.Sprintf("A%d", row), fmt.Sprintf("C%d", row), styleID); err != nil {
			fmt.Println(err)
		}

	}

	// Guardar los cambios en el archivo existente
	if err := e.file.Save(); err != nil {
		fmt.Println(err)
		return
	}

	return
}

func (e *Excel) createHeaderStyle() int {
	style, err := e.file.NewStyle(&excelize.Style{
		Font: &excelize.Font{
			Bold:  true,
			Size:  12,
			Color: "#FFFFFF", // Color en formato RGB
		},
		Fill: excelize.Fill{
			Type:    "pattern",
			Color:   []string{"#4F81BD"},
			Pattern: 1,
		},
		Alignment: &excelize.Alignment{
			Horizontal: "center",
		},
	})
	if err != nil {
		fmt.Println("Error al crear el estilo:", err)
		return 0
	}

	return style
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

// Función para obtener el máximo entre dos valores
func max(a, b float64) float64 {
	if a > b {
		return a
	}
	return b
}
