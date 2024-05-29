import { useState } from 'react'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import ScreenDisclaimer from './components/screens/ScreenDisclaimer'
import Step from './components/layout/Step'
import ScreenAccountCreation from './components/screens/ScreenAccountCreation'
import AtpAgent from '@atproto/api'

const OLD_PDS_DEFAULT_URL = 'https://bsky.social'

function App() {
  const [step, setStep] = useState(0)
  const [oldPdsAgent, setOldPdsAgent] = useState<AtpAgent>(new AtpAgent({ service: OLD_PDS_DEFAULT_URL }))
  const [newPdsAgent, setNewPdsAgent] = useState<AtpAgent>()

  return (
    <div className={`bg-gray-800 text-white h-dvh flex flex-col`}>
      <Header />
      { step === 0 && <ScreenDisclaimer setStep={setStep} /> }
      { step === 1 && <Step currentStep={step} title="Create Account for New PDS"><ScreenAccountCreation oldAgent={oldPdsAgent} setOldPdsAgent={setOldPdsAgent} newAgent={newPdsAgent} newAgent={newPdsAgent} setNewPdsAgent={setNewPdsAgent}/></Step> }
      <Footer />
    </div>
  )
}

export default App
