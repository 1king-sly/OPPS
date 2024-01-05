import React from 'react';
import { getServerSession } from 'next-auth';
import authOptions from '@/utils/authUptions';
import { fetchUserProjects } from '@/app/lib/actions';
import Link from 'next/link';
import Table from '@/app/(ui)/User/Component/Table';

export default async function Tables() {
  const session = await getServerSession(authOptions);
  console.log(session);

  const datas = await fetchUserProjects(session?.id);

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
