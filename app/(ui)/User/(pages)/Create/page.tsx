'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import logo from '@/public/images/Mmust logo.png';
import Button from '@/app/(ui)/Button';
import Question from './Question';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';


export default  function Page() {
  const [loading, setisLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    ans1: '',
    ans2: '',
    ans3: '',
    ans4:'',
    schoolFromFormData:'',
  });
  const toggleLoading = () => {
    setisLoading((prevLoading) => !prevLoading);
  };

  const router = useRouter()
  const handleSubmit = async ()=>{
    const event = window.event;
    if (!event) {
      return;
    }
    event.preventDefault();

    toggleLoading();
    try{
      const create = await fetch('/api/createProject',{
        method:"POST",
        body:JSON.stringify(formData)
      })
      if(create?.ok && create?.status===200){
        toast.success('Project Created Successfully')
        router.push('/User/Dashboard')

     } else if(create?.status!==200 ){
        toast.error('Something went wrong')
      }

    }catch(error){
      toast.error('Server Side error')
    }finally {
      toggleLoading();
    }
  }
  useEffect(() => {
    setDisabled(loading);
  }, [loading]);
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>) => {
    if (!event) {
      return;
    }
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  

  return (
    <>
      <div className='w-full min-h-screen flex flex-col items-center justify-center pb-40'>
        <div className='flex flex-col  items-center'>
          <Image src={logo} alt='logo' className='lg:h-24 lg:w-24 object-cover h-16 w-16'></Image>
          <h3 className='text-sky-300 max-[425px]:text-xs'>MMUST ONLINE PROJECT PROPOSAL</h3>
        </div>

        <div>
          <form  className='w-[80vw] flex flex-col gap-2' >
            <div className='w-full flex justify-center items-center flex-col gap-2'>
              <textarea
                name="title"
                id="title"
                title='title'
                placeholder='Project Title'
                className='resize-none p-2 h-10 w-80 flex items-center rounded-md outline-sky-200 overflow-hidden'
                maxLength={50}
                value={formData.title}
                onChange={handleChange}

                
                
              ></textarea>
             
             <label>
                
                <select
                  name='schoolFromFormData'
                  className='bg-white outline-sky-400 px-2 py-1 rounded-md w-80 text-gray-800 text-sm  '
                  required
                  title='school'
                  value={formData.schoolFromFormData}
                  onChange={handleChange}

                >
                   <option disabled value=''>
                   Choose School
                  </option> 
                  <option value='SONAS'>SONAS</option>
                  <option value='SASS'>SASS</option>
                  <option value='SCI'>SCI</option>
                  <option value='MEDICINE'>MEDICINE</option>
                  <option value='ENGINEERING'>ENGINEERING</option>
                  <option value='LAW'>LAW</option>
                </select>
              </label>
          
            
             
            </div>

            

            <div className='gap-2 flex flex-col'>
        <Question
          number='a'
          id='Question 1'
          max={3000}
          question=' Problem identification and background/Needs assessment'
          instructions='What issue/challenge/gap does the project aim to address? The objectives should be clear, measureable, realistic and achievable within the duration of the project. For each objective, define appropriate indicators for measuring achievement (including a unit of measurement, baseline value and target value)'          
          name='ans1'  
          value={formData.ans1}
          onChange={handleChange}


        />
        <Question
          number='b'
          id='Question 2'
          max={2400}
          question=' Research Purpose and anticipated results'
          name='ans2'
          value={formData.ans2}
          onChange={handleChange}

        />
        <Question
          number='c'
          id='Question 3'
          max={3000}
          question='Project Design and Methodology'
          instructions='Outline the approach and methodology behind the project. Explain why they are the most suitable for achieving the project’s objectives.'
          name='ans3'
          value={formData.ans3}
          onChange={handleChange}
          
        />
        <Question
          number='d'
          id='Question 4'
          max={3000}
          question=' Gender Equality, Equity, and Inclusion considerations'
          name='ans4'
          value={formData.ans4}
          onChange={handleChange}
        />
      </div>

            <div className='w-full flex justify-end'>
              <Button type='submit'              onClick={handleSubmit}
              disabled={disabled}

               >Submit</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}


