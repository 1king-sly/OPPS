import React from 'react'
import Card from './Card'
import { countPendingUsers, countAdmin, countUsers } from '@/app/lib/actions'

export default async function Cards() {  
  const total = await countPendingUsers()
  const admins = await countAdmin()
  const users = await countUsers()


  return (
    <>
    <div className='w-full h-48 flex gap-3 justify-around items-center'>
        <Card title='Students' number={users || 0}></Card>
        <Card title='Admins' number={admins || 0}></Card>
        <Card title='Pending' number={total || 0}></Card>
    </div>
    </>
  )
}






