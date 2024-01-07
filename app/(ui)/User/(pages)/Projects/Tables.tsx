'use server'
import React from 'react';
import { getServerSession } from 'next-auth';
import authOptions from '@/utils/authUptions';
import { fetchUser, fetchUserProjects } from '@/app/lib/actions';
import Link from 'next/link';
import Table from '@/app/(ui)/User/Component/Table';

export default async function Tables() {
  const session = await getServerSession()
  if(!session){
    return null
  }
  const email = session.user.email


  const data =await fetchUser(email)

  const datas = await fetchUserProjects(data?.id);

  return (
    <>
 <div className=' p-10  '>
    <table className=' w-full'>
        <thead className='  '>
          
        </thead>

        <tbody className='  flex-col mt-4 gap-3 flex'>
        <tr className=' flex justify-around w-full'>
            <td className='' >TITLE</td>
            <td className=''>DATE</td>
            <td className=''>STATUS</td>
          </tr>
          {datas?.map((data)=>(
            <Link href={`/User/Projects/${data.projectId}`} key={data.projectId}>

            <tr className='justify-around w-full flex bg-gray-100 py-2 '>
                  <td className=''>{data.title}  </td>
                  <td >{data.createdAt.toLocaleDateString()} </td>
                  <td >{data.status} </td>
                </tr>
            </Link>

          ))}
          
          
            
         
          
            
         
        </tbody>
      </table>
    </div>
      
    </>
  );
}
