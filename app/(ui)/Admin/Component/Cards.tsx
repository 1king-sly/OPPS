import React from 'react'
import Card from './Card'
import { countPendingProjects,countAllProjects,countReviewedProjects } from '@/app/lib/actions'
import { getServerSession } from 'next-auth';
import authOptions from '@/utils/authUptions'


export default async function Cards() {
  const session = await getServerSession(authOptions);

  if(!session){
    return null
  }

  const pending = await countPendingProjects(session?.id)
  const total = await countAllProjects(session?.id)
  const reviewed = await countReviewedProjects(session?.id)


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






