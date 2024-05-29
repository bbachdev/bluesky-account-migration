import AtpAgent from '@atproto/api'
import { useState } from 'react'
import { z } from 'zod'
import { ring2 } from 'ldrs'

const AuthValues = z.object({
  oldPDSUrl: z.string(),
  oldHandle: z.string(),
  oldPassword: z.string(),
})

interface ScreenAuthProps {
  oldAgent: AtpAgent
  setOldPdsAgent: React.Dispatch<React.SetStateAction<AtpAgent>>
  setUserDid: React.Dispatch<React.SetStateAction<string>>
}

export default function ScreenAuth({ oldAgent, setOldPdsAgent, setUserDid }: ScreenAuthProps) {
  ring2.register()

  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [values, setValues] = useState<z.infer<typeof AuthValues>>({
    oldPDSUrl: 'https://bsky.social',
    oldHandle: '',
    oldPassword: '',
  })

  async function authenticate() {
    setIsLoading(true)
    setError('')
    //Create old PDS agent
    setOldPdsAgent(new AtpAgent({ service: values.oldPDSUrl }))

    await oldAgent.login({ identifier: values.oldHandle, password: values.oldPassword }).then(() => {
      const accountDid = oldAgent.session?.did
      if (!accountDid) {
        setError('Could not authenticate with old PDS. Please ensure values are correct.')
        setIsLoading(false)
      }else{
        setUserDid(accountDid)
        setIsLoading(false)
      }
      setIsLoading(false)
    }).catch(() => {
      setError('Could not authenticate with old PDS. Please ensure values are correct.')
      setIsLoading(false)
    })
  }

  return (
    <div className={`px-4`}>
      <div className={`flex flex-col space-y-4`}>
        <span className={`text-sm`}>In order to migrate your account, you will need to authenticate with your old PDS. This will allow the migration assistant to use the signing key associated with your current DID to properly create your new account.</span>
        <div className={`flex flex-col space-y-1`}>
          <label htmlFor="old-pds" className={`text-md font-bold`}>
            Old PDS URL <span className={`text-xs`}>(default is "bsky.social")</span>
          </label>
          <input id="old-pds" className={`p-1 border-2 border-gray-400 rounded-lg text-black`} type="text" placeholder="Enter your new PDS invite code here" value={values.oldPDSUrl} onChange={(e) => setValues({ ...values, oldPDSUrl: e.target.value })} />
        </div> 
      
        <div className={`flex flex-col space-y-1`}>
          <label htmlFor="old-handle" className={`text-md font-bold`}>
            Current Handle <span className={`text-xs`}>(without @ sign)</span>
          </label>
          <input id="old-handle" className={`p-1 border-2 border-gray-400 rounded-lg text-black`} type="text" value={values.oldHandle} onChange={(e) => setValues({ ...values, oldHandle: e.target.value })} />
        </div>

        <div className={`flex flex-col space-y-1`}>
          <label htmlFor="old-password" className={`text-md font-bold`}>
            Current Password
          </label>
          <input id="old-password" className={`p-1 border-2 border-gray-400 rounded-lg text-black`} type="password" value={values.oldPassword} onChange={(e) => setValues({ ...values, oldPassword: e.target.value })} />
        </div>
      </div>
      {error && 
      <div className={`mt-8 text-left text-red-500 border-red-500 bg-red-400/20 p-2 rounded-lg`}>
        <span>Could not authenticate with old PDS. Please ensure values are correct and try again.</span>
      </div>
      }
      <button className={`bg-blue-500 hover:bg-blue-500/90 disabled:hover:bg-blue-500 disabled:opacity-60 text-white mt-8 w-full py-2 px-4 rounded flex justify-center`} onClick={() => authenticate()}>
        {isLoading ? (
          <l-ring-2
            size="24"
            stroke="3"
            stroke-length="0.25"
            bg-opacity="0.1"
            speed="0.8" 
            color="white"
          ></l-ring-2>
        ) : "Authenticate"}
      </button>
    </div>
  )
}