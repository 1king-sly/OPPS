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
      <Link className={clsx(` w-full px-2 py-1 rounded-md `,{'bg-sky-300 ':pathName=== '/ui/Dashboard/{pages}/Dashboard'})} href='/ui/Dashboard/Profile'>Dashboard</Link>
      <Link className={clsx(` w-full px-2 py-1 rounded-md `,{'bg-sky-300 ':pathName=== '/ui/Dashboard/Projects'})}  href='/'>Projects</Link>
      <Link className='px-2 py-1' href='#'>
      <label htmlFor="school" onClick={toggleVisibility}>Create</label>
      <div>
       <select  name='school' id='school' title='school' className={isOpen?'hidden':'block'}>
        <option className={clsx(` w-full px-2 py-1 rounded-md `,{'bg-sky-300 ':pathName=== '/ui/Dashboard/Create/Sonas'})}  value="">SONAS</option>
        <option  className={clsx(` w-full px-2 py-1 rounded-md `,{'bg-sky-300 ':pathName=== '/ui/Dashboard/Create/Sass'})} value="">SASS</option>
       </select>
      </div>
      </Link>
      <Link className={clsx(` w-full px-2 py-1 rounded-md `,{'bg-sky-300 ':pathName=== '/ui/Dashboard/Profile'})}  href='/'>Profile</Link>
      <Link className='px-2 py-1' href='/'>logout</Link>
    </div>

  )
}
