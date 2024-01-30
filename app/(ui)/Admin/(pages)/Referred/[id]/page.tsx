'use server'
import React from 'react';
import {  fetchSingleProject } from '@/app/lib/actions';
import NotFound from './not-found';

export default async function Page({ params }: { params: { id: string } }) {
    const projectId = params.id
    
    const project = await fetchSingleProject(projectId)

    if(!project){
     return <NotFound/>
    }
  return (
    <>
      <div className='w-full min-h-screen flex flex-col items-center justify-center pb-40 mt-4'>
        <div className='flex flex-col items-center'>
          <div className='w-5/6 mx-auto flex flex-col text-black gap-10'>
           
            <div>
            <h1 className='w-full flex justify-center md:text-lg gap-1'>Title: <span className=' underline'>{project?.title}</span>  </h1>

            <div className='  px-4'>
                <div className='w-full flex  justify-center '>Problem identification and background/Needs assessment</div>
            </div>
            <div className='mt-2  px-4 bg-gray-100 py-2   '>
              <p className=' text-md'>{project?.ans1} </p>
            </div>
            </div>
            <div>
            <div className='  px-4'>
                <div className='w-full flex  justify-center '>Research Purpose and anticipated results</div>
              
            </div>
            <div className='mt-2  px-4 bg-gray-100 py-2  '>
              <p className=' text-md  '>{project?.ans2} </p>
            </div>
            </div>
            <div>
            <div className='  px-4'>
                <div className='w-full flex  justify-center '>Project Design and Methodology</div>
                <div className=' text-sm'>Outline the approach and methodology behind the project. Explain why they are the most suitable for achieving the project’s objectives.</div>
            </div>
            <div className='mt-2  px-4 bg-gray-100 py-2  '>
              <p className=' text-md  '>{project?.ans3} </p>
            </div>
            </div>
            <div>
            <div className='  px-4'>
                <div className='w-full flex  justify-center '> Gender Equality, Equity, and Inclusion considerations</div>
            </div>
            <div className='mt-2  px-4 bg-gray-100 py-2  '>
              <p className=' text-md  '>{project?.ans4} </p>
            </div>
            {project?.comment !== null || project?.comment=='' ?(
              <>
               <div className='  px-4 mt-4'>
                <div className='w-full flex   font-semibold gap-1'>Reviewer Comment: <span
                className=''>{project?.updatedBy} </span></div>
            </div>
            <div className='mt-2  px-4 bg-gray-100 py-2 '>
              <p className=' text-md'>{project?.comment} </p>
            </div>
              </>
            ):null}
            {project?.referredTo !== null  && project?.referredTo.length > 0 ?(
              <>
               <div className='  px-4 mt-4'>
                <div className='w-full flex   font-semibold gap-1'>Referred To: </div>
                <ul className='list-disc list-inside px-4 bg-gray-100 py-2'>
                {project?.referredTo.map((reference) => (
                 <li key={reference.email}>{reference.email}</li>
                 ))}
                </ul>
            </div>
            </>
            ):null}
            {project?.moderatorComment !== null || project?.moderatorComment=='' ?(
              <>
               <div className='  px-4 mt-4'>
                <div className='w-full flex   font-semibold gap-1'>Moderator Comment: <span
                className=''>{project?.moderatorName} </span></div>
            </div>
            <div className='mt-2  px-4 bg-gray-100 py-2 '>
              <p className=' text-md'>{project?.moderatorComment} </p>
            </div>
              </>
            ):null}
            </div>


          
          <div>
            
           

          
           


          </div>
          </div>
        </div>
       </div>
    </>
  );
}