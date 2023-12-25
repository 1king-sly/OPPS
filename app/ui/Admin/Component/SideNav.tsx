'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { Icon } from 'next/dist/lib/metadata/types/metadata-types'

export default function SideNav() {
  const pathName = usePathname()
  type link={
    name:string,
    href:string,
    icon?:Icon,
  }

  const links:link[]=[{
    name:'Dashboard',
    href:'/ui/Admin/Dashboard'
  },{
    name:'Projects',
    href:'/ui/Admin/Projects'
  },{
    name:'Reviewed',
    href:'/ui/Admin/Reviewed'
  },{
    name:'Profile',
    href:'/ui/Admin/Profile'
  },{
    name:'Logout',
    href:'#'
  }]
  
  return (
    <div className='flex flex-col py-4 gap-3 '>
 
      {links.map((link)=>{
        return(
          <Link className={clsx(` w-full px-2 py-1 rounded-md `,{'bg-sky-300 ':pathName=== link.href})} key={link.name} href={link.href}>{link.name} </Link>
        )
      })}
    </div>

  )
}
