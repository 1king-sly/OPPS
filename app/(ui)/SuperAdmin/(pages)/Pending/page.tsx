'use server'
import React from 'react'
import Image from 'next/image'
import profile from '@/public/images/profile.png'
import { fetchPreusers } from '@/app/lib/actions'
import Validate from '../../Component/Validate'


export default async   function Page({searchParams}:{searchParams:string}) {
  const params = new URLSearchParams(searchParams);
  const q = params.get('query') || '';
  const users =await fetchPreusers(q)
  return (
    <>
    <div className='w-full h-full flex items-center justify-around gap-3 flex-wrap '>
        {users?.map((user)=>(
            <div className='shadow-lg rounded-md flex flex-col w-96 h-96  items-center justify-center' key={user.id}>
            <div className=' h-24 flex items-center justify-center  gap-4 px-2'>
              <Image className='h-20 w-20 rounded-full shadow-md' src={ profile} alt='profile'></Image>         
            </div>
    
            <div className=' gap-3 flex flex-col ' >
              <label >
              <input type="text" disabled className='bg-white outline-sky-400 px-2 py-1 rounded-md ' placeholder={user?.firstName} />    
              </label>
              <label>
              <input type="text" disabled className='bg-white outline-sky-400 px-2 py-1 rounded-md ' placeholder={user?.secondName} />
              </label>
              <label >
              <input type="email" disabled className='bg-white outline-sky-400 px-2 py-1 rounded-md ' placeholder={user?.email}/>
    
              </label>
              <label >
              <input type="text" disabled className='bg-white outline-sky-400 px-2 py-1 rounded-md ' placeholder={user?.registrationNumber}/>
    
              </label>
              <label >
              <input type="text" disabled className='bg-white outline-sky-400 px-2 py-1 rounded-md ' placeholder={user?.userType}/>
              </label>
              <Validate email={user?.email} registrationNumber={user?.registrationNumber} firstName={user?.firstName} secondName={user?.secondName} userType={user?.userType} hashedPassword={user?.hashedPassword} />
            </div>
          </div>
        ))}

    </div>
    </>
  )
}
