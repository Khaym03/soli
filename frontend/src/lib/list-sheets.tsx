import { CurrentSheet, Sheets } from 'wailsjs/go/main/App'
import { EventsOff, EventsOn } from 'wailsjs/runtime'
import { useEffect, useState } from 'react'

const useListSheets = () => {
  const [sheets, setSheets] = useState<Array<string>>([])
  const [currentSheet, setCurrentSheet] = useState<string>('')

  const request = async () => {
    const sheets = await Sheets()
    const sourceSheet = await CurrentSheet()

    setSheets(sheets)
    setCurrentSheet(sourceSheet)
  }
  useEffect(() => {
    request()
  }, [])

  useEffect(() => {
    EventsOn('update_sheets', request)
    return () => {
      EventsOff('update_sheets')
    }
  }, [])

  return { sheets, currentSheet }
}

export default useListSheets
