CREATE TABLE IF NOT EXISTS maintenance_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at DATETIME DEFAULT (DATETIME('now','utc')),
    updated_at DATETIME DEFAULT (DATETIME('now','utc')),
    emitter TEXT NOT NULL,
    fault_description TEXT NOT NULL,
    issuing_department TEXT NOT NULL,
    maintenance_number TEXT NOT NULL,
    date_of_maintenance DATETIME NOT NULL,
    used_materials TEXT NOT NULL,
    maintenance_technician TEXT NOT NULL,
    result TEXT,
    observations TEXT
);
