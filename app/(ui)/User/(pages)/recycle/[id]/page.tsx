'use server'
import React from 'react';
import { getServerSession } from 'next-auth';
import {  fetchSingleRecycle } from '@/app/lib/actions';
import NotFound from './not-found';
import { redirect } from 'next/navigation';
import RecycleView from '../../../Component/RecycleView';

export default async function Page({ params }: { params: { id: string } }) {

  const session = await getServerSession()
  if(!session){
    redirect('/')
  }
  
    const projectId = params.id
    const project = await fetchSingleRecycle(projectId)

    if(!project){
      return <NotFound/>
    }
    
 
  return (
    <>
       <RecycleView project={project}/>
    </>
  );
}
