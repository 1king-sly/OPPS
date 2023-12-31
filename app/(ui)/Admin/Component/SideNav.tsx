'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { HomeIcon,FolderIcon,UserIcon,ArrowRightEndOnRectangleIcon, CheckIcon } from '@heroicons/react/24/outline'

export default function SideNav() {
  const pathName = usePathname()
  
  const links=[{
    name:'Home',
    href:'/Admin/Dashboard',
    icon:HomeIcon
  },{
    name:'Projects',
    href:'/Admin/Projects',
    icon:FolderIcon

  },{
    name:'Projects Review',
    href:'/Admin/Reviewed',
    icon:CheckIcon

  },{
    name:'Profile',
    href:'/Admin/Profile',
    icon:UserIcon

    
  },{
    name:'Logout',
    href:'#',
    icon:ArrowRightEndOnRectangleIcon

  }]
  
  return (
    <div className='flex flex-col py-4 gap-3 '>
 
      {links.map((link)=>{
        const LinkIcon = link.icon
        return(
          <Link className={clsx(` w-full px-2 py-1 rounded-md flex h-12  items-center justify-center text-sm text-gray-800 hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 gap-2 `,{'bg-sky-100 text-blue-600 ':pathName=== link.href})} key={link.name} href={link.href}>
            <LinkIcon className='w-6'></LinkIcon>
            <p className='hidden  lg:block text-xs'>{link.name} </p>
          </Link>
        )
      })}
    </div>

  )
}
