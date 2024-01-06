'use server'

import React from 'react';
import { getServerSession } from 'next-auth';
import authOptions from '@/utils/authUptions';
import { acceptProject, fetchAllAdminProjects, fetchSingleProject, rejectProject } from '@/app/lib/actions';
import { notFound } from 'next/navigation';

export default async function Page({params}) {

    const session = await getServerSession(authOptions)
    if(!session){
        return null
    }
    const userId = session?.id
    const projectId = params.id
    const project = await fetchSingleProject(userId,projectId)


    if(!project){
      notFound()
    }

    
 
  return (
    <>
      <div className='w-full min-h-screen flex flex-col items-center justify-center pb-16 mt-4'>
        <div className='flex flex-col items-center'>
          <div className='w-5/6 mx-auto flex flex-col text-black gap-10'>
            


          
          <div>
            { project?.status === 'PENDING'?(
                <>
              <form action="">
              <p>Add a comment (Optional)</p>
              <textarea name="comment" id="comment" placeholder='Add a comment' className='w-full outline-sky-300 resize-none p-2 h-48 text-gray-900'></textarea>
              <div className='w-full justify-around flex mt-2'>

              <input type="text" name='userId' title='userId' className='hidden'  />
              <input type="text" name='status' title='status' className='hidden' value={'REJECT'} />
              <input type="text" name='projectId' title='projectId' className='hidden'  />

              <button type='submit' name='Reject' className='p-3 bg-rose-500  rounded-md '>Reject</button>
              <button type='submit' name='Accept' className='p-3 bg-green-500 rounded-md '>Accept</button>

              </div>

            </form>

                </>
            ): null}
          
           


          </div>
       
          
          
            

          </div>

         
         
        </div>
       </div>
    </>
  );
}
