import AtpAgent from '@atproto/api'
import { z } from 'zod'
import { ring2 } from 'ldrs'
import { useState } from 'react'

const AccountCreationValues = z.object({
  newPDSUrl: z.string(),
  newHandle: z.string(),
  newEmail: z.string(),
  newPassword: z.string(),
  newPasswordConfirm: z.string(),
  newInviteCode: z.string()
}).refine((values) => values.newPassword === values.newPasswordConfirm, { message: 'Passwords do not match', path: ['newPasswordConfirm'] })

interface ScreenAccountCreationProps {
  userDid: string
  oldPdsAgent: AtpAgent
  setNewPdsAgent: React.Dispatch<React.SetStateAction<AtpAgent | undefined>>
  setNewDid: React.Dispatch<React.SetStateAction<string>>
  setStep: React.Dispatch<React.SetStateAction<number>>
}

export default function ScreenAccountCreation({userDid, oldPdsAgent, setNewPdsAgent, setStep }: ScreenAccountCreationProps) {
  ring2.register()

  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [values, setValues] = useState<z.infer<typeof AccountCreationValues>>({
    newPDSUrl: '',
    newHandle: '',
    newEmail: '',
    newPassword: '',
    newPasswordConfirm: '',
    newInviteCode: '',
  })

  async function handleSubmit() {
    setIsLoading(true)
    setError('')

    const newAgent = new AtpAgent({ service: values.newPDSUrl })

    //Get service auth token from old PDS
    const describeRes = await newAgent.api.com.atproto.server.describeServer()
    const newServerDid = describeRes.data.did
    const serviceJwtRes = await oldPdsAgent.com.atproto.server.getServiceAuth({
      aud: newServerDid,
    })
    const serviceJwt = serviceJwtRes.data.token

    //Create new account
    await newAgent.api.com.atproto.server.createAccount(
      {
        handle: values.newHandle,
        email: values.newEmail,
        password: values.newPassword,
        did: userDid,
        inviteCode: values.newInviteCode,
      },
      {
        headers: { authorization: `Bearer ${serviceJwt}` },
        encoding: 'application/json',
      },
    )

    //Sign in to new account
    await newAgent.login({
      identifier: values.newHandle,
      password: values.newPassword,
    })

    if(newAgent.session?.did !== userDid) {
      setError('Could not authenticate with new PDS. Please ensure values are correct and try again.')
      setIsLoading(false)
      return
    }

    setNewPdsAgent(newAgent)

    //Proceed to next step
    setStep(3)
    setIsLoading(false)
  }

  return (
    <div className={`flex flex-col mx-auto`}>
      <div className={`mt-2 text-left border-green-500 bg-green-500/20 p-2 rounded-lg`}>
        <span>Your Current Information:</span>
        <ul className={`list-disc list-inside`}>
          <li>PDS URL: <strong>{`${oldPdsAgent.pdsUrl}`}</strong></li>
          <li>Handle: <strong>{`${oldPdsAgent.session?.handle}`}</strong></li>
          <li>DID: <strong>{userDid}</strong></li>
        </ul>
      </div>
      <div className={`flex flex-col space-y-4 mt-4`}>
        <span className={`text-sm`}>Now, create an account on the new PDS. Make sure you have the proper URL and an invite code available to you.</span>
        <div className={`flex flex-col space-y-1`}>
          <label htmlFor="new-pds" className={`text-md font-bold`}>
            New PDS URL
          </label>
          <input id="new-pds" className={`p-1 border-2 border-gray-400 rounded-lg text-black`} type="text" value={values.newPDSUrl} onChange={(e) => setValues({ ...values, newPDSUrl: e.target.value })} />
        </div>
        <div className={`flex flex-col space-y-1`}>
          <label htmlFor="new-pds" className={`text-md font-bold`}>
            Invite Code
          </label>
          <input id="invite-code" className={`p-1 border-2 border-gray-400 rounded-lg text-black`} type="text" value={values.newInviteCode} onChange={(e) => setValues({ ...values, newInviteCode: e.target.value })} />
        </div>
        <div className={`flex flex-col space-y-1`}>
          <label htmlFor="new-email" className={`text-md font-bold`}>
            New Email
          </label>
          <input id="new-email" className={`p-1 border-2 border-gray-400 rounded-lg text-black`} type="text" value={values.newEmail} onChange={(e) => setValues({ ...values, newEmail: e.target.value })} />
        </div>
        <div className={`flex flex-col space-y-1`}>
          <label htmlFor="new-handle" className={`text-md font-bold`}>
            New Handle
          </label>
          <input id="new-handle" className={`p-1 border-2 border-gray-400 rounded-lg text-black`} type="text" value={values.newHandle} onChange={(e) => setValues({ ...values, newHandle: e.target.value })} />
        </div>
        <div className={`flex flex-col space-y-1`}>
          <label htmlFor="new-password" className={`text-md font-bold`}>
            New Password
          </label>
          <input id="new-password" className={`p-1 border-2 border-gray-400 rounded-lg text-black`} type="password" value={values.newPassword} onChange={(e) => setValues({ ...values, newPassword: e.target.value })} />
        </div>
        <div className={`flex flex-col space-y-1`}>
          <label htmlFor="new-password-confirm" className={`text-md font-bold`}>
            New Password Confirm
          </label>
          <input id="new-password-confirm" className={`p-1 border-2 border-gray-400 rounded-lg text-black`} type="password" value={values.newPassword} onChange={(e) => setValues({ ...values, newPasswordConfirm: e.target.value })} />
        </div>
      </div>
      {error && 
        <div className={`mt-8 text-left text-red-500 border-red-500 bg-red-400/20 p-2 rounded-lg`}>
          <span>{error}</span>
        </div>
      }
      <button className={`bg-blue-500 hover:bg-blue-500/90 disabled:hover:bg-blue-500 disabled:opacity-60 text-white mt-8 w-full py-2 px-4 rounded`} onClick={() => handleSubmit()}>
      {isLoading ? (
          <l-ring-2
            size="24"
            stroke="3"
            stroke-length="0.25"
            bg-opacity="0.1"
            speed="0.8" 
            color="white"
          ></l-ring-2>
        ) : "Create Account"}
      </button>
    </div>
  )
}
