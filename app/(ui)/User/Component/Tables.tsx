'use server'
import React from 'react';
import Table from './Table';
import { getServerSession } from 'next-auth';
import authOptions from '@/utils/authUptions';
import { fetchUserDashboardProjects, fetchUserProjects } from '@/app/lib/actions';
import Link from 'next/link';
import { CheckIcon, ClockIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export default async function Tables() {
  const session = await getServerSession(authOptions);
  console.log(session);

  const datas = await fetchUserDashboardProjects(session?.id);

  return (
    <>
       <div className=' p-10  '>
    <table className=' w-full'>
        <thead className='  '>
          <tr className=' flex justify-around w-full'>
            <th className='' >TITLE</th>
            <th className=' ml-48'>DATE</th>
            <th className=''>STATUS</th>
          </tr>
        </thead>

        <tbody className='  flex-col mt-4 gap-3 flex'>

          {datas?.map((data)=>(
            <Link href={`/User/Projects/${data.projectId}`} key={data.projectId}>

            <tr className='justify-around w-full flex bg-gray-100 py-2 '>
                  <td className=''>{data.title}  </td>
                  <td >{data.createdAt.toLocaleDateString()} </td>
                  <td >
                      {data.status === 'PENDING' ?(
                        <>
                        <div className='w-full flex gap-0.5'>
                      <ClockIcon className="ml-1 w-4 text-gray-500" />
                          PENDING
                           </div>
                        </>
                      ): null}
                      {data.status === 'ACCEPTED' ?(
                        <>
                        <div className='w-full flex gap-0.5'>
                      <CheckIcon className="ml-1 w-4 text-gray-500" />
                      ACCEPTED
                           </div>
                        </>
                      ): null}
                      {data.status === 'REJECTED' ?(
                        <>
                        <div className='w-full flex gap-0.5'>
                      <ExclamationTriangleIcon className="ml-1 w-4 text-gray-500" />
                      REJECTED
                           </div>
                        </>
                      ): null}
                  </td>
                </tr>
            </Link>

          ))}
          
          
            
         
          
            
         
        </tbody>
      </table>
    </div>
      
    </>
  );
}




// Previous working version just in case😂😎
{/* <div className='w-full gap-1 flex flex-col'>
        <div className='w-full h-16 items-center justify-around flex '>
          <div>Title</div>
          <div>Date</div>
          <div>Status</div>
        </div>
        <div className='-mt-6'>
          {datas?.map((data) => (
            <Link href={`/Projects/${data.projectId}`} key={data.projectId}>
              <Table
              key={data.projectId}
              title={data.title}
              date={data.createdAt.toLocaleDateString()}
              status={data.status}
            />
            </Link>
            
          ))}
        </div>
</div> */}