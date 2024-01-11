import React from 'react'
import Card from './Card'
import { countAllProjects, countAdmin, countUsers } from '@/app/lib/actions'
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';


export default async function Cards() {
  const session = await getServerSession()
  if(!session){
    redirect('/')
  }
  
  const total = await countAllProjects()
  const admins = await countAdmin()
  const users = await countUsers()


  return (
    <>
    <div className='w-full h-48 flex gap-3 justify-around items-center'>
        <Card title='Students' number={users || 0}></Card>
        <Card title='Admins' number={admins || 0}></Card>
        <Card title='Projects' number={total || 0}></Card>
    </div>
    </>
  )
}






