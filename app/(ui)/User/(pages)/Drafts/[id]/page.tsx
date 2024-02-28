'use server'
import React, { useState, useEffect } from 'react';
import { getServerSession } from 'next-auth';
import { fetchSingleDraft } from '@/app/lib/actions';
import NotFound from './not-found';
import { redirect } from 'next/navigation';
import Draft from '../../../Component/Draft';

export default async function Page({ params }: { params: { id: string } }) {

  const projectId = params.id
  const project = await fetchSingleDraft(projectId)

  if(!project){
    return <NotFound/>
  }
  
  return (
    <>
      <Draft project={project}/>
    </>
  );
}
