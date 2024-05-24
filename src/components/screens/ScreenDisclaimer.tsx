import { Dispatch, SetStateAction, useState } from 'react'
import { PiWarningFill } from "react-icons/pi";

interface ScreenDisclaimerProps {
  setStep: Dispatch<SetStateAction<number>>
}

export default function ScreenDisclaimer( { setStep }: ScreenDisclaimerProps ) {
  const [ackBoxChecked, setAckBoxChecked] = useState(false)

  function userConfirm() {
    setStep(1)
  }
  return (
    <div className={`flex flex-col items-center justify-center h-full space-y-8`}>
      <div className={`border-2 border-red-500 bg-red-400/20 rounded-lg p-4 text-center w-1/3`}>
        <p className={`text-left text-md flex flex-col`}>
          <span className={`flex flex-row items-center mb-4`}>
            <PiWarningFill size={28} className={`mr-2`} />
            <span className='text-xl'>Warning!</span>
          </span>
          <span>
            Using this Bluesky Account Migration Assistant may result in irreversible changes to your account. Please review the following information carefully before proceeding. By continuing with this application, you acknowledge and accept the potential consequences, which may include but are not limited to loss of data, modification of account settings, or termination of your account. We strongly recommend that you back up any important data prior to using the Bluesky Account Migration Assistant.
            <br/><br/>Please note that this Bluesky Account Migration Assistant is not affiliated with Bluesky itself, the AtProtocol development team, or any related entity. The use of this application is at your own risk, and neither Bluesky, its affiliates, nor the application maintainer assume any liability for any damage or loss that may result from using it.
          </span>
        </p>
      </div>
      <div className={`flex flex-row items-center justify-center`}>
        <input type="checkbox" className={`w-4 h-4 rounded-sm`} checked={ackBoxChecked} onChange={(e) => setAckBoxChecked(e.target.checked)} />
        <span className={`ml-2 text-sm`}>I acknowledge that I am aware of the risks and have read and understood the above warning.</span>
      </div>
      <button className={`bg-blue-500 hover:bg-blue-500/90 disabled:hover:bg-blue-500 disabled:opacity-60 text-white py-2 px-4 rounded`} onClick={userConfirm} disabled={!ackBoxChecked}>Confirm</button>
    </div>
  )
}