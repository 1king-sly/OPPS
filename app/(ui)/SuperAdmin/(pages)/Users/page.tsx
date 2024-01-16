import React from 'react';
import { getServerSession } from 'next-auth';
import {deleteSingleUser, fetchUsers } from '@/app/lib/actions';
import Link from 'next/link';
import Search from '@/app/(ui)/User/Component/Search';
import { redirect } from 'next/navigation';
import {TrashIcon,EyeIcon } from '@heroicons/react/24/outline';


export default async  function Page({searchParams}:{searchParams:string}) {
  const session = await getServerSession()
  if(!session){
    redirect('/')
  }
  const params = new URLSearchParams(searchParams);
  const q = params.get('query') || '';
  const users = await fetchUsers(q);
  



  return (
    <>
   <div className=' p-10 pb-40 max-[425px]:p-3  '>
    <Search placeholder="Search for a User ..."/>

    <table className=' w-full'>
        
        <tbody className='  flex-col mt-4 gap-3 flex'>
          {users?.map((user)=>(

            <tr className='min-[376px]:justify-around w-full flex bg-gray-100 py-2 max-[321px]:gap-3 max-[375px]:gap-5  max-[425px]:gap-4  ' key={user.id}>
                  <td className='w-1/3 max-[425px]:w-1/4 truncate'>{user.registrationNumber}  </td>
                  <td className='w-1/3  max-[768px]:w-1/5' >{user.firstName} </td>
                  <td className='w-1/12 max-[425px]:hidden' >{user.userType} </td>
                  <Link href={`/SuperAdmin/Users/${user.id}`} >

                  <td> 
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

                  <td>
                    <form action={deleteSingleUser} className='bg-rose-500 p-2 text-white text-sm rounded-md'>
                      <input type="text" hidden value={user.id} name='userId' />
                      <button>
                      <div>
                        <TrashIcon className='h-3 w-3 md:w-4 md:h-4 lg:hidden'/>
                        <p className='hidden lg:block text-xs'>
                        Delete
                        </p>
                      </div>
                      
                      </button>                    </form> 
                  </td>
                  
                </tr>

          ))}
        </tbody>
      </table>
    </div>
      
    </>
  );
}
