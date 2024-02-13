'use client'
import Button from '@/app/(ui)/Button';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { createUser } from '@/app/lib/actions';

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
      toast.loading('Creating user...')
      const create = await createUser(formData)
      if(create){
        toast.dismiss();
        toast.success('User Created Successfully')
        router.push('/SuperAdmin/Users')
     } else {
      toast.dismiss();
        toast.error('Something went wrong')
      }

    }catch(error){
      toast.dismiss();
      toast.error('Server Side error')
    }finally {
      toggleLoading();
    }
  }
  useEffect(() => {
    setDisabled(loading);
  }, [loading]);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!event) {
      return;
    }
  
    const { name, value } = event.target;
  
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
          disabled={disabled}
          onChange={handleChange}/>

          </label>
          <label >
          <input type="text"  className='bg-white outline-sky-400 px-2 py-1 rounded-md ' placeholder='Second Name' name='secondName' required
          value={formData.secondName}
          disabled={disabled}
          onChange={handleChange} />

          </label>
          <label >
          <input type="email" name='email' className='bg-white outline-sky-400 px-2 py-1 rounded-md ' placeholder='Email address' required 
          value={formData.email}
          disabled={disabled}
          onChange={handleChange}/>

          </label>
          <label >
          <input type="text" name='registrationNumber' className='bg-white outline-sky-400 px-2 py-1 rounded-md ' placeholder='Registration Number' required 
          value={formData.registrationNumber}
          disabled={disabled}
          onChange={handleChange}/>

          </label>
          <label>
                <select
                  name='userType'
                  className='bg-white outline-sky-400 px-2 py-1 rounded-md w-full text-gray-800 text-sm '
                  required
                  title='userType'
                  value={formData.userType}
                onChange={handleChange}
                disabled={disabled}
                >
                  <option disabled value=''>
                   Choose User Type
                  </option> 
                  <option value='STUDENT'>Student</option>
                  <option value='ADMIN'>Admin</option>
                  <option value='SUPERADMIN'>Super Admin</option>
                  <option value='MODERATOR'>External Moderator</option>
                </select>
              </label>

              <label>
                <select
                  name='school'
                  className='bg-white outline-sky-400 px-2 py-1 rounded-md w-full text-gray-800 text-sm '
                  required
                  title='school'

                  value={formData.school}
                onChange={handleChange}
                disabled={disabled}
                >
                <option disabled value=''>
                Choose School (Optional)
                </option>
                  <option value='SONAS'>SONAS</option>
                  <option value='SASS'>SASS</option>
                  <option value='SCI'>SCI</option>
                  <option value='MEDICINE'>MEDICINE</option>
                  <option value='ENGINEERING'>ENGINEERING</option>
                  <option value='LAW'>LAW</option>
                </select>
              </label>
          <label >
          <input type="text" name='password' className='bg-white outline-sky-400 px-2 py-1 rounded-md ' placeholder='Password' required
          value={formData.password}
          disabled={disabled}
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