import { useState } from 'react'
import { z } from 'zod'

const AccountCreationValues = z.object({
  oldPDSUrl: z.string(),
  oldHandle: z.string(),
  oldPassword: z.string(),
  newPDSUrl: z.string(),
  newHandle: z.string(),
  newEmail: z.string(),
  newPassword: z.string(),
  newInviteCode: z.string()
})

export default function ScreenAccountCreation() {
  const [jwt, setJwt] = useState('')
  const [values, setValues] = useState<z.infer<typeof AccountCreationValues>>({
    oldPDSUrl: 'https://bsky.social',
    oldHandle: '',
    oldPassword: '',
    newPDSUrl: '',
    newHandle: '',
    newEmail: '',
    newPassword: '',
    newInviteCode: ''
  })

  function authenticate() {
    console.log('Attempt login')
    //TODO: Attempt login
    const res = {}
    if(res){
      setJwt('1')
    } 
  }

  return (
    <div className={`px-4`}>
      <div className={`flex flex-col space-y-4`}>
        <span className={`text-sm`}>In order to migrate your account, you will need to authenticate with your old PDS. This will allow the migration assistant to use the signing key associated with your current DID.</span>
        <div className={`flex flex-col space-y-1`}>
          <label htmlFor="old-pds" className={`text-md font-bold`}>
            Old PDS URL <span className={`text-xs`}>(default is "bsky.social")</span>
          </label>
          <input id="old-pds" className={`p-1 border-2 border-gray-400 rounded-lg text-black`} type="text" placeholder="Enter your new PDS invite code here" value={values.oldPDSUrl} onChange={(e) => setValues({ ...values, oldPDSUrl: e.target.value })} />
        </div> 
      
        <div className={`flex flex-col space-y-1`}>
          <label htmlFor="old-handle" className={`text-md font-bold`}>
            Current Handle
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
      <button className={`bg-blue-500 hover:bg-blue-500/90 disabled:hover:bg-blue-500 disabled:opacity-60 text-white mt-8 w-full py-2 px-4 rounded`} onClick={() => authenticate()}>Authenticate</button>
      { jwt && 
        <>
          <div className={`flex flex-col space-y-4 mt-8`}>
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
          </div>
          <button className={`bg-blue-500 hover:bg-blue-500/90 disabled:hover:bg-blue-500 disabled:opacity-60 text-white mt-8 w-full py-2 px-4 rounded`} onClick={() => console.log(values)}>Create Account</button>
        </>  
      }
    </div>
  )
}