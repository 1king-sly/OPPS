import React from 'react';
import { getServerSession } from 'next-auth';
import {deleteSingleUser, fetchUsers } from '@/app/lib/actions';
import Link from 'next/link';
import Search from '@/app/(ui)/User/Component/Search';
import { redirect } from 'next/navigation';

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
   <div className=' p-10 pb-40  '>
    <Search placeholder="Search for a User ..."/>

    <table className=' w-full'>
        
        <tbody className='  flex-col mt-4 gap-3 flex'>

        <tr className=' flex justify-around w-full ml-10'>
            <td className='w-1/3' >Registration Number</td>
            <td className='w-1/3'>FirstName</td>
            <td className='w-1/12 '>UserType </td>
            <td className='w-1/12 '></td>
            <td className='w-1/12 '></td>
          </tr>
          {users?.map((user)=>(

            <tr className='justify-around w-full flex bg-gray-100 py-2  ' key={user.id}>
                  <td className='w-1/3 truncate'>{user.registrationNumber}  </td>
                  <td className='w-1/3' >{user.firstName} </td>
                  <td className='w-1/12' >{user.userType} </td>
                  <Link href={`/SuperAdmin/Users/${user.id}`} >

                  <td> 
                    <button className='bg-sky-300 p-2 text-white text-sm rounded-md '>View</button>
                  </td>
                  </Link>

                  <td>
                    <form action={deleteSingleUser} className='bg-rose-500 p-2 text-white text-sm rounded-md'>
                      <input type="text" hidden value={user.id} name='userId' />
                    <button>Delete</button>
                    </form> 
                  </td>
                  
                </tr>

          ))}
        </tbody>
      </table>
    </div>
      
    </>
  );
}
