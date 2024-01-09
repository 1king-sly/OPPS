'use server'
import React from 'react';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/api/auth/[...nextauth]/authUptions';
import { fetchAllAdminProjects, fetchUser } from '@/app/lib/actions';
import Link from 'next/link';
import Search from '@/app/(ui)/User/Component/Search';
import { redirect } from 'next/navigation';

export default async  function Tables({searchParams}:{searchParams:string}) {

  const q = searchParams || ''

  const session = await getServerSession()
  if(!session){
    redirect('/')
  }
  const email = session.user.email


  const data =await fetchUser(email)

  const datas = await fetchAllAdminProjects(data?.id,q);

  if(!datas){
    return null
  }

  return (
    <>
    <div className=' p-10   '>
    <Search placeholder="Search for a project ..."/>

    <table className=' w-full'>
        
        <tbody className='  flex-col mt-4 gap-3 flex'>

        <tr className=' flex justify-around w-full'>
            <th className='' >TITLE</th>
            <th className=''>DATE</th>
            <th className=''>SCHOOL </th>
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
