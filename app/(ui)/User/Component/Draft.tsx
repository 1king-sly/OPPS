'use client'
import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import toast from 'react-hot-toast'
import {convertDraftToProject,addDraft} from '@/app/lib/actions'
import { useRouter } from 'next/navigation'

export default function Draft({project}:{project:any}) {


    const [loading, setisLoading] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [editedAnswers, setEditedAnswers] = useState({
        title:project.title,
        school:project.school,
        ans1:project.ans1 || '',
        ans2:project.ans2 || '',
        ans3:project.ans3 || '',
        ans4:project.ans4 || '',
        id:project.id || '',
      });

      const router = useRouter()

      const toggleLoading = () => {
        setisLoading((prevLoading) => !prevLoading);
      };


      const handleSubmit = async (action:string)=>{
        const event = window.event;
        if (!event) {
          return;
        }
        event.preventDefault();

        if(editedAnswers.title === ''|| editedAnswers.title===null || editedAnswers.school === ''|| editedAnswers.school===null || editedAnswers.ans1 === ''|| editedAnswers.ans1===null || editedAnswers.ans2 === ''|| editedAnswers.ans2===null || editedAnswers.ans3 === ''|| editedAnswers.ans3===null || editedAnswers.ans4 === ''|| editedAnswers.ans4===null || editedAnswers.id === ''|| editedAnswers.id===null ){
          toast.error('Please fill all the fields')
          throw new Error('Missing fields')
        }
    
        toggleLoading();
        if(action === 'CREATE'){ 
          try{
              toast.loading('Creating project...')
              const create = await convertDraftToProject(editedAnswers)
              if(create){
                toast.dismiss();
                toast.success('Project Created Successfully')
                router.push('/User/Dashboard')
             } else{
              toast.dismiss();
                toast.error('Something went wrong')
              }
        
            }catch(error){
             console.log(error)
              toast.dismiss();
              toast.error('Server Side error')
            }finally {
              toggleLoading();
            }
        } else{

          try{
              toast.loading('Saving to draft...')
              const create = await addDraft(editedAnswers)
              if(create){
                toast.dismiss();
                toast.success('Drafted successfully')
                router.push('/User/Dashboard')
             } else{
              toast.dismiss();
                toast.error('Something went wrong')
              }
        
            }catch(error){
             console.log(error)
              toast.dismiss();
              toast.error('Server Side error')
            }finally {
              toggleLoading();
            }

          
        }

        
      }
      useEffect(() => {
        setDisabled(loading);
      }, [loading]);

      const handleAnswerChange = (event: React.ChangeEvent<HTMLTextAreaElement>, fieldName: string) => {
        const { value } = event.target;
        setEditedAnswers((prevAnswers) => ({
          ...prevAnswers,
          [fieldName]: value,
        }));
      };
    
  return (
   <>
   
   <div className="w-full min-h-screen flex flex-col items-center justify-center pb-40 mt-4">
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
              <div className="mt-2">
                <textarea
                autoFocus
                title='Question 1'
                  value={editedAnswers.ans1}
                  onChange={(e) => handleAnswerChange(e, 'ans1')}
                  className="w-full min-h-60 p-2 resize-none outline-sky-200 mt-3 max-h-fit  "
                />
              </div>
            </div>
            <div>
              <div className="px-4">
                <div className="w-full flex justify-center ">Research Purpose and anticipated results</div>
              </div>
              <div className="mt-2 ">
                <textarea
                   title='Question 2'
                   autoFocus
                  value={editedAnswers.ans2}
                  onChange={(e) => handleAnswerChange(e, 'ans2')}
                  className="w-full min-h-60 p-2 resize-none outline-sky-200 mt-3 max-h-fit"
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
              <div className="mt-2 ">
                <textarea
                  title='Question 3'
                  autoFocus
                  value={editedAnswers.ans3}
                  onChange={(e) => handleAnswerChange(e, 'ans3')}
                  className="w-full min-h-60 p-2 resize-none outline-sky-200 mt-3 max-h-fit"
                />
              </div>
            </div>
            <div>
              <div className="px-4">
                <div className="w-full flex justify-center ">Gender Equality, Equity, and Inclusion considerations</div>
              </div>
              <div className="mt-2">
                <textarea
                title='Question 4'
                autoFocus
                  value={editedAnswers.ans4}
                  onChange={(e) => handleAnswerChange(e, 'ans4')}
                  className="w-full min-h-60 p-2 resize-none outline-sky-200 mt-3 max-h-fit"
                />
              </div>
            </div>

            <div className='w-full flex justify-end gap-20'>

            <button type='submit' onClick={() => handleSubmit('DRAFT')}
              disabled={disabled}
              className={clsx(`flex justify-center rounded-md px-3 py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600`,disabled&&'opacity-50 cursor-not-allowed')}
               >Save as Draft</button>


              <button type='submit' onClick={() => handleSubmit('CREATE')}
              disabled={disabled}
              className={clsx(`flex justify-center rounded-md px-3 py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600`,disabled&&'opacity-50 cursor-not-allowed')}
               >Submit</button>
             
            </div>
          </div>
        </div>
      </div>
   
   </>
  )
}
