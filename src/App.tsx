import { useState } from 'react'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import ScreenDisclaimer from './components/screens/ScreenDisclaimer'
import Step from './components/layout/Step'
import ScreenAuth from './components/screens/ScreenAuth'
import AtpAgent from '@atproto/api'
import ScreenAccountCreation from './components/screens/ScreenAccountCreation'

const OLD_PDS_DEFAULT_URL = 'https://bsky.social'

function App() {
  const [step, setStep] = useState(1)
  const [oldPdsAgent, setOldPdsAgent] = useState<AtpAgent>(new AtpAgent({ service: OLD_PDS_DEFAULT_URL }))
  const [userDid, setUserDid] = useState('')
  const [newDid, setNewDid] = useState('')
  const [newPdsAgent, setNewPdsAgent] = useState<AtpAgent | undefined>()

  return (
    <div className={`bg-gray-800 text-white h-dvh flex flex-col`}>
      <Header />
      { step === 0 && <div className={`flex flex-col items-center h-full max-w-[1440px] px-8 mx-auto`}><ScreenDisclaimer setStep={setStep}/></div> }
      { step === 1 && <Step currentStep={step} title="Sign In to Current Account"><ScreenAuth oldAgent={oldPdsAgent} setOldPdsAgent={setOldPdsAgent} setUserDid={setUserDid} setStep={setStep}/></Step> }
      { step === 2 && <Step currentStep={step} title="Create Account on New PDS"><ScreenAccountCreation oldPdsAgent={oldPdsAgent} userDid={userDid} setNewPdsAgent={setNewPdsAgent} setNewDid={setNewDid} setStep={setStep}/></Step> }
      <Footer />
    </div>
  )
}

export default App
