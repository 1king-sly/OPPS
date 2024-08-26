'use server'
import React, { Suspense } from 'react';
import { getServerSession } from 'next-auth';
import { restoreSingleProject, fetchUser, fetchUserRecycles } from '@/app/lib/actions';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import Search from '../../Component/Search';
import { CheckCircleIcon, ClockIcon, ExclamationTriangleIcon,TrashIcon,EyeIcon,ArrowPathIcon } from '@heroicons/react/24/outline';
import { authOptions } from '@/utils/authUptions';
import Loading from '@/app/loading';



export default async function Tables({searchParams}:{searchParams:string}) {
   const data =await getServerSession(authOptions)
  const params = new URLSearchParams(searchParams);
  const q = params.get('query') || '';

  const datas = await fetchUserRecycles(data?.id,q);

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
                   
                    
                      </td>
                  <Link href={`/User/recycle/${data.projectId}`} key={data.projectId}>
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
                  <>
                  <form action={restoreSingleProject} className='bg-green-300 p-2 text-white text-sm rounded-md w-full flex items-center justify-center'>
                      <input type="text" hidden value={data.projectId} name='projectId' />
                      <button>
                      <div>
                        <ArrowPathIcon className='h-3 w-3 md:w-4 md:h-4 lg:hidden'/>
                        <p className='hidden lg:block text-xs'>
                        Restore
                        </p>
                      </div>
                      
                      </button>                    </form>
                  
                  </>
                  
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
