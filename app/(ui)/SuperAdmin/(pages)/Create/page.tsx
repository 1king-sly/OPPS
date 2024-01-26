'use client'
import { getServerSession } from 'next-auth';
import {  createUser } from '@/app/lib/actions';
import {  redirect } from 'next/navigation';
import Button from '@/app/(ui)/Button';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';




export default  function Page() {

  const [loading, setisLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    secondName: '',
    email: '',
    registrationNumber: '',
    userType:'',
    school:'',
    password:'',
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
      const create = await fetch('/api/createUser',{
        method:"POST",
        body:JSON.stringify(formData)
      })
      if(create?.ok && create?.status===200){
        toast.success('User Created Successfully')
        router.push('/SuperAdmin/Users')
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
  const handleChange = (event: React.ChangeEvent< HTMLSelectElement|HTMLInputElement>) => {
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
       <div className='w-full h-full flex items-center justify-center '>
      <div className='shadow-lg rounded-md flex flex-col w-96 h-96  items-center justify-center gap-2 '>
        <div>
            <h1>Fill in the user Details</h1>
        </div>
        <form >
        <div className=' gap-3 flex flex-col ' >
          <label >
          <input type="text"  className='bg-white outline-sky-400 px-2 py-1 rounded-md' placeholder='First Name' name='firstName' required 
          value={formData.firstName}
          onChange={handleChange}/>

          </label>
          <label >
          <input type="text"  className='bg-white outline-sky-400 px-2 py-1 rounded-md ' placeholder='Second Name' name='secondName' required
          value={formData.secondName}
          onChange={handleChange} />

          </label>
          <label >
          <input type="email" name='email' className='bg-white outline-sky-400 px-2 py-1 rounded-md ' placeholder='Email address' required 
          value={formData.email}
          onChange={handleChange}/>

          </label>
          <label >
          <input type="text" name='registrationNumber' className='bg-white outline-sky-400 px-2 py-1 rounded-md ' placeholder='Registration Number' required 
          value={formData.registrationNumber}
          onChange={handleChange}/>

          </label>
          <label>
                <select
                  name='userType'
                  className='bg-white outline-sky-400 px-2 py-1 rounded-md w-full '
                  required
                  title='userType'
                  value={formData.userType}
                onChange={handleChange}
                >
                  <option value='ADMIN'>Admin</option>
                  <option value='STUDENT'>Student</option>
                  <option value='SUPERADMIN'>Super Admin</option>
                </select>
              </label>

              <label>
                <select
                  name='school'
                  className='bg-white outline-sky-400 px-2 py-1 rounded-md w-full '
                  required
                  title='school'
                  value={formData.school}
                onChange={handleChange}
                >
                  <option value='SONAS'>SONAS</option>
                  <option value='SASS'>SASS</option>
                  <option value='SCI'>SCI</option>
                  <option value='MED'>MEDICINE</option>
                  <option value='ENG'>ENGINEERING</option>
                  <option value='LAW'>LAW</option>
                </select>
              </label>
          <label >
          <input type="text" name='password' className='bg-white outline-sky-400 px-2 py-1 rounded-md ' placeholder='Password' required
          value={formData.password}
          onChange={handleChange}/>

          </label>
        </div>
        <div className='mt-2 w-[236px] '>
        <Button type='submit' fullWidth
         onClick={handleSubmit}
          disabled={disabled}>
          CREATE USER
        </Button>
        </div>
       
        </form>
       
        
        


      </div>

    </div>
    </>
  );
}