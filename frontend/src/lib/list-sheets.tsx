import { CurrentSheet, Sheets } from 'wailsjs/go/main/App'
import { useEffect, useState } from 'react'

const useListSheets = () => {
  const [sheets, setSheets] = useState<Array<string>>([])
  const [currentSheet, setCurrentSheet] = useState<string>('')

  useEffect(() => {
    const request = async () => {
      const sheets = await Sheets()
      setSheets(sheets)

      setCurrentSheet(await CurrentSheet())
    }
    request()
  }, [])

  return { sheets, currentSheet }
}

export default useListSheets
