import React from 'react'
import Image from 'next/image'
import logo from '@/public/images/Mmust logo.png'

export default function Header() {
  return (
    <div className='w-full h-full flex items-center justify-around px-1 sm:px-4 lg:px-8 '>
      <div className='sm:w-1/4 max-[425px]:w-1/6 flex justify-start   '>
        <Image src={logo} alt='logo' className=' object-cover h-16 w-16 max-[325px]:w-10 max-[325px]:h-10 max-[425px]:w-12 max-[425px]:h-12'></Image>
      </div>
      <div className='flex-1 flex justify-center   md:text-lg lg:text-xl text-sky-400 text-sm max-[425px]:text-xs '>
        ONLINE PROJECT PROPOSAL SYSTEM
      </div>
      <div className='w-1/4 max-[400px]:hidden max-[425px]:text-xs flex justify-end'>Hello,<span className='text-sky-400'>Byrone</span> </div>
    </div>
  )
}
