// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.28.0

package repository

import (
	"time"
)

type MaintenanceLog struct {
	ID                    int64      `json:"id"`
	CreatedAt             *time.Time `json:"created_at"`
	UpdatedAt             *time.Time `json:"updated_at"`
	Emitter               string     `json:"emitter"`
	FaultDescription      string     `json:"fault_description"`
	IssuingDepartment     string     `json:"issuing_department"`
	MaintenanceNumber     string     `json:"maintenance_number"`
	DateOfMaintenance     time.Time  `json:"date_of_maintenance"`
	UsedMaterials         string     `json:"used_materials"`
	MaintenanceTechnician string     `json:"maintenance_technician"`
	Result                *string    `json:"result"`
	Observations          *string    `json:"observations"`
}
