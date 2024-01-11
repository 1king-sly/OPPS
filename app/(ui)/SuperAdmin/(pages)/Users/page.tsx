import React from 'react';
import { getServerSession } from 'next-auth';
import {fetchUsers,deleteSingleUser } from '@/app/lib/actions';
import Link from 'next/link';
import Search from '@/app/(ui)/User/Component/Search';
import { redirect } from 'next/navigation';
import { TrashIcon } from '@heroicons/react/24/outline';

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

        <tr className=' flex justify-around w-full'>
            <td className='w-1/3' >Registration Number</td>
            <td className='w-1/3'>FirstName</td>
            <td className='w-1/12 '>UserType </td>
          </tr>
          {users?.map((user)=>(
            <Link href={`/SuperAdmin/Users/${user.id}`} key={user.id}>

            <tr className='justify-around w-full flex bg-gray-100 py-2 '>
                  <td className='w-1/3 truncate'>{user.registrationNumber}  </td>
                  <td className='w-1/3' >{user.firstName} </td>
                  <td className='w-1/12' >{user.userType} </td>
                  
                </tr>
            </Link>

          ))}
          
          
            
         
          
            
         
        </tbody>
      </table>
    </div>
      
    </>
  );
}
