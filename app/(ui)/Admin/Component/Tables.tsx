'use server'
import React from 'react';
import { getServerSession } from 'next-auth';
import authOptions from '@/utils/authUptions';
import { fetchAdminDashboardProjects, fetchUser } from '@/app/lib/actions';
import Link from 'next/link';

export default async function Tables() {
  const session = await getServerSession()
  if(!session){
    return null
  }
  const email = session.user.email


  const data =await fetchUser(email)

  
  const datas = await fetchAdminDashboardProjects(data?.id);

  return (
    <>
       <div className=' p-10  '>
    <table className=' w-full'>
        <thead className='  '>
         
        </thead>

        <tbody className='  flex-col  gap-3 flex'>

        <tr className='justify-around w-full flex bg-gray-100 py-2 '>
            <td className='' >TITLE</td>
            <td className=''>DATE</td>
            <td className=''>REGISTRATION NUMBER</td>
          </tr>

          {datas?.map((data)=>(
            <Link href={`/Admin/Projects/${data.projectId}`} key={data.projectId}>

            <tr className='justify-around w-full flex bg-gray-100 py-2 '>
                  <td className=''>{data.title}  </td>
                  <td >{data.createdAt.toLocaleDateString()} </td>
                  <td >{data.school} </td>
                </tr>
            </Link>

          ))}
          
          
            
         
          
            
         
        </tbody>
      </table>
    </div>
    </>
  );
}
