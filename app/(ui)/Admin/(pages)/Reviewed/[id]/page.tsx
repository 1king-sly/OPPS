'use server'
import React from 'react';
import { getServerSession } from 'next-auth';
import {  fetchSingleProject,updateProject } from '@/app/lib/actions';
import {  redirect } from 'next/navigation';
import NotFound from './not-found';
import { authOptions } from '@/utils/authUptions';
import UpdateProject from '../../../Component/UpdateProject';
import View from '../../../Component/View';

export default async function Page({ params }: { params: { id: string } }) {



    const projectId = params.id
    
    const project = await fetchSingleProject(projectId)

    if(!project){
     return <NotFound/>
    }
  return (
    <>
       <View project={project} />

    </>
  );
}