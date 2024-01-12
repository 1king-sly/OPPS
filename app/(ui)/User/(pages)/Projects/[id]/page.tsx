'use server'
import React from 'react';
import { getServerSession } from 'next-auth';
import {  fetchSingleProject } from '@/app/lib/actions';
import NotFound from './not-found';
import { redirect } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {

  const session = await getServerSession()
  if(!session){
    redirect('/')
  }
  
    const projectId = params.id
    const project = await fetchSingleProject(projectId)

    if(!project){
      return <NotFound/>
    }
    
 
  return (
    <>
      <div className='w-full min-h-screen flex flex-col items-center justify-center pb-16 mt-4'>
        <div className='flex flex-col items-center'>
          <div className='w-5/6 mx-auto flex flex-col text-black gap-10'>
            <div>
            <div className='  px-4'>
                <div className='w-full flex  justify-center '>Problem identification and background/Needs assessment</div>
                <div className=' text-sm'>What issue/challenge/gap does the project aim to address? The objectives should be clear, measureable, realistic and achievable within the duration of the project. For each objective, define appropriate indicators for measuring achievement (including a unit of measurement, baseline value and target value)</div>
            </div>
            <div className='mt-2  px-4 bg-gray-100 py-2 font-thin '>
              <p className=' text-md font-semibold'>{project?.ans1} </p>
            </div>
            </div>
            <div>
            <div className='  px-4'>
                <div className='w-full flex  justify-center '>Research Purpose and anticipated results</div>
              
            </div>
            <div className='mt-2  px-4 bg-gray-100 py-2 font-thin '>
              <p className=' text-md font-semibold'>{project?.ans2} </p>
            </div>
            </div>
            <div>
            <div className='  px-4'>
                <div className='w-full flex  justify-center '>Project Design and Methodology</div>
                <div className=' text-sm'>Outline the approach and methodology behind the project. Explain why they are the most suitable for achieving the project’s objectives.</div>
            </div>
            <div className='mt-2  px-4 bg-gray-100 py-2 font-thin '>
              <p className=' text-md font-semibold'>{project?.ans3} </p>
            </div>
            </div>
            <div>
            <div className='  px-4'>
                <div className='w-full flex  justify-center '> Gender Equality, Equity, and Inclusion considerations</div>
            </div>
            <div className='mt-2  px-4 bg-gray-100 py-2 font-thin '>
              <p className=' text-md font-semibold'>{project?.ans4} </p>
            </div>

            {/* {project?.status === 'ACCEPTED' || 'REJECTED' ?(
              <>
               <div className='  px-4'>
                <div className='w-full flex   font-semibold'>Admin Comment</div>
            </div>
            <div className='mt-2  px-4 bg-gray-100 py-2 font-thin '>
              <p className=' text-md'>{project?.comment} </p>
            </div>
              </>
            ):null} */}

            </div>


          
          <div>
          
          
           


          </div>
       
          
          
            

          </div>

         
         
        </div>
       </div>
    </>
  );
}
