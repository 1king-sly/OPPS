'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { Icon } from 'next/dist/lib/metadata/types/metadata-types'
import { signOut } from 'next-auth/react'

export default function SideNav() {
  const pathName = usePathname()
  type link={
    name:string,
    href:string,
    icon?:Icon,
    onClick?:()=>void
  }

  const handleLogout = async () => {
    await signOut();
  };

  const links: link[] = [
    {
      name: 'Dashboard',
      href: '/Admin/Dashboard',
    },
    {
      name: 'Projects',
      href: '/Admin/Projects',
    },
    {
      name: 'Reviewed',
      href: '/Admin/Reviewed',
    },
    {
      name: 'Profile',
      href: '/Admin/Profile',
    },
    {
      name: 'Logout',
      href: '#',
      onClick: handleLogout
    },
  ];

  return (
    <div className='flex flex-col py-4 gap-3 '>
      {links.map((link) => (
        <div
          key={link.name}
          className={clsx(`w-full px-2 py-1 rounded-md`, {
            'bg-sky-300 ': pathName === link.href,
          })}
          onClick={link.onClick} 
        >
          {link.name}
        </div>
      ))}
    </div>
  );
}