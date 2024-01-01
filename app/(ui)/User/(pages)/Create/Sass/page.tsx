"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import logo from '@/public/images/Mmust logo.png';
import Button from '@/app/(ui)/Button';
import Question from '../Question';
import axios from 'axios';

export default function Page() {
  const [formData, setFormData] = useState({
    title: '',
    ans1:'',
    ans2:'',
    ans3:'',
    ans4:'',
  });

 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log('Form Data:', formData);

      const response = await axios.post('/api/createProject', formData);

      console.log('Project created:', response.data);
    } catch (error) {
      console.error('Error creating project:', error);
      // Handle error as needed
    }

    setFormData({
      title: '',
      ans1: '',
      ans2: '',
      ans3: '',
      ans4: '',
    });
  };

  



  return (
    <>
      <div className='w-full min-h-screen flex flex-col items-center justify-center pb-40'>
        <div className='flex flex-col items-center'>
          <Image src={logo} alt='logo' className='h-24 w-24 object-cover'></Image>
          <h3 className='text-sky-300'>APPLIED SCIENCES PROJECT PROPOSAL</h3>
        </div>

        <div>
          <form className='w-[80vw] flex flex-col gap-2' >
            <div className='w-full flex justify-center'>
              <textarea
                name="title"
                id="title"
                title='title'
                placeholder='Project Title'
                className='resize-none p-2 h-10 w-96 flex items-center rounded-md outline-sky-200 overflow-hidden'
                maxLength={50}
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              ></textarea>
            </div>

            

            <div className='gap-2 flex flex-col'>
        <Question
          number='a'
          id='Question 1'
          max={1000}
          question=' Problem identification and background/Needs assessment'
          instructions='What issue/challenge/gap does the project aim to address? The objectives should be clear, measureable, realistic and achievable within the duration of the project. For each objective, define appropriate indicators for measuring achievement (including a unit of measurement, baseline value and target value)'
          value={formData.ans1}
          onChange={(e) => setFormData({ ...formData, ans1: e.target.value })}
          
        />
        <Question
          number='b'
          id='Question 2'
          max={800}
          question=' Research Purpose and anticipated results'
          value={formData.ans2}
          onChange={(e) => setFormData({ ...formData, ans2: e.target.value })}
          
        />
        <Question
          number='c'
          id='Question 3'
          max={1000}
          question='Project Design and Methodology'
          instructions='Outline the approach and methodology behind the project. Explain why they are the most suitable for achieving the project’s objectives.'
          value={formData.ans3}
          onChange={(e) => setFormData({ ...formData, ans3: e.target.value })}
          
        />
        <Question
          number='d'
          id='Question 4'
          max={1000}
          question=' Gender Equality, Equity, and Inclusion considerations'
          value={formData.ans4}
          onChange={(e) => setFormData({ ...formData, ans4: e.target.value })}
         
        />
      </div>

            <div className='w-full flex justify-end'>
              <Button type='submit' onClick={handleSubmit}>Submit</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
