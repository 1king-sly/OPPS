'use client'
import React, { useEffect, useState } from 'react'
import Button from '../../Button';

export default function Draft({project}:{project:any}) {

    const [loading, setisLoading] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [editedAnswers, setEditedAnswers] = useState({
        ans1:project.ans1 || '',
        ans2:project.ans2 || '',
        ans3:project.ans3 || '',
        ans4:project.ans4 || '',
      });


      const toggleLoading = () => {
        setisLoading((prevLoading) => !prevLoading);
      };


      const handleSubmit = async ()=>{
        const event = window.event;
        if (!event) {
          return;
        }
        event.preventDefault();
    
        toggleLoading();

        console.log(editedAnswers)
        try{
        //   toast.loading('Creating project...')
        //   const create = await addProject(formData)
        //   if(create){
        //     toast.dismiss();
        //     toast.success('Project Created Successfully')
        //     router.push('/User/Dashboard')
        //  } else{
        // //   toast.dismiss();
        // //     toast.error('Something went wrong')
        //   }
    
        }catch(error){

            console.log(error)
        //   toast.dismiss();
        //   toast.error('Server Side error')
        }finally {
          toggleLoading();
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

            <div className='w-full flex justify-end'>
              <Button type='submit'              onClick={handleSubmit}
              disabled={disabled}

               >Submit</Button>
            </div>
          </div>
        </div>
      </div>
   
   </>
  )
}
