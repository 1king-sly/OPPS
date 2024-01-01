'use client'
import React from 'react'
import Image from 'next/image'
import logo from '@/public/images/Mmust logo.png'
import { useSession } from 'next-auth/react'

export default function Header() {

  const {data: session} = useSession()

  console.log('Session:', session);

  let email, firstName, secondName, userType;

  if (session) {
    secondName = session.user.secondName;
    email = session.user.email;
    firstName = session.user.firstName;
    userType = session.user.userType;
  }
  return (
    <div className='w-full h-full flex items-center justify-around px-1 sm:px-4 lg:px-8 '>
      <div className='sm:w-1/4  flex justify-start   '>
        <Image src={logo} alt='logo' className=' object-cover h-16 w-16'></Image>
      </div>
      <div className='flex-1 flex justify-center   md:text-lg lg:text-xl text-sky-400 text-sm'>
        ONLINE PROJECT PROPOSAL SYSTEM
      </div>
      <div className='w-1/4 flex justify-end'><span className='text-sky-400'> {email} </span> </div>
    </div>
  )
}
