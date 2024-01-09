'use server'
import React from 'react';
import { getServerSession } from 'next-auth';
import authOptions from '@/utils/authUptions';
import { fetchAdminDashboardProjects, fetchUser } from '@/app/lib/actions';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function Tables() {
  const session = await getServerSession()
  if(!session){
    redirect('/')
  }
  
  const datas = await fetchAdminDashboardProjects();

  return (
    <>
       <div className=' p-10 pb-40  '>
    <table className=' w-full'>
       

        <tbody className='  flex-col  gap-3 flex'>

        <tr className='justify-around w-full flex bg-gray-100 py-2 '>
            <td className='w-1/3' >TITLE</td>
            <td className='w-1/3'>DATE</td>
            <td className='w-1/12'> SCHOOL</td>
          </tr>

          {datas?.map((data)=>(
            <Link href={`/Admin/Projects/${data.projectId}`} key={data.projectId}>

            <tr className='justify-around w-full flex bg-gray-100 py-2 '>
                  <td className='w-1/3'>{data.title}  </td>
                  <td className='w-1/3' >{data.createdAt.toLocaleDateString()} </td>
                  <td className='w-1/12' >{data.school} </td>
                </tr>
            </Link>

          ))}
          
          
            
         
          
            
         
        </tbody>
      </table>
    </div>
    </>
  );
}
