import React from 'react'
import Card from './Card'
import { countUserAcceptedProjects, countUserPendingProjects, countUserRejectedProjects, countUserTotalProjects, fetchUser } from '@/app/lib/actions'
import { getServerSession } from 'next-auth'
import authOptions from '@/utils/authUptions'
import { redirect } from 'next/navigation'

export default async function  Cards() {
  const session = await getServerSession()
  if(!session){
    redirect('/')
  }
  const email = session.user.email


  const data =await fetchUser(email)

  const total = await countUserTotalProjects(data?.id)
  const pending = await countUserPendingProjects(data?.id)
  const accepted = await countUserAcceptedProjects(data?.id)
  const rejected = await countUserRejectedProjects(data?.id)
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
