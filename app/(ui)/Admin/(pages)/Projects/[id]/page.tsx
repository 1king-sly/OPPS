import React from 'react';
import { getServerSession } from 'next-auth';
import authOptions from '@/utils/authUptions';
import { acceptProject, fetchAllAdminProjects, fetchSingleProject, rejectProject } from '@/app/lib/actions';
import Link from 'next/link';

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
        <div className='flex flex-col items-center'>
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

        <div className='w-4/5 mt-5 flex justify-around '>
            <form action={rejectProject}>
            <input type="text" name='userId' title='userId' className='sr-only' value={userId} />
                <input type="text" name='status' title='status' className='sr-only' value={'REJECT'} />
                <input type="text" name='projectId' title='projectId' className='sr-only' value={project?.projectId} />
                <button type='submit'>Reject</button>
            </form>
            <form action={acceptProject}>
                <input type="text" name='userId' title='userId' className='sr-only' value={userId} />
                <input type="text" name='status' title='status' className='sr-only' value={'ACCEPT'} />
                <input type="text" name='projectId' title='projectId' className='sr-only' value={project?.projectId} />
                <button type='submit'>Accept</button>

            </form>

        </div>
      </div>
    </>
  );
}
