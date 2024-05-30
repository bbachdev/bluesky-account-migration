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
    <div className={`flex flex-col items-center mt-8 h-full space-y-8 mx-auto`}>
      <p>
        Welcome! This Account Migration Assistant is a tool to help you migrate your Bluesky account from one Personal Data Server, aka PDS (e.g. the official "bsky.social" server) to another. This migration is a multi-step process, though before you begin, please ensure you have a proper invite code for the new server you wish to migrate to (or generate one, if you are the PDS owner).
      </p>
      <p className={`mr-auto text-sm`}>
          You can read more about the philosophy and advantages of migrating your account to a new server <a className={`text-blue-400`} href="https://bsky.social/about/blog/02-22-2024-open-social-web" target="_blank" rel="noreferrer">here</a>.
      </p>
      <div className={`border-2 border-red-500 bg-red-400/20 rounded-lg p-4 text-center`}>
        <p className={`text-left text-md flex flex-col`}>
          <span className={`flex flex-row items-center mb-4`}>
            <PiWarningFill size={28} className={`mr-2`} />
            <span className='text-xl'>Warning!</span>
          </span>
          <span>
            Using this Bluesky Account Migration Assistant may result in irreversible destructive changes to your account. Please review the following information carefully before proceeding, and ensure the server you are migrating to is hosted by either yourself, or an entity you trust. By continuing with this process, you acknowledge and accept any potential consequences, which may include but are not limited to loss of data, modification of account settings, or the "locking out" of your account. It's strongly recommended to have an understanding of the <a className={`text-blue-400`} href="https://github.com/bluesky-social/pds/blob/main/ACCOUNT_MIGRATION.md" target="_blank" rel="noreferrer">migration process itself</a> before proceeding.
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