-- name: GetMaintenanceLog :one
SELECT * FROM maintenance_log
WHERE id = ? LIMIT 1;

-- name: GetMaintenanceLogs :many
SELECT * FROM maintenance_log;

-- name: CreateMaintenanceLog :one
INSERT INTO maintenance_log (
    emitter,
    fault_description,
    issuing_department,
    maintenance_number,
    date_of_maintenance,
    used_materials,
    maintenance_technician,
    result,
    observations
) VALUES (
    ?,
    ?,
    ?,
    ?,
    ?,
    ?,
    ?,
    ?,
    ?
) RETURNING *;

-- name: UpdateMaintenanceLog :exec
UPDATE maintenance_log
SET created_at = ?,
    updated_at = ?,
    emitter = ?,
    fault_description = ?,
    issuing_department = ?,
    maintenance_number = ?,
    date_of_maintenance = ?,
    used_materials = ?,
    maintenance_technician = ?,
    result = ?,
    observations = ?
WHERE id = ?;

-- name: DeleteMaintenanceLog :exec
DELETE FROM maintenance_log
WHERE id = ?;

-- name: GetSerialvValue :one
SELECT value FROM serial
WHERE id = 1;

-- name: UpdateSerial :exec
UPDATE serial
SET value = ?;