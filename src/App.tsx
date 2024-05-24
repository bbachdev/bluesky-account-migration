import { useState } from 'react'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

function App() {
  const [step, setStep] = useState(0)

  return (
    <div className={`bg-gray-800 text-white h-dvh flex flex-col`}>
      <Header />
      
      <Footer />
    </div>
  )
}

export default App
