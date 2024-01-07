'use server'

import React from 'react';
import { getServerSession } from 'next-auth';
import authOptions from '@/utils/authUptions';
import {  fetchSingleProject,  fetchUser,  updateProject } from '@/app/lib/actions';
import { notFound } from 'next/navigation';
import NotFound from './not-found';

export default async function Page({params}) {

  const session = await getServerSession()
  if(!session){
    return null
  }
  const email = session.user.email


  const data =await fetchUser(email)
    const userId = data?.id
    const projectId = params.id
    const project = await fetchSingleProject(userId,projectId)


    if(!project){
      <NotFound/>
    }

    
 
  return (
    <>
      <div className='w-full min-h-screen flex flex-col items-center justify-center pb-40 mt-4'>
        <div className='flex flex-col items-center'>
          <div className='w-5/6 mx-auto flex flex-col text-black gap-10'>
            <div>
            <div className='  px-4'>
                <div className='w-full flex  justify-center font-semibold'>Problem identification and background/Needs assessment</div>
                <div className=' text-sm'>What issue/challenge/gap does the project aim to address? The objectives should be clear, measureable, realistic and achievable within the duration of the project. For each objective, define appropriate indicators for measuring achievement (including a unit of measurement, baseline value and target value)</div>
            </div>
            <div className='mt-2  px-4 bg-gray-100 py-2 font-thin '>
              <p className=' text-md'>{project?.ans1} </p>
            </div>
            </div>
            <div>
            <div className='  px-4'>
                <div className='w-full flex  justify-center font-semibold'>Research Purpose and anticipated results</div>
              
            </div>
            <div className='mt-2  px-4 bg-gray-100 py-2 font-thin '>
              <p className=' text-md'>{project?.ans2} </p>
            </div>
            </div>
            <div>
            <div className='  px-4'>
                <div className='w-full flex  justify-center font-semibold'>Project Design and Methodology</div>
                <div className=' text-sm'>Outline the approach and methodology behind the project. Explain why they are the most suitable for achieving the project’s objectives.</div>
            </div>
            <div className='mt-2  px-4 bg-gray-100 py-2 font-thin '>
              <p className=' text-md'>{project?.ans3} </p>
            </div>
            </div>
            <div>
            <div className='  px-4'>
                <div className='w-full flex  justify-center font-semibold'> Gender Equality, Equity, and Inclusion considerations</div>
            </div>
            <div className='mt-2  px-4 bg-gray-100 py-2 font-thin '>
              <p className=' text-md'>{project?.ans4} </p>
            </div>
            </div>


          
          <div>
            { project?.status === 'PENDING'?(
                <>
              <form action={updateProject}>
              <p>Add a comment (Optional)</p>
              <textarea name="comment" id="comment" placeholder='Add a comment' className='w-full outline-sky-300 resize-none p-2 h-48 text-gray-900'></textarea>
              <div className='w-full justify-around flex mt-2'>

              <input type="text" name='userId' title='userId' className='hidden' value={userId}  />
              <input type="text" name='status' title='status' className='hidden' value={'REJECT'} />
              <input type="text" name='projectId' title='projectId' className='hidden' value={projectId}  />

              <button type='submit' name='status' value={'REJECTED'} className='p-3 bg-rose-500  rounded-md '>Reject</button>
              <button type='submit' name='status' value={'ACCEPTED'} className='p-3 bg-green-500 rounded-md '>Accept</button>

              </div>

            </form>

                </>
            ): null}
            {/* { project?.status === 'ACCEPTED'?(

              
                <>

                {project?.Payment === 0 ?(
                  <>
              <form action={updateProject}>
              <p>Add Amount to be granted </p>
              <input type="number"  placeholder='Add amount in Kshs' name='amount' />
              <div className='w-full justify-around flex mt-2'>

              <input type="text" name='userId' title='userId' className='hidden' value={userId}  />
              <input type="text" name='projectId' title='projectId' className='hidden' value={projectId}  />
              <button type='submit' className='p-3 bg-green-500 rounded-md '>GRANT</button>

              </div>

            </form>
                  
                  </>
                ):null}
              

                </>
            ): null} */}


          
           


          </div>
       
          
          
            

          </div>

         
         
        </div>
       </div>
    </>
  );
}
