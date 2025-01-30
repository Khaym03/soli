import { useState } from 'react'
import { Greet } from '../wailsjs/go/main/App'

function App() {
  const [resultText, setResultText] = useState(
    'Please enter your name below 👇'
  )
  const [name, setName] = useState('')
  const updateName = (e: any) => setName(e.target.value)
  const updateResultText = (result: string) => setResultText(result)

  function greet() {
    Greet(name).then(updateResultText)
  }

  return (
    <div
      className="text-bold text-center text-3xl text-white
        "
    >
      test
    </div>
  )
}

export default App
