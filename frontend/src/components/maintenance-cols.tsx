import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal } from 'lucide-react'
import { Button } from './ui/button'
import { useMaintenanceCtx } from './maintenance-ctx'
import { repository } from 'wailsjs/go/models'
import { DeleteMaintenanceLog } from 'wailsjs/go/main/App'

export const columns: ColumnDef<repository.MaintenanceLog>[] = [
  {
    accessorKey: 'maintenance_number',
    header: 'Mantenimiento#'
  },
  {
    accessorKey: 'date_of_maintenance',
    header: 'Fecha',
    cell: info => {
      return format(info.getValue() as Date, 'MMM d, yyyy')
    }
  },
  {
    accessorKey: 'maintenance_technician',
    header: 'Tecnico'
  },
  {
    accessorKey: 'issuing_department',
    header: 'Departamento'
  },
  {
    id: 'actions',
    header: 'Acciones',
    cell: ({ row }) => {
      const { setSelectedLog } = useMaintenanceCtx()

      const viewLogDetails = () => {
        setSelectedLog(repository.MaintenanceLog.createFrom(row.original))
      }

      const deleteLog = () => {
        DeleteMaintenanceLog(row.original.id)
        setSelectedLog(null)
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={deleteLog}
              
            >
              Eliminar registro
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={viewLogDetails}>
              Ver detalles
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]
