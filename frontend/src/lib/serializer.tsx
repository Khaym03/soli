import { useEffect, useMemo, useState } from 'react'
import { GetSerialValue } from 'wailsjs/go/main/App'
import { EventsOff, EventsOn } from 'wailsjs/runtime/runtime'

export function useSerealizer() {
  const [value, setValue] = useState(0)
  const request = async () => {
    const value = await GetSerialValue()
    setValue(value)
  }

  const serial = useMemo(() => {
    const nextValue = value + 1
    return `#MTN-${nextValue.toString().padStart(3, '0')}`
  }, [value])

  // let serial = ''

  useEffect(() => {
    EventsOn('update_maintenance_table', request)

    return () => {
      EventsOff('update_maintenance_table')
    }
  }, [])

  useEffect(() => {
    request()
  }, [])

  // if (value + 1 < 10) serial = `#MTN-00${value + 1}`
  // else if (value + 1 < 100) serial = `#MTN-0${value + 1}`
  // else serial = `#MTN-${value + 1}`

  return { serial }
}
