'use server'
import React, { Suspense } from 'react';
import { fetchAllAdminProjects } from '@/app/lib/actions';
import Link from 'next/link';
import Search from '@/app/(ui)/User/Component/Search';
import Projects from '@/app/(ui)/User/Skeleton/Projects';

export default async  function Page({searchParams}:{searchParams:string}) {

  const params = new URLSearchParams(searchParams);
  const q = params.get('query') || '';

  const datas = await fetchAllAdminProjects(q);

  
  return (
    <>

    <Suspense fallback={<Projects/>}>

    <div className=' p-10 pb-40 max-[425px]:p-3 '>
    <Search placeholder="Search for a project ..."/>

    <div className='table-responsive'>

    <table className='table-auto '>
        
        <tbody className='  flex-col mt-4 gap-3 flex'>
          {datas?.map((data)=>(
            <Link href={`/Guest/Projects/${data.projectId}`} key={data.projectId}>

            <tr className='min-[426px]:justify-around  flex bg-gray-100 py-2 justify-between 
            max-[425px]:w-4/5 max-[375px]:w-4/6 max-[320px]:w-3/5 w-full'>
                  <td className='max-[425px]:w-3/5 max-[375px]:w-4/6 max-[320px]:w-3/5 w-1/3 truncate'>{data.title}  </td>
                  <td className='w-1/3 max-[425px]:hidden' >{data.createdAt.toLocaleDateString()} </td>
                  <td className='w-1/12' >
                      {data.status === 'PENDING' ?(
                        <>
                        <div className='w-full flex gap-0.5 justify-center bg-gray-300 p-2 rounded-md '>
                        <p className='hidden lg:block text-xs'>PENDING</p>
                           </div>
                        </>
                      ): null}
                      {data.status === 'ACCEPTED' ?(
                        <>
                        <div className='w-full flex gap-0.5 justify-center bg-green-300 p-2 rounded-md '>
                     
                        <p className='text-xs hidden lg:block '>ACCEPTED</p>
                           </div>
                        </>
                      ): null}
                      {data.status === 'REJECTED' ?(
                        <>
                        <div className='w-full flex  bg-rose-500 p-2 justify-center rounded-md  '>
                        <p className='text-xs hidden lg:block '>REJECTED</p>
                      
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
    </div>
      
    </Suspense>
    </>
  );
}
