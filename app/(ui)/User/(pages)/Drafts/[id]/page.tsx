'use client'
import React, { useState, useEffect } from 'react';
import { getServerSession } from 'next-auth';
import { fetchSingleProject } from '@/app/lib/actions';
import NotFound from './not-found';
import { redirect } from 'next/navigation';

export default function Page({ params }: { params: { id: string } }) {

  
  const [project, setProject] = useState<any>(null);
  const [editedAnswers, setEditedAnswers] = useState({
    ans1: '',
    ans2: '',
    ans3: '',
    ans4: '',
  });


  
  

  

  useEffect(() => {
    const handleFetch =async()=>{

      const session = await getServerSession();
        if (!session) {
          redirect('/');
        }
  
        const projectId = params.id;
        const projectData = await fetchSingleProject(projectId);
  
        if (projectData) {
          setProject(projectData);
          setEditedAnswers({
            ans1: projectData.ans1 || '',
            ans2: projectData.ans2 || '',
            ans3: projectData.ans3 || '',
            ans4: projectData.ans4 || '',
          });
        }
      
    }
  },[params.id]);

  if (!project) {
    return <NotFound />;
  }

  const handleAnswerChange = (event: React.ChangeEvent<HTMLTextAreaElement>, fieldName: string) => {
    const { value } = event.target;
    setEditedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [fieldName]: value,
    }));
  };

  return (
    <>
      <div className="w-full min-h-screen flex flex-col items-center justify-center pb-16 mt-4">
        <div className="flex flex-col items-center">
          <div className="w-5/6 mx-auto flex flex-col text-black gap-10">
            <div>
              <h1 className="w-full flex justify-center md:text-lg gap-1">
                Title: <span className="underline">{project?.title}</span>{' '}
              </h1>
              <div className="px-4">
                <div className="w-full flex justify-center ">
                  Problem identification and background/Needs assessment
                </div>
                <div className="text-sm">
                  What issue/challenge/gap does the project aim to address? The objectives should be clear, measurable,
                  realistic and achievable within the duration of the project. For each objective, define appropriate
                  indicators for measuring achievement (including a unit of measurement, baseline value and target
                  value)
                </div>
              </div>
              <div className="mt-2 px-4 bg-gray-100 py-2">
                <textarea
                title='Question 1'
                  value={editedAnswers.ans1}
                  onChange={(e) => handleAnswerChange(e, 'ans1')}
                  className="w-full h-24 p-2 resize-none"
                />
              </div>
            </div>
            <div>
              <div className="px-4">
                <div className="w-full flex justify-center ">Research Purpose and anticipated results</div>
              </div>
              <div className="mt-2 px-4 bg-gray-100 py-2">
                <textarea
                   title='Question 2'
                  value={editedAnswers.ans2}
                  onChange={(e) => handleAnswerChange(e, 'ans2')}
                  className="w-full h-24 p-2 resize-none"
                />
              </div>
            </div>
            <div>
              <div className="px-4">
                <div className="w-full flex justify-center ">Project Design and Methodology</div>
                <div className="text-sm">
                  Outline the approach and methodology behind the project. Explain why they are the most suitable for
                  achieving the project’s objectives.
                </div>
              </div>
              <div className="mt-2 px-4 bg-gray-100 py-2">
                <textarea
                  title='Question 3'
                  value={editedAnswers.ans3}
                  onChange={(e) => handleAnswerChange(e, 'ans3')}
                  className="w-full h-24 p-2 resize-none"
                />
              </div>
            </div>
            <div>
              <div className="px-4">
                <div className="w-full flex justify-center ">Gender Equality, Equity, and Inclusion considerations</div>
              </div>
              <div className="mt-2 px-4 bg-gray-100 py-2">
                <textarea
                title='Question 4'
                  value={editedAnswers.ans4}
                  onChange={(e) => handleAnswerChange(e, 'ans4')}
                  className="w-full h-24 p-2 resize-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
