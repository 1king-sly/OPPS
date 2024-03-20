'use server'
import React, { Suspense } from 'react';
import { getServerSession } from 'next-auth';
import { deleteSingleProject, fetchUser, fetchUserProjects } from '@/app/lib/actions';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import Search from '../../Component/Search';
import { CheckCircleIcon, ClockIcon, ExclamationTriangleIcon,TrashIcon,EyeIcon } from '@heroicons/react/24/outline';
import { authOptions } from '@/utils/authUptions';
import Loading from '@/app/loading';



export default async function Tables({searchParams}:{searchParams:string}) {
   const data =await getServerSession(authOptions)
  const params = new URLSearchParams(searchParams);
  const q = params.get('query') || '';

  const datas = await fetchUserProjects(data?.id,q);

  return (
    <>
  <Suspense fallback={<Loading/>} >
      <div className=' p-10  pb-40 max-[425px]:p-2 '>

 <Search placeholder="Search for a project ..."/>
 <table className=' w-full'>
        

        <tbody className='  flex-col mt-4 gap-3 flex'>

       

          {datas?.map((data)=>(
            

            <tr className='min-[426px]:justify-around  flex bg-gray-100 py-2 justify-between 
            w-full pr-2 items-center ' key={data.projectId}>
                  <td className='max-[425px]:w-3/5 max-[375px]:w-4/6 max-[320px]:w-3/5 w-1/3 truncate'>{data.title}  </td>
                  <td className='w-1/3 max-[425px]:hidden' >{data.createdAt.toLocaleDateString()} </td>
                  <td className='w-1/12' >
                      {data.status === 'PENDING' || data.status ==='REFERRED' ?(
                        <>
                        <div className='w-full flex gap-0.5 justify-center bg-gray-300 p-2 lg:rounded-md
                        rounded-full '>
                        <ClockIcon className='h-3 w-3 md:w-4 md:h-4 lg:hidden'/>

                        <p className='hidden lg:block text-xs'>
                          PENDING
                          </p>
                           </div>
                        </>
                      ): null}
                      {data.status === 'ACCEPTED' ?(
                        <>
                        <div className='w-full flex gap-0.5 justify-center bg-green-300 p-2 lg:rounded-md
                        rounded-full'>
                          <CheckCircleIcon className='h-3 w-3 md:w-4 md:h-4 lg:hidden'/>
                     
                        <p className='text-xs hidden lg:block '>
                          ACCEPTED</p>
                           </div>
                        </>
                      ): null}
                      {data.status === 'REJECTED' ?(
                        <>
                        <div className='w-full flex  bg-rose-500 p-2 justify-center lg:rounded-md
                        rounded-full  '>
                          <ExclamationTriangleIcon className='h-3 w-3 md:w-4 md:h-4 lg:hidden'/>

                        <p className='text-xs hidden lg:block '>
                          REJECTED</p>
                      
                           </div>
                        </>
                      ): null}
                      </td>
                  <Link href={`/User/Projects/${data.projectId}`} key={data.projectId}>
                  <td className='w-1/12' >
                  <button className='bg-sky-300 p-2 text-white text-sm lg:rounded-md rounded-full '>
                    <div>
                      <EyeIcon className=' h-3 w-3 md:w-4 md:h-4 lg:hidden'/>
                      <p className='hidden lg:block text-xs'>
                         View

                      </p>
                    </div>
                    </button>
                  </td>
                  </Link>

                  <td className='w-1/12' >
                    {data.status === 'PENDING' ?(
                  <>
                  <form action={deleteSingleProject} className='bg-rose-500 p-2 text-white text-sm rounded-md w-full flex items-center justify-center'>
                      <input type="text" hidden value={data.projectId} name='projectId' />
                      <button>
                      <div>
                        <TrashIcon className='h-3 w-3 md:w-4 md:h-4 lg:hidden'/>
                        <p className='hidden lg:block text-xs'>
                        Delete
                        </p>
                      </div>
                      
                      </button>                    </form>
                  
                  </>
                 ): null}
                  
                  </td>
                </tr>

          ))}
   
        </tbody>
      </table>
    </div>
  </Suspense>

 
      
    </>
  );
}
