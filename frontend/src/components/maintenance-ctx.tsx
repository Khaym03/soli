import { repository } from '@/go/models'
import React from 'react'

type MaintenanceCtx = {
  selectedLog: repository.MaintenanceLog | null
  setSelectedLog: (log: repository.MaintenanceLog | null) => void
}

export const MaintenanceCtx = React.createContext<MaintenanceCtx>({
  selectedLog: null,
  setSelectedLog: () => {}
})

const MaintenanceCtxProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const [selectedLog, setSelectedLog] =
    React.useState<repository.MaintenanceLog | null>(null)

  return (
    <MaintenanceCtx.Provider value={{ selectedLog, setSelectedLog }}>
      {children}
    </MaintenanceCtx.Provider>
  )
}

export function useMaintenanceCtx() {
  const ctx = React.useContext(MaintenanceCtx)
  if (ctx === undefined) {
    throw new Error(
      'useMaintenanceCtx must be used within a MaintenanceCtxProvider'
    )
  }
  return ctx
}

export default MaintenanceCtxProvider
