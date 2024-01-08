'use server'
import React from 'react'
import Image from 'next/image'
import logo from '@/public/images/Mmust logo.png'
import { getSession, useSession } from 'next-auth/react'
import authOptions from '@/utils/authUptions'
import { getServerSession } from 'next-auth'
import { fetchUser } from '@/app/lib/actions'
import { redirect } from 'next/navigation'

export default async  function Header() {


  const session = await getServerSession()
  if(!session){
    redirect('/')
  }
  const email = session.user.email


  const data =await fetchUser(email)


  if(!data){
    return null
  }
  return (
    <div className='w-full h-full flex items-center justify-around px-1 sm:px-4 lg:px-8 '>
      <div className='sm:w-1/4  flex justify-start   '>
        <Image src={logo} alt='logo' className=' object-cover h-16 w-16'></Image>
      </div>
      <div className='flex-1 flex justify-center   md:text-lg lg:text-xl text-sky-400 text-sm'>
        ONLINE PROJECT PROPOSAL SYSTEM
      </div>
      <div className='w-1/4 flex justify-end'><span className='text-sky-400'> {data?.firstName } </span> </div>
    </div>
  )
}
