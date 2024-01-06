'use server'

import React from 'react';
import { getServerSession } from 'next-auth';
import authOptions from '@/utils/authUptions';
import { acceptProject, fetchAllAdminProjects, fetchSingleProject, rejectProject } from '@/app/lib/actions';
import { notFound } from 'next/navigation';

export default async function Page({params}) {

    const session = await getServerSession(authOptions)
    if(!session){
        return null
    }
    const userId = session?.id
    const projectId = params.id
    const project = await fetchSingleProject(userId,projectId)


    if(!project){
      notFound()
    }

    const handleSubmit = async (event) => {
      // 'use server'
      event.preventDefault();
  
      // Get form data
      console.log(event)
      const { comment, status } = event.target.elements;
  
      // try {
      //   // Call appropriate server action based on status
      //   if (status.value === 'REJECT') {
      //     await rejectProject(event); // Assuming rejectProject accepts a comment
      //   } else {
      //     await acceptProject(event); // Assuming acceptProject accepts a comment
      //   }
  
      //   // Handle success (e.g., redirect or display a success message)
      //   console.log('Project status updated successfully!');
  
      // } catch (error) {
      //   // Handle errors (e.g., display an error message)
      //   console.error('Error updating project status:', error);
      // }
    };

    
 
  return (
    <>
      <div className='w-full min-h-screen flex flex-col items-center justify-center pb-16 mt-4'>
        <div className='flex flex-col items-center'>
          <div className='w-5/6 mx-auto flex flex-col text-black gap-10'>
            


          
          <div>
            { project?.status === 'PENDING'?(
                <>
              <form onSubmit={handleSubmit}>
              {/* <p>Add a comment (Optional)</p>
              <textarea name="comment" id="comment" placeholder='Add a comment' className='w-full outline-sky-300 resize-none p-2 h-48 text-gray-900'></textarea> */}
              <div className='w-full justify-around flex mt-2'>

              <input type="text" name='userId' title='userId' className='hidden' value={userId}  />
              
              <input type="text" name='projectId' title='projectId' value={projectId} className='hidden'  />

              <button type='submit' name='status' value='REJECT' className='p-3 bg-rose-500  rounded-md '>Reject</button>
              <button type='submit' name='status' value='ACCEPT' className='p-3 bg-green-500 rounded-md '>Accept</button>

              </div>

            </form>

                </>
            ): null}
          
           


          </div>
       
          
          
            

          </div>

         
         
        </div>
       </div>
    </>
  );
}
