import React from 'react'
import Card from './Card'
import { countPendingProjects,countAllProjects,countReviewedProjects } from '@/app/lib/actions'
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';


export default async function Cards() {
  const session = await getServerSession()
  if(!session){
    redirect('/')
  }
  
  const pending = await countPendingProjects()
  const total = await countAllProjects()
  const reviewed = await countReviewedProjects()


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






