import { z } from 'zod'

export const maintenanceLogSchema = z.object({
  emitter: z.string().min(3, 'Emisor es requerido'),
  fault_description: z.string().min(1, 'Descripción del fallo es requerido'),
  issuing_department: z.string().min(1, 'Departamento de emisión es requerido'),
  maintenance_number: z.string().min(1, 'No. mantenimiento es requerido'),
  date_of_maintenance: z.date({
    required_error: 'Fecha de mantenimiento es requerida'
  }),
  used_materials: z.string().min(1, 'Materiales utilizados son requeridos'),
  maintenance_technician: z
    .string()
    .min(1, 'Tecnico es requerido'),
  result: z.string().optional(),
  observations: z.string().optional()
})

export type MaintenanceLogFormValues = z.infer<typeof maintenanceLogSchema>
