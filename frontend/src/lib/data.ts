import { MaintenanceLogFormValues } from "./schema-maintenance";

// This would typically come from your backend
export const maintenanceLogs: (MaintenanceLogFormValues & { id: string })[] = [
  {
    id: "1",
    maintenance_number: "MNT-2024-001",
    date_of_maintenance: new Date("2024-01-15"),
    emitter: "John Doe",
    fault_description: "Faulty power supply",
    issuing_department: "Electrical",
    used_materials: "Power supply unit, cables",
    maintenance_technician: "Mike Smith",
    result: "Replaced power supply",
    observations: "Regular maintenance required",
  },
  {
    id: "2",
    maintenance_number: "MNT-2024-002",
    date_of_maintenance: new Date("2024-02-01"),
    emitter: "Jane Smith",
    fault_description: "Network connectivity issues",
    issuing_department: "IT",
    used_materials: "Network cable, connector",
    maintenance_technician: "Bob Johnson",
    result: "Fixed network connection",
    observations: "Updated network configuration",
  },
];