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
      <div className='shadow-lg rounded-md flex flex-col w-2/3 h-2/3  items-center justify-center gap-2'>
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
          <label >
          <input type="text" name='userType' className='bg-white outline-sky-400 px-2 py-1 rounded-md ' placeholder='User Type' required />

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