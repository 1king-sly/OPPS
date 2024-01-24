'use server'
import React from 'react';
import { getServerSession } from 'next-auth';
import {  createUser } from '@/app/lib/actions';
import {  redirect } from 'next/navigation';
import Button from '@/app/(ui)/Button';

export default async function Page() {

  const session = await getServerSession()
  if(!session){
    redirect('/')
  }
  
    
    
    
 
  return (
    <>
       <div className='w-full h-full flex items-center justify-center '>
      <div className='shadow-lg rounded-md flex flex-col w-96 h-96  items-center justify-center gap-2 '>
        <div>
            <h1>Fill in the user Details</h1>
        </div>
        <form action={createUser}>
        <div className=' gap-3 flex flex-col ' >
          <label >
          <input type="text"  className='bg-white outline-sky-400 px-2 py-1 rounded-md' placeholder='First Name' name='firstName' required />

          </label>
          <label >
          <input type="text"  className='bg-white outline-sky-400 px-2 py-1 rounded-md ' placeholder='Second Name' name='secondName' required />

          </label>
          <label >
          <input type="email" name='email' className='bg-white outline-sky-400 px-2 py-1 rounded-md ' placeholder='Email address' required/>

          </label>
          <label >
          <input type="text" name='registrationNumber' className='bg-white outline-sky-400 px-2 py-1 rounded-md ' placeholder='Registration Number' required/>

          </label>
          <label>
                <select
                  name='userType'
                  className='bg-white outline-sky-400 px-2 py-1 rounded-md w-full '
                  required
                  title='userType'
                >
                  <option value='ADMIN'>Admin</option>
                  <option value='STUDENT'>Student</option>
                  <option value='SUPERADMIN'>Super Admin</option>
                </select>
              </label>

              <label>
                <select
                  name='school'
                  className='bg-white outline-sky-400 px-2 py-1 rounded-md w-full '
                  required
                  title='school'
                >
                  <option value='SONAS'>SONAS</option>
                  <option value='SASS'>SASS</option>
                  <option value='SCI'>SCI</option>
                  <option value='MEDICINE'>MEDICINE</option>
                  <option value='ENGINEERING'>ENGINEERING</option>
                  <option value='LAW'>LAW</option>
                </select>
              </label>
          <label >
          <input type="text" name='password' className='bg-white outline-sky-400 px-2 py-1 rounded-md ' placeholder='Password' required/>

          </label>
        </div>
        <div className='mt-2 w-[236px] '>
        <Button type='submit' fullWidth>
          CREATE USER
        </Button>
        </div>
       
        </form>
       
        
        


      </div>

    </div>
    </>
  );
}