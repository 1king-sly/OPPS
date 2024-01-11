'use server'
import React from 'react';
import { getServerSession } from 'next-auth';
import { fetchUser, fetchUserProjects } from '@/app/lib/actions';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import Search from '../../Component/Search';


export default async function Tables({searchParams}:{searchParams:string}) {
  const session = await getServerSession()
  if(!session){
    redirect('/')
  }
  const email = session.user.email


  const data =await fetchUser(email)

  const params = new URLSearchParams(searchParams);
  const q = params.get('query') || '';

  const datas = await fetchUserProjects(data?.id,q);

  return (
    <>
 <div className=' p-10  pb-40 '>

 <Search placeholder="Search for a project ..."/>
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
                  <td className='w-1/3 truncate '>{data.title}  </td>
                  <td className='w-1/3' >{data.createdAt.toLocaleDateString()} </td>
                  <td className=' w-1/12' >
                      {data.status === 'PENDING' ?(
                        <>
                        <div className='w-full flex gap-0.5 bg-gray-300 p-2 rounded-md '>
                      <p className='text-sm'>
                      PENDING
                      </p>
                          
                           </div>
                        </>
                      ): null}
                      {data.status === 'ACCEPTED' ?(
                        <>
                        <div className='w-full flex gap-0.5 bg-green-300 p-2 rounded-md '>
                      <p className='text-sm'>
                      ACCEPTED
                      </p>

                      
                           </div>
                        </>
                      ): null}
                      {data.status === 'REJECTED' ?(
                        <>
                        <div className='w-full flex gap-0.5 bg-rose-500 p-2 rounded-md '>
                      <p className='text-sm'>
                      REJECTED
                      </p>

                      
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
