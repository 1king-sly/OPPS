import React from 'react';
import { getServerSession } from 'next-auth';
import { fetchAllAdminReviewedProjects } from '@/app/lib/actions';
import Link from 'next/link';
import Search from '@/app/(ui)/User/Component/Search';
import { redirect } from 'next/navigation';
import { CheckCircleIcon, ClockIcon, ExclamationTriangleIcon,PaperAirplaneIcon } from '@heroicons/react/24/outline';

export default async  function Page({searchParams}:{searchParams:string}) {
  const session = await getServerSession()
  if(!session){
    redirect('/')
  }
  
  const params = new URLSearchParams(searchParams);
  const q = params.get('query') || '';
  const datas = await fetchAllAdminReviewedProjects( q);
  



  return (
    <>
   <div className=' p-10 pb-40 max-[425px]:p-3  '>
    <Search placeholder="Search for a project ..."/>

    <table className=' w-full'>
        
        <tbody className='  flex-col mt-4 gap-3 flex'>
          {datas?.map((data)=>(
            <Link href={`/Admin/Reviewed/${data.projectId}`} key={data.projectId}>

            <tr className='min-[426px]:justify-around  flex bg-gray-100 py-2  
            w-full pr-2 items-center max-[425px]:gap-6'>
                  <td className='w-1/3 truncate'>{data.title}  </td>
                  <td className='w-1/3 max-[425px]:hidden' >{data.createdAt.toLocaleDateString()} </td>
                  <td className='w-1/12' >  {data.status === 'PENDING' ?(
                        <>
                         <div className='w-full flex gap-0.5 justify-center bg-gray-300 p-2 lg:rounded-md
                        rounded-full '>
                        <ClockIcon className='w-full h-full md:w-4 md:h-4 lg:hidden'/>

                        <p className='hidden lg:block text-xs'>
                          PENDING
                          </p>
                           </div>
                        </>
                      ): null}
                      {data.status === 'REFERRED' ?(
                        <>
                         <div className='w-full flex gap-0.5 justify-center bg-orange-300 p-2 lg:rounded-md
                        rounded-full '>
                        <PaperAirplaneIcon className='w-full h-full md:w-4 md:h-4 lg:hidden'/>

                        <p className='hidden lg:block text-xs'>
                          REFERRED
                          </p>
                           </div>
                        </>
                      ): null}
                      {data.status === 'ACCEPTED' ?(
                        <>
                         <div className='w-full flex gap-0.5 justify-center bg-green-300 p-2 lg:rounded-md
                        rounded-full'>
                          <CheckCircleIcon className='w-full h-full md:w-4 md:h-4 lg:hidden'/>
                     
                        <p className='text-xs hidden lg:block '>
                          ACCEPTED</p>
                           </div>
                        </>
                      ): null}
                      {data.status === 'REJECTED' ?(
                        <>
                         <div className='w-full flex  bg-rose-500 p-2 justify-center lg:rounded-md
                        rounded-full  '>
                          <ExclamationTriangleIcon className='w-full h-full md:w-4 md:h-4 lg:hidden'/>

                        <p className='text-xs hidden lg:block '>
                          REJECTED</p>
                      
                           </div>
                        </>
                      ): null} </td>
                </tr>
            </Link>

          ))}
          
          
            
         
          
            
         
        </tbody>
      </table>
    </div>
      
    </>
  );
}
