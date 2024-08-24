'use server'
import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '@/utils/authUptions'
import Create from '../../Component/Create'
import NotFound from '../Drafts/[id]/not-found'

export default async function page() {
  const user = await getServerSession(authOptions)

  if(!user){
    return <NotFound/>
  }

  const userStatus = user.status
  return (
<>
{userStatus !== 'ACTIVE' ?(
  
  <div className='w-full h-full flex items-center justify-center' >
    <p> Your Account has been Deactivated, kindly consult with the Admin </p>
  </div>

):(
  <Create/>
)

}

</>
  )
}
