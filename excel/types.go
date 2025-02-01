package excel

import (
	"fmt"
	"strings"
	"time"
)

type RowRequest struct {
	Quantity      int32  `json:"quantity"`
	Description   string `json:"description"`
	Justification string `json:"justification"`
}

func (r *RowRequest) Purify() {
	r.Description = strings.TrimSpace(r.Description)
	r.Justification = strings.TrimSpace(r.Justification)
}

type RequestFormPayload struct {
	To        string       `json:"to"`
	From      string       `json:"from"`
	Service   bool         `json:"service"`
	Materials bool         `json:"materials"`
	Equipment bool         `json:"equipment"`
	RowReq    []RowRequest `json:"rowReq"`
}

type Request struct {
	RequestFormPayload
	Date time.Time `json:"date"`
}

func (r *RequestFormPayload) String() string {
	return fmt.Sprintf("To: %s, From: %s, Service: %t, Materials: %t, Equipment: %t, RowReq: %v", r.To, r.From, r.Service, r.Materials, r.Equipment, r.RowReq)
}

type HeaderFormat struct {
	Codigo            string `json:"codigo"`
	CodigoExtension   string `json:"cod_extension"`
	Version           string `json:"version"`
	FechaDeVersion    string `json:"fecha_de_version"`
	DepndencyDivision string `json:"depdncia_division"`
}

type MaintenanceLog struct {
	CreatedAt             time.Time `json:"created_at"`
	UpdatedAt             time.Time `json:"updated_at"`
	Emitter               string    `json:"emitter"`
	FaultDescription      string    `json:"fault_description"`
	IssuingDepartment     string    `json:"issuing_department"`
	MaintenanceNumber     string    `json:"maintenance_number"`
	DateOfMaintenance     time.Time `json:"date_of_maintenance"`
	UsedMaterials         string    `json:"used_materials"`
	MaintenanceTechnician string    `json:"maintenance_technician"`
	Result                string    `json:"result"`
	Observations          string    `json:"observations"`
}
