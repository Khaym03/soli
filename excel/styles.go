package excel

import (
	"fmt"

	"github.com/xuri/excelize/v2"
)

const (
	reqItemsRowBorderColor = "#bfdbfe"
)

func (e *Excel) itemCenter() int {
	style, _ := e.file.NewStyle(&excelize.Style{
		Alignment: &excelize.Alignment{
			Horizontal: "center",
			Vertical:   "center",
		},
	})

	return style
}

func (e *Excel) reqItemsHeaderStyle() int {
	// Crear un estilo con color de fondo
	style, err := e.file.NewStyle(&excelize.Style{
		Fill: excelize.Fill{
			Type:    "pattern",
			Color:   []string{"#93c5fd"}, // Color en formato hexadecimal
			Pattern: 1,                   // Tipo de patrón (1 para sólido)
		},
		Alignment: &excelize.Alignment{
			Horizontal: "left",
			Vertical:   "top",
			WrapText:   true,
		},
		Font: &excelize.Font{
			Bold: true,
		},
	})
	if err != nil {
		// Manejar el error
		fmt.Println("Error al crear el estilo:", err)
		return 0
	}

	return style
}

func (e *Excel) reqItemsRowStyle() int {
	// Crear un estilo con color de fondo
	style, err := e.file.NewStyle(&excelize.Style{
		Fill: excelize.Fill{
			Type:    "pattern",
			Color:   []string{"#eff6ff"}, // Color en formato hexadecimal
			Pattern: 1,                   // Tipo de patrón (1 para sólido)
		},
		Border: []excelize.Border{
			{
				Type:  "left",
				Color: reqItemsRowBorderColor, // Color del borde izquierdo (negro)
				Style: 1,                      // Estilo del borde (1 para línea sólida)
			},
			{
				Type:  "right",
				Color: reqItemsRowBorderColor, // Color del borde derecho
				Style: 1,
			},
			{
				Type:  "top",
				Color: reqItemsRowBorderColor, // Color del borde superior
				Style: 1,
			},
			{
				Type:  "bottom",
				Color: reqItemsRowBorderColor, // Color del borde inferior
				Style: 1,
			},
		},
		Alignment: &excelize.Alignment{
			Horizontal: "center",
			Vertical:   "center",
			WrapText:   true,
		},
	})
	if err != nil {
		// Manejar el error
		fmt.Println("Error al crear el estilo:", err)
		return 0
	}

	return style
}

func (e *Excel) dateRowStyle() int {
	// Crear un estilo con color de fondo
	style, err := e.file.NewStyle(&excelize.Style{
		Fill: excelize.Fill{
			Type:    "pattern",
			Color:   []string{"#fef08a"}, // Color en formato hexadecimal
			Pattern: 1,                   // Tipo de patrón (1 para sólido)
		},
	})
	if err != nil {
		// Manejar el error
		fmt.Println("Error al crear el estilo:", err)
		return 0
	}

	return style
}
