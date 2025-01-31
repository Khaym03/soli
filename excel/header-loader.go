package excel

import (
	"encoding/json"
	"fmt"
	"os"
)

func loadHeaderFormat() (*HeaderFormat, error) {
	jsonFile, err := os.Open("header-format.json")
	if err != nil {
		return nil, fmt.Errorf("error al abrir el archivo: %w", err)
	}
	defer jsonFile.Close()

	var headerFormat HeaderFormat
	decoder := json.NewDecoder(jsonFile)
	if err := decoder.Decode(&headerFormat); err != nil {
		return nil, fmt.Errorf("error al deserializar el JSON: %w", err)
	}

	return &headerFormat, nil
}
