'use server'
import React from 'react';
import Table from './Table';
import { getServerSession } from 'next-auth';
import authOptions from '@/utils/authUptions';
import { fetchUser, fetchUserDashboardProjects, fetchUserProjects } from '@/app/lib/actions';
import Link from 'next/link';
import { CheckIcon, ClockIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { redirect } from 'next/navigation';

export default async function Tables() {
  const session = await getServerSession()
  if(!session){
    redirect('/')
  }
  const email = session.user.email


  const data =await fetchUser(email)

  const datas = await fetchUserDashboardProjects(data?.id);

  return (
    <>
       <div className=' p-10 pb-40  '>
    <table className=' w-full'>
        

        <tbody className='  flex-col mt-4 gap-3 flex'>

        <tr className=' flex justify-around w-full'>
            <td className='w-1/3' >TITLE</td>
            <td className='w-1/3'>DATE</td>
            <td className='w-1/12'>STATUS</td>
          </tr>

          {datas?.map((data)=>(
            <Link href={`/User/Projects/${data.projectId}`} key={data.projectId}>

            <tr className='justify-around w-full flex bg-gray-100 py-2 '>
                  <td className='w-1/3 truncate'>{data.title}  </td>
                  <td className='w-1/3' >{data.createdAt.toLocaleDateString()} </td>
                  <td className='w-1/12' >
                      {data.status === 'PENDING' ?(
                        <>
                        <div className='w-full flex gap-0.5 bg-gray-300 p-2 rounded-md '>
                      <ClockIcon className="ml-1 w-4 text-gray-500" />
                          PENDING
                           </div>
                        </>
                      ): null}
                      {data.status === 'ACCEPTED' ?(
                        <>
                        <div className='w-full flex gap-0.5 bg-green-300 p-2 rounded-md '>
                      <CheckIcon className="ml-1 w-4 text-gray-500" />
                      ACCEPTED
                           </div>
                        </>
                      ): null}
                      {data.status === 'REJECTED' ?(
                        <>
                        <div className='w-full flex gap-0.5 bg-rose-500 p-2 rounded-md '>
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