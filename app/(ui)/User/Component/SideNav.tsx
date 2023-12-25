'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

export default function SideNav() {
  const pathName = usePathname()

  const [isOpen,setIsOpen] = useState(true)


  const toggleVisibility =()=>{
    setIsOpen(
      isOpen?false:true
    )
    
  }

  
  return (
    <div className='flex flex-col py-4 gap-3 '>
      <Link className={clsx(` w-full px-2 py-1 rounded-md `,{'bg-sky-300 ':pathName=== '/User/Dashboard'})} href='/User/Dashboard'>Dashboard</Link>
      <Link className={clsx(` w-full px-2 py-1 rounded-md `,{'bg-sky-300 ':pathName=== '/User/Projects'})}  href='/User/Projects'>Projects</Link>
      <div className='px-2 py-1' >
      <label htmlFor="school" onClick={toggleVisibility}>Create</label>
      <div>
       <div id='school'  className={clsx(`flex flex-col ease-in-out`,isOpen?'hidden':'block')}>
       
        <Link className={clsx(` w-full px-2 py-1 rounded-md `,{'bg-sky-300 ':pathName=== '/User/Create/Sonas'})} href="/User/Create/Sonas"  >
        SONAS</Link>
        <Link href='/User/Create/Sass'  className={clsx(` w-full px-2 py-1 rounded-md `,{'bg-sky-300 ':pathName=== '/User/Create/Sass'})} >SASS</Link>
       </div>
      </div>
      </div>
      <Link className={clsx(` w-full px-2 py-1 rounded-md `,{'bg-sky-300 ':pathName=== '/User/Profile'})}  href='/User/Profile'>Profile</Link>
      <Link className='px-2 py-1' href='/'>logout</Link>
    </div>

  )
}
