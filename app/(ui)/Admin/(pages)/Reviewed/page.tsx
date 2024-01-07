import React from 'react';
import { getServerSession } from 'next-auth';
import authOptions from '@/utils/authUptions';
import { fetchAllAdminReviewedProjects } from '@/app/lib/actions';
import Link from 'next/link';
import Table from '../../Component/Table';

export default async  function Page({searchParams}) {
  const session = await getServerSession(authOptions);

  const q = searchParams?.q || ''
  const datas = await fetchAllAdminReviewedProjects(session?.id,q);

  

  if(!datas){
    return null
  }

  return (
    <>
    <div className=' p-10  '>
    <table className=' w-full'>
        <thead className='  '>
          <tr className=' flex justify-around w-full'>
            <th className='' >TITLE</th>
            <th className=' ml-48'>DATE</th>
            <th className=''>REGISTRATION NUMBER</th>
          </tr>
        </thead>

        <tbody className='  flex-col mt-4 gap-3 flex'>

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
