'use server'
import React from 'react';
import { getServerSession } from 'next-auth';
import Image from 'next/image'
import profile from '@/public/images/profile.png'
import { fetchSuperAdminUser, updateUser } from '@/app/lib/actions';
import {  redirect } from 'next/navigation';
import NotFound from './not-found';
import Button from '@/app/(ui)/Button';

export default async function Page({ params }: { params: { id: string } }) {  
    const userId = params.id
    
    const user = await fetchSuperAdminUser(userId)
    if(!user){
     return <NotFound/>
    }

  return (
    <>
       <div className='w-full h-full flex items-center justify-center '>
      <div className='shadow-lg rounded-md flex flex-col w-96 h-96  items-center justify-center'>
        <div className=' h-24 flex items-center justify-center  gap-4 px-2'>
          <Image className='h-20 w-20 rounded-full shadow-md' src={ profile} alt='profile'></Image>         
        </div>

        <form action={updateUser}>
        <div className=' gap-3 flex flex-col ' >
          <label >
          <input type="text"  className='bg-white outline-sky-400 px-2 py-1 rounded-md ' placeholder={user?.firstName + " " + user?.secondName} />
          <input type="text"  className='hidden ' value={userId} name='userId' />

          </label>
          <label >
          <input type="email" name='email' className='bg-white outline-sky-400 px-2 py-1 rounded-md ' placeholder={user?.email}/>

          </label>
          <label >
          <input type="text" name='registrationNumber' className='bg-white outline-sky-400 px-2 py-1 rounded-md ' placeholder={user?.registrationNumber}/>

          </label>
               <label>
                
                <select name='userType' className='bg-white outline-sky-400 px-2 py-1 rounded-md w-full'  required title='userType'>
                <option disabled value=''>
                  <p>{user?.userType}</p>
                  </option> 
                  <option value='ADMIN'>Admin</option>
                  <option value='STUDENT'>Student</option>
                  <option value='SUPERADMIN'>Super Admin</option>
                  <option value='MODERATOR'>External Moderator</option>
                </select>
              </label>

              <label>
                <select
                  name='school'
                  className='bg-white outline-sky-400 px-2 py-1 rounded-md w-full '
                  required
                  title='school'
                >
                  <option disabled value=''>
                    <p>{user?.school ||  'No school record'}</p> 
                  </option> 
                  <option value='SONAS'>SONAS</option>
                  <option value='SASS'>SASS</option>
                  <option value='SCI'>SCI</option>
                  <option value='MEDICINE'>MEDICINE</option>
                  <option value='ENGINEERING'>ENGINEERING</option>
                  <option value='LAW'>LAW</option>
                </select>
              </label>

          <label >
          <input type="text" name='password' className='bg-white outline-sky-400 px-2 py-1 rounded-md ' placeholder={user?.hashedPassword}/>

          </label>
        </div>
        <div className='mt-2 w-[236px] '>
        <Button type='submit' fullWidth>
          UPDATE USER
        </Button>
        </div>
       
        </form>
       
        
        


      </div>

      

    </div>
    </>
  );
}