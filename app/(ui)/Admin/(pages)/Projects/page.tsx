'use server'
import React, { Suspense } from 'react';
import { getServerSession } from 'next-auth';
import { fetchAllAdminProjects, fetchUser } from '@/app/lib/actions';
import Link from 'next/link';
import Search from '@/app/(ui)/User/Component/Search';
import Projects from '@/app/(ui)/User/Skeleton/Projects';
import { redirect } from 'next/navigation';

export default async  function Page({searchParams}:{searchParams:string}) {


  const session = await getServerSession()
  if(!session){
    redirect('/')
  }
  const email = session.user.email

  const params = new URLSearchParams(searchParams);
  const q = params.get('query') || '';

  const data =await fetchUser(email)
  const datas = await fetchAllAdminProjects(data?.id,q);

  
  return (
    <>

    <Suspense fallback={<Projects/>}>

    <div className=' p-10 pb-40 '>
    <Search placeholder="Search for a project ..."/>

    <table className=' w-full'>
        
        <tbody className='  flex-col mt-4 gap-3 flex'>

        <tr className=' flex justify-around w-full py-2'>
            <td className='w-1/3' >TITLE</td>
            <td className='w-1/3'>DATE</td>
            <td className='w-1/12'> SCHOOL</td>
          </tr>
          {datas?.map((data)=>(
            <Link href={`/Admin/Projects/${data.projectId}`} key={data.projectId}>

            <tr className='justify-around w-full flex bg-gray-100 py-2 '>
                  <td className='w-1/3 truncate'>{data.title}  </td>
                  <td className='w-1/3' >{data.createdAt.toLocaleDateString()} </td>
                  <td className='w-1/12' >{data.school} </td>
                </tr>
            </Link>

          ))}
          
          
            
         
          
            
         
        </tbody>
      </table>
    </div>
      
    </Suspense>
    </>
  );
}
