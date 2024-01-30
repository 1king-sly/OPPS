'use server'
import React from 'react';
import { getServerSession } from 'next-auth';
import { deleteSingleProject, fetchUser, fetchUserDashboardProjects } from '@/app/lib/actions';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { CheckCircleIcon, ClockIcon, ExclamationTriangleIcon,TrashIcon,EyeIcon } from '@heroicons/react/24/outline';



export default async function Tables() {
  const session = await getServerSession()
  if(!session){
    redirect('/')
  }
  const email = session.user.email


  const data =await fetchUser(email)


  const datas = await fetchUserDashboardProjects(data?.id);

  return (
    <>
       <div className=' p-10 pb-40 max-[425px]:p-2  '>
    <table className=' w-full'>
        

        <tbody className='  flex-col mt-4 gap-3 flex'>
          {datas?.map((data)=>(
            

            <tr className='min-[426px]:justify-around  flex bg-gray-100 py-2 justify-between 
            w-full pr-2 items-center' key={data.projectId}>
                  <td className='max-[425px]:w-3/5 max-[375px]:w-4/6 max-[320px]:w-3/5 w-1/3 truncate '>{data.title}  </td>
                  <td className='w-1/3 max-[425px]:hidden' >{data.createdAt.toLocaleDateString()} </td>
                  <td className='w-1/12' >
                      {data.status === 'PENDING' || data.status==='REFERRED' ?(
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
                  <form action={deleteSingleProject} className='bg-rose-500 p-2 text-white text-sm lg:rounded-md w-full flex items-center justify-center rounded-full'>
                      <input type="text" hidden value={data.projectId} name='projectId' />
                    <button>
                      <div>
                        <TrashIcon className='h-3 w-3 md:w-4 md:h-4 lg:hidden'/>
                        <p className='hidden lg:block text-xs'>
                        Delete
                        </p>
                      </div>
                      
                      </button>
                    </form>
                  
                  </>
                 ): null}
                  
                  </td>
                </tr>

          ))}
          
          
            
         
          
            
         
        </tbody>
      </table>
    </div>
      
    </>
  );
}




// Previous working version just in case😂😎
{/* <div className='w-full gap-1 flex flex-col'>
        <div className='w-full h-16 items-center justify-around flex '>
          <div>Title</div>
          <div>Date</div>
          <div>Status</div>
        </div>
        <div className='-mt-6'>
          {datas?.map((data) => (
            <Link href={`/Projects/${data.projectId}`} key={data.projectId}>
              <Table
              key={data.projectId}
              title={data.title}
              date={data.createdAt.toLocaleDateString()}
              status={data.status}
            />
            </Link>
            
          ))}
        </div>
</div> */}