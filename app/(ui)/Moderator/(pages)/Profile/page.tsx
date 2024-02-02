'use server'
import React from 'react'
import Image from 'next/image'
import profile from '@/public/images/profile.png'
import Button from '@/app/(ui)/Button'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/utils/authUptions'


export default async   function Page() {
  const data =await getServerSession(authOptions)
  return (
    <>
    <div className='w-full h-full flex items-center justify-center '>
      <div className='shadow-lg rounded-md flex flex-col w-96 h-96  items-center justify-center'>
        <div className=' h-24 flex items-center justify-center  gap-4 px-2'>
          <Image className='h-20 w-20 rounded-full shadow-md' src={ profile} alt='profile'></Image>         
        </div>

        <div className=' gap-3 flex flex-col ' >
          <label >
          <input type="text" disabled className='bg-white outline-sky-400 px-2 py-1 rounded-md ' placeholder={data?.firstName + " " + data?.secondName} />

          </label>
          <label >
          <input type="email" disabled className='bg-white outline-sky-400 px-2 py-1 rounded-md ' placeholder={data?.email}/>

          </label>
          <label >
          <input type="text" disabled className='bg-white outline-sky-400 px-2 py-1 rounded-md ' placeholder={data?.userType}/>
          </label>
          {data?.school !== null ?(
            <label >
            <input type="text" disabled className='bg-white outline-sky-400 px-2 py-1 rounded-md ' placeholder={data?.school}/>
          </label>
          ) :null}
        </div>
        <div className='mt-2 w-[236px] '>
        <Button type='submit' disabled fullWidth>
          SAVE
        </Button>
        </div>
       
        
        


      </div>

    </div>
    </>
  )
}
