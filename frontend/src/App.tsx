import RootLayout from './components/comp-436'
import useListSheets from './lib/list-sheets'

function App() {
  const { sheets, currentSheet } = useListSheets()
  return (
    <>
      <RootLayout />
      <ul className="flex absolute bottom-0 left-0 w-full bg-white  border-t-2">
        {sheets &&
          sheets.map((sheet, index) => (
            <li
              key={index}
              className={`${
                currentSheet === sheet ? 'bg-slate-200' : ''
              } px-3 py-0.5 border-b-4 border-green-600 w-max`}
            >
              <small className="text-sm font-medium leading-none">
                {sheet}
              </small>
            </li>
          ))}
      </ul>
    </>
  )
}

export default App
