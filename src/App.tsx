import { useState } from 'react'
import Header from './components/layout/Header'

function App() {
  const [step, setStep] = useState(0)

  return (
    <div className={`bg-gray-800 text-white h-dvh`}>
      <Header />
    </div>
  )
}

export default App
