import { z } from 'zod'

export const maintenanceLogSchema = z.object({
  emitter: z.string().min(1, 'Emitter is required'),
  fault_description: z.string().min(1, 'Fault description is required'),
  issuing_department: z.string().min(1, 'Issuing department is required'),
  maintenance_number: z.string().min(1, 'Maintenance number is required'),
  date_of_maintenance: z.date({
    required_error: 'Date of maintenance is required'
  }),
  used_materials: z.string().min(1, 'Used materials are required'),
  maintenance_technician: z
    .string()
    .min(1, 'Maintenance technician is required'),
  result: z.string().min(1, 'Result is required'),
  observations: z.string().optional()
})

export type MaintenanceLogFormValues = z.infer<typeof maintenanceLogSchema>
