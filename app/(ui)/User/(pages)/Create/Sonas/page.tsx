import React, { useState } from 'react';
import Image from 'next/image';
import logo from '@/public/images/Mmust logo.png';
import Button from '@/app/(ui)/Button';
import Question from '../Question';
import axios from 'axios';
import { getSession, useSession } from 'next-auth/react';
import authOptions from '@/utils/authUptions';
import { getServerSession } from 'next-auth';
import { addProject, fetchUser } from '@/app/lib/actions';
import { redirect } from 'next/navigation';

export default async  function Page() {
  const session = await getServerSession()
  if(!session){
    redirect('/')
  }
  const SessionEmail = session.user.email


  const data =await fetchUser(SessionEmail)



 
   const  email = data?.email

  return (
    <>
      <div className='w-full min-h-screen flex flex-col items-center justify-center pb-40'>
        <div className='flex flex-col items-center'>
          <Image src={logo} alt='logo' className='h-24 w-24 object-cover'></Image>
          <h3 className='text-sky-300'>APPLIED SCIENCES PROJECT PROPOSAL</h3>
        </div>

        <div>
          <form action={addProject} className='w-[80vw] flex flex-col gap-2' >
            <div className='w-full flex justify-center'>
              <textarea
                name="title"
                id="title"
                title='title'
                placeholder='Project Title'
                className='resize-none p-2 h-10 w-96 flex items-center rounded-md outline-sky-200 overflow-hidden'
                maxLength={50}
              ></textarea>
             <input type="text" name='email' title='id' value={email} className='sr-only' />
             <input type="text" name='schoolFromFormData' title='school' value='SONAS' className='sr-only' />
            </div>

            

            <div className='gap-2 flex flex-col'>
        <Question
          number='a'
          id='Question 1'
          max={3000}
          question=' Problem identification and background/Needs assessment'
          instructions='What issue/challenge/gap does the project aim to address? The objectives should be clear, measureable, realistic and achievable within the duration of the project. For each objective, define appropriate indicators for measuring achievement (including a unit of measurement, baseline value and target value)'          
          name='ans1'  
        />
        <Question
          number='b'
          id='Question 2'
          max={2400}
          question=' Research Purpose and anticipated results'
          name='ans2'
        />
        <Question
          number='c'
          id='Question 3'
          max={3000}
          question='Project Design and Methodology'
          instructions='Outline the approach and methodology behind the project. Explain why they are the most suitable for achieving the project’s objectives.'
          name='ans3'
          
        />
        <Question
          number='d'
          id='Question 4'
          max={3000}
          question=' Gender Equality, Equity, and Inclusion considerations'
          name='ans4'
        />
      </div>

            <div className='w-full flex justify-end'>
              <Button type='submit' >Submit</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}


