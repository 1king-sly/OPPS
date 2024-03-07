'use server'
import React from 'react';
import {  fetchSingleProject } from '@/app/lib/actions';
import NotFound from './not-found';
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