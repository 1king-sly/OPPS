'use server'
import React from 'react';
import { getServerSession } from 'next-auth';
import { deleteSingleDraft, fetchUserDrafts } from '@/app/lib/actions';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import Search from '../../Component/Search';
import { CheckCircleIcon, ClockIcon, ExclamationTriangleIcon,TrashIcon,EyeIcon } from '@heroicons/react/24/outline';
import { authOptions } from '@/utils/authUptions';



export default async function Tables({searchParams}:{searchParams:string}) {
   const data =await getServerSession(authOptions)
  const params = new URLSearchParams(searchParams);
  const q = params.get('query') || '';

  const datas = await fetchUserDrafts(data?.id,q);

  return (
    <>
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
                    
                      </td>
                  <Link href={`/User/Drafts/${data.projectId}`} key={data.projectId}>
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
                  <form action={deleteSingleDraft} className='bg-rose-500 p-2 text-white text-sm rounded-md w-full flex items-center justify-center'>
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
               
                  
                  </td>
                </tr>

          ))}
   
        </tbody>
      </table>
    </div>
      
    </>
  );
}
