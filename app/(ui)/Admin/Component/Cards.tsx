import React from 'react'
import Card from './Card'
import { countPendingProjects,countAllProjects,countReviewedProjects,fetchUser } from '@/app/lib/actions'
import { getServerSession } from 'next-auth';
import authOptions from '@/utils/authUptions'
import { redirect } from 'next/navigation';


export default async function Cards() {
  const session = await getServerSession()
  if(!session){
    redirect('/')
  }
  const email = session.user.email


  const data =await fetchUser(email)

  const pending = await countPendingProjects(data?.id)
  const total = await countAllProjects(data?.id)
  const reviewed = await countReviewedProjects(data?.id)


  return (
    <>
    <div className='w-full h-48 flex gap-3 justify-around items-center'>
        <Card title='Total' number={total || 0}></Card>
        <Card title='Pending' number={pending || 0}></Card>
        <Card title='Reviewed' number={reviewed || 0}></Card>
    </div>
    </>
  )
}






