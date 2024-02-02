import React from 'react';
import { fetchAllAdminReferredProjects } from '@/app/lib/actions';
import Link from 'next/link';
import Search from '@/app/(ui)/User/Component/Search';

export default async  function Page({searchParams}:{searchParams:string}) {  
  const params = new URLSearchParams(searchParams);
  const q = params.get('query') || '';
  const datas = await fetchAllAdminReferredProjects( q);

  return (
    <>
   <div className=' p-10 pb-40 max-[425px]:p-3  '>
    <Search placeholder="Search for a project ..."/>

    {datas && datas.length > 0 ? (
          <table className='w-full'>
            <tbody className='flex-col mt-4 gap-3 flex'>
              {datas.map((data) => (
                <Link href={`/Admin/Referred/${data.projectId}`} key={data.projectId}>
                  <tr className='min-[426px]:justify-around  flex bg-gray-100 py-2 w-full pr-2 items-center max-[425px]:gap-6'>
                    <td className='w-1/3 truncate'>{data.title}</td>
                    <td className='w-1/3 max-[425px]:hidden'>{data.createdAt.toLocaleDateString()}</td>
                    <td className='w-1/12'>{data.school}</td>
                  </tr>
                </Link>
              ))}
            </tbody>
          </table>
        ) : (
            <div className='w-full h-full flex items-center justify-center'>
          <p>No projects available</p>
          </div>
        )}
    </div>
      
    </>
  );
}
