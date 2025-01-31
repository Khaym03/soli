// import { useState } from 'react'
// import { Greet } from '../wailsjs/go/main/App'
// import { Button } from '@/components/ui/button'
import { MaterialsRequestForm } from './components/mat-request-form'

function App() {
  // const [resultText, setResultText] = useState(
  //   'Please enter your name below 👇'
  // )
  // const [name, setName] = useState('')
  // const updateName = (e: any) => setName(e.target.value)
  // const updateResultText = (result: string) => setResultText(result)

  // function greet() {
  //   Greet(name).then(updateResultText)
  // }

  return (
    <section className="flex justify-center items-center w-full py-10 min-h-screen overflow-x-hidden ">
      <MaterialsRequestForm />
    </section>
  )
}

export default App
