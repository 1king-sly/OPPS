'use server'
import React from 'react'
import Image from 'next/image'
import logo from '@/public/images/Mmust logo.png'

export default async  function Header() {

  return (
    <div className='w-full h-full flex items-center justify-around px-2 sm:px-4 lg:px-8 '>
      <div className='sm:w-1/4  flex justify-start   '>
        <Image src={logo} alt='logo' className=' object-cover h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 lg:h-16 lg:w-16'></Image>
      </div>
      <div className='flex-1 flex justify-center   md:text-lg lg:text-xl text-sky-400 text-xs'>
        ONLINE PROJECT PROPOSAL SYSTEM
      </div>
      <div className='w-1/4 flex justify-end max-[420px]:hidden md:text-lg lg:text-xl text-xs'><span className='text-sky-400'> Guest </span> </div>
    </div>
  )
}
