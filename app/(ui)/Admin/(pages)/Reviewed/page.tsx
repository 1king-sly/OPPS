import React from 'react';
import { getServerSession } from 'next-auth';
import authOptions from '@/utils/authUptions';
import { fetchAllAdminReviewedProjects, fetchUser } from '@/app/lib/actions';
import Link from 'next/link';
import Search from '@/app/(ui)/User/Component/Search';

export default async  function Page({searchParams}:{searchParams:string}) {
  const session = await getServerSession()
  if(!session){
    return null
  }
  const email = session.user.email


  const data =await fetchUser(email)

  const q = searchParams || ''
  const datas = await fetchAllAdminReviewedProjects(data?.id,q);


  return (
    <>
   <div className=' p-10  '>
    <Search placeholder="Search for a project ..."/>

    <table className=' w-full'>
        
        <tbody className='  flex-col mt-4 gap-3 flex'>

        <tr className=' flex justify-around w-full'>
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
