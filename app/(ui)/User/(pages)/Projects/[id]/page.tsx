import React from 'react';
import { getServerSession } from 'next-auth';
import authOptions from '@/utils/authUptions';
import {  fetchSingleProject } from '@/app/lib/actions';
import clsx from 'clsx';

export default async function Tables({params}) {

    const session = await getServerSession(authOptions)
    if(!session){
        return null
    }
    const userId = session?.id
    const project = await fetchSingleProject(userId,params)
    
 
  return (
    <>
      <div className='w-full min-h-screen flex flex-col items-center justify-center pb-40'>
        <div className='w-full flex flex-col items-center '>
          <div className='w-5/6 flex justify-end'>
            <div className={clsx(`
            p-4 rounded-md `,{
              'bg-green-400':status==='ACCEPTED','bg-gray-300':status==='PENDING','bg-rose-500':status==='REJECTED'
            })}>{project?.status}</div>

          </div>
          <div className='w-full flex flex-col text-black'>
            <div>
                <div>Problem identification and background/Needs assessment</div>
                <div>What issue/challenge/gap does the project aim to address? The objectives should be clear, measureable, realistic and achievable within the duration of the project. For each objective, define appropriate indicators for measuring achievement (including a unit of measurement, baseline value and target value)</div>
            </div>
            <div>
                {project?.ans1}
            </div>

          </div>
          <div className='w-full flex flex-col text-black'>
            <div>
                <p>
                Research Purpose and anticipated results
                </p>
            </div>
            <div>
                {project?.ans2}
            </div>

          </div>
          <div className='w-full flex flex-col text-black'>
            <div>
                <div>
                Project Design and Methodology
                </div>
                <div>Outline the approach and methodology behind the project. Explain why they are the most suitable for achieving the project’s objectives.</div>
            </div>
            <div>
                {project?.ans3}
            </div>

          </div>
          <div className='w-full flex flex-col text-black'>
            <div>
                <p>
                Gender Equality, Equity, and Inclusion considerations
                </p>
            </div>
            <div>
                {project?.ans4}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
