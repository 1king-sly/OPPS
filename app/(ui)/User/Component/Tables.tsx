import React from 'react';
import Table from './Table';
import { getServerSession } from 'next-auth';
import authOptions from '@/utils/authUptions';
import { fetchUserDashboardProjects, fetchUserProjects } from '@/app/lib/actions';
import Link from 'next/link';

export default async function Tables() {
  const session = await getServerSession(authOptions);
  console.log(session);

  const datas = await fetchUserDashboardProjects(session?.id);

  return (
    <>
      <table className='w-full '>
        <thead>
          <tr>
            <th>TITLE</th>
            <th>DATE</th>
            <th>STATUS</th>
          </tr>
        </thead>

        <tbody>
        {datas?.map((data) => (
            <Link href={`/Projects/${data.projectId}`} key={data.projectId}>
              <Table
              title={data.title}
              date={data.createdAt.toLocaleDateString()}
              status={data.status}
            />
            </Link>  
          ))}
         
        </tbody>
      </table>
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