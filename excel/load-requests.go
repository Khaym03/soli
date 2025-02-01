package excel

import (
	"fmt"
	"strconv"
)

func (e *Excel) LoadRequests(sheetName string) ([]Request, error) {
	// Cargar el archivo
	e.Load("test.xlsx")

	defer e.file.Close()

	// Obtener las filas del sheet
	rows, err := e.file.GetRows(sheetName)
	if err != nil {
		return nil, fmt.Errorf("error al obtener filas: %v", err)
	}

	var requests []Request
	var currentRequest Request
	currentRequest.RowReq = []RowRequest{}

	// Leer los datos desde las filas
	for i, row := range rows {
		if i < 6 { // Asumiendo que las primeras 6 filas son encabezados
			continue
		}

		// Verificar si la fila está vacía
		if len(row) == 0 || (len(row) == 1 && row[0] == "") {
			// Si hay datos en currentRequest, lo agregamos a la lista de solicitudes
			if len(currentRequest.RowReq) > 0 {
				requests = append(requests, currentRequest)
				currentRequest = Request{} // Reiniciar para nueva solicitud
				currentRequest.RowReq = []RowRequest{}
			}
			continue
		}

		// Extraer datos relevantes
		if i == 6 { // Fila donde se encuentra "Para:"
			currentRequest.To = row[1]
		} else if i == 7 { // Fila donde se encuentra "De:"
			currentRequest.From = row[1]
		} else if i == 8 { // Fila donde se encuentra "Servicio"
			currentRequest.Service = row[0] == "TRUE" // O según tu lógica para booleanos
		} else if i == 9 { // Fila donde se encuentra "Materiales"
			currentRequest.Materials = row[0] == "TRUE"
		} else if i == 10 { // Fila donde se encuentra "Equipos"
			currentRequest.Equipment = row[0] == "TRUE"
		} else {
			// Leer las solicitudes (a partir de la fila 11)
			req := RowRequest{
				Quantity:      parseQuantity(row[0]), // Función para convertir a int32
				Description:   row[1],
				Justification: row[2],
			}
			req.Purify() // Limpiar los espacios en blanco
			currentRequest.RowReq = append(currentRequest.RowReq, req)
		}
	}

	// Agregar la última solicitud si existe
	if len(currentRequest.RowReq) > 0 {
		requests = append(requests, currentRequest)
	}

	return requests, nil
}

func parseQuantity(value string) int32 {
	quantity, err := strconv.ParseInt(value, 10, 32)
	if err != nil {
		return 0 // O manejar el error como prefieras
	}
	return int32(quantity)
}
