'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import logo from '@/public/images/Mmust logo.png';
import Button from '@/app/(ui)/Button';
import Question from './Question';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { addProject,addDraft } from '@/app/lib/actions';
import clsx from 'clsx'
import PdfViewer from '@/app/(ui)/Component/PdfViewer';

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
    fileUrls: {}
  });
  const toggleLoading = () => {
    setisLoading((prevLoading) => !prevLoading);
  };

  const router = useRouter()
  const handleSubmit = async (action:string)=>{
    const event = window.event;
    if (!event) {
      return;
    }
    event.preventDefault();

  

    toggleLoading();

    if(action === 'CREATE'){ 

      if(formData.title === ''|| formData.title===null || formData.schoolFromFormData === ''|| formData.schoolFromFormData===null || formData.ans1 === ''|| formData.ans1===null || formData.ans2 === ''|| formData.ans2===null || formData.ans3 === ''|| formData.ans3===null || formData.ans4 === ''|| formData.ans4===null ){
        toast.error('Please fill all the fields')
        toggleLoading();
        throw new Error('Missing fields')
      }
          try{
              toast.loading('Creating project...')
              const create = await addProject(formData)
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

          if(formData.title === ''|| formData.title===null ){
            toast.error('Please provide  title first ')
            throw new Error('Missing fields')
          }

          try{
              toast.loading('Saving to draft...')
              const create = await addDraft(formData)
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

  useEffect(() => {
    const handleVisibilityChange = () => {

      if(!formData.title || !formData.schoolFromFormData){
        return
      }
      if (document.visibilityState === 'hidden') {

       
        // addDraft(formData);
      }
    };

    const idleTimer = setTimeout(() => {
      // addDraft(formData);
    }, 60000);

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearTimeout(idleTimer);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [formData]);
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement| HTMLInputElement>) => {
    if (!event) {
      return;
    }
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileUpload = (identifier: string) => async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'psy5tipf');

        const response = await fetch('https://api.cloudinary.com/v1_1/dwav3nker/upload', {
          method: 'POST',
          body: formData
        });

        if (!response.ok) {
          throw new Error('Failed to upload file to Cloudinary');
        }

        const data = await response.json();
        const fileUrl = data.secure_url;

        setFormData((prevFormData) => ({
          ...prevFormData,
          fileUrls: {
            ...prevFormData.fileUrls,
            [identifier]: fileUrl
          }
        }));

      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
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
                className='resize-none p-2 h-10 w-80 flex items-center rounded-md outline-sky-200 overflow-hidden  '
                maxLength={50}
                value={formData.title}
                onChange={handleChange}
                disabled={disabled}
                required={true}

                
                
              ></textarea>
             
             <label>
                
                <select
                  name='schoolFromFormData'
                  className='bg-white outline-sky-400 px-2 py-1 rounded-md w-80 text-gray-800 text-sm  '
                  required
                  title='school'
                  value={formData.schoolFromFormData}
                  onChange={handleChange}
                  disabled={disabled}


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
          max={1000}
          question=' Problem identification and background/Needs assessment'
          instructions='What issue/challenge/gap does the project aim to address? The objectives should be clear, measureable, realistic and achievable within the duration of the project. For each objective, define appropriate indicators for measuring achievement (including a unit of measurement, baseline value and target value)'          
          name='ans1'  
          value={formData.ans1}
          onChange={handleChange}
          disabled={disabled}
          attach={true}
          identifier='ans1'
          handleFileUpload={handleFileUpload('ans1')}



        />
        <Question
          number='b'
          id='Question 2'
          max={800}
          question=' Research Purpose and anticipated results'
          name='ans2'
          value={formData.ans2}
          onChange={handleChange}
          disabled={disabled}


        />
        <Question
          number='c'
          id='Question 3'
          max={1000}
          question='Project Design and Methodology'
          instructions='Outline the approach and methodology behind the project. Explain why they are the most suitable for achieving the project’s objectives.'
          name='ans3'
          value={formData.ans3}
          onChange={handleChange}
          disabled={disabled}
          attach={true}
          identifier='ans3'
          handleFileUpload={handleFileUpload('ans3')}


          
        />
        <Question
          number='d'
          id='Question 4'
          max={1000}
          question=' Gender Equality, Equity, and Inclusion considerations'
          name='ans4'
          value={formData.ans4}
          onChange={handleChange}
          disabled={disabled}

        />
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
          </form>
        </div>
      </div>

     
    </>
  );
}


