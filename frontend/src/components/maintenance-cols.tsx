'use client'

import { MaintenanceLogFormValues } from '@/lib/schema-maintenance'
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

export const columns: ColumnDef<MaintenanceLogFormValues>[] = [
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
      const log = row.original

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
              onClick={() => navigator.clipboard.writeText(log.maintenance_number)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]
