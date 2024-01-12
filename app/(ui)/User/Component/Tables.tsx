'use server'
import React from 'react';
import { getServerSession } from 'next-auth';
import { deleteSingleProject, fetchUser, fetchUserDashboardProjects } from '@/app/lib/actions';
import Link from 'next/link';
import { redirect } from 'next/navigation';


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
       <div className=' p-10 pb-40  '>
    <table className=' w-full'>
        

        <tbody className='  flex-col mt-4 gap-3 flex'>
          {datas?.map((data)=>(
            

            <tr className='justify-around w-full flex bg-gray-100 py-2 ' key={data.projectId}>
                  <td className='w-1/3 truncate'>{data.title}  </td>
                  <td className='w-1/3' >{data.createdAt.toLocaleDateString()} </td>
                  <td className='w-1/12' >
                      {data.status === 'PENDING' ?(
                        <>
                        <div className='w-full flex gap-0.5 bg-gray-300 p-2 rounded-md '>
                        <p className=' text-sm'>PENDING</p>
                           </div>
                        </>
                      ): null}
                      {data.status === 'ACCEPTED' ?(
                        <>
                        <div className='w-full flex gap-0.5 bg-green-300 p-2 rounded-md '>
                     
                        <p className=' text-sm'>ACCEPTED</p>
                           </div>
                        </>
                      ): null}
                      {data.status === 'REJECTED' ?(
                        <>
                        <div className='w-full flex  bg-rose-500 p-2 rounded-md  '>
                        <p className=' text-sm'>REJECTED</p>
                      
                           </div>
                        </>
                      ): null}
                      </td>
                  <Link href={`/User/Projects/${data.projectId}`} key={data.projectId}>
                  <td className='w-1/12' >
                  <button className='bg-sky-300 p-2 text-white text-sm rounded-md '>View</button>
                  </td>
                  </Link>

                  <td className='w-1/12' >
                    {data.status === 'PENDING' ?(
                  <>
                  <form action={deleteSingleProject} className='bg-rose-500 p-2 text-white text-sm rounded-md w-full flex items-center justify-center'>
                      <input type="text" hidden value={data.projectId} name='projectId' />
                    <button>Delete</button>
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