import { useEffect, useState } from 'react'
import { repository } from 'wailsjs/go/models'
import { GetMaintenanceLogs } from 'wailsjs/go/main/App'
import { EventsOff, EventsOn } from 'wailsjs/runtime/runtime'

export function useMaintenanceLogs() {
  const [maintenanceLogs, setMaintenanceLogs] = useState<
    repository.MaintenanceLog[]
  >([])

  useEffect(() => {
    const request = async () => {
      const maintenanceLogs = await GetMaintenanceLogs()
      setMaintenanceLogs(maintenanceLogs ?? [])
    }

   EventsOn('update_maintenance_table', () => {
      request()
    })

    return () => {
      EventsOff('update_maintenance_table')
    }
    // request()
  }, [])

  return { maintenanceLogs }
}
