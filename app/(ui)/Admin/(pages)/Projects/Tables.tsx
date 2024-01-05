import React from 'react';
import { getServerSession } from 'next-auth';
import authOptions from '@/utils/authUptions';
import { fetchAllAdminProjects } from '@/app/lib/actions';
import Link from 'next/link';
import Table from '../../Component/Table';

export default async function Tables() {
  const session = await getServerSession(authOptions);
  console.log(session);

  const datas = await fetchAllAdminProjects(session?.id);

  return (
    <>
      <table className='w-full '>
        <thead>
          <tr>
            <th>TITLE</th>
            <th>DATE</th>
            <th>REGISTRATION NUMBER</th>
          </tr>
        </thead>

        <tbody>
        {datas?.map((data) => (
            <Link href={`/Projects/${data.projectId}`} key={data.projectId}>
              <Table
              title={data.title}
              date={data.createdAt.toLocaleDateString()}
              regNumber={'${data?.userId}'}
            />
            </Link>  
          ))}
         
        </tbody>
      </table>
    </>
  );
}
