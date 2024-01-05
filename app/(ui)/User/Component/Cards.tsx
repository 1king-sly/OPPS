import React from 'react'
import Card from './Card'
import { countUserAcceptedProjects, countUserPendingProjects, countUserRejectedProjects, countUserTotalProjects } from '@/app/lib/actions'
import { getServerSession } from 'next-auth'
import authOptions from '@/utils/authUptions'

export default async function  Cards() {
  const session =await getServerSession(authOptions)

  if(!session){
    return null
  }

  const total = await countUserTotalProjects(session?.id)
  const pending = await countUserPendingProjects(session?.id)
  const accepted = await countUserAcceptedProjects(session?.id)
  const rejected = await countUserRejectedProjects(session?.id)
  return (
    <>
    <div className='w-full h-48 flex gap-3 justify-around items-center'>
        <Card title='Total' number={total || 0}></Card>
        <Card title='Pending' number={pending || 0}></Card>
        <Card title='Accepted' number={accepted || 0}></Card>
        <Card title='Rejected' number={rejected|| 0}></Card>
    </div>
    </>
  )
}
