'use client'
import React, { useCallback, useEffect, useState } from 'react';
import Input from './Input';
import Button from './Button';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import clsx from 'clsx'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/authUptions';

import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';



type Variant = 'REGISTER' | 'LOGIN';

export default function AuthForm() {
  const [variant, setVariant] = useState<Variant>('LOGIN');
  const [loading, setisLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false); 


  const [formData, setFormData] = useState({
    firstName: '',
    secondName: '',
    email: '',
    password: '',
    registrationNumber: '',
    userType:'STUDENT'
  });

  const toggleLoading = () => {
    setisLoading((prevLoading) => !prevLoading);
  };

  const toggleVariant = useCallback(() => {
    setVariant((prevVariant) => (prevVariant === 'LOGIN' ? 'REGISTER' : 'LOGIN'));
  }, []);

  const session = useSession();

  const router = useRouter();

  useEffect(() => {
    if (session?.status === 'authenticated') {
      if (session.data.userType === 'ADMIN') {
        router.push('/Admin/Dashboard');
      } else if(session.data.userType === 'STUDENT') {
        router.push('/User/Dashboard');
      }
       else if(session.data.userType === 'MODERATOR') {
        router.push('/Moderator/Dashboard');
      }else{
        router.push('/SuperAdmin/Dashboard')
      }

    }
  });

  const handleGuestSubmit = async() =>{
    const event = window.event;
    if (!event) {
      return;
    }
    event.preventDefault();

    toggleLoading();

    router.push('/Guest/Projects');   
  }

  const handleSubmit = async () => {
    const event = window.event;
    if (!event) {
      return;
    }
    event.preventDefault();

    toggleLoading();

    if (variant === 'LOGIN'){
      if(formData.email === ''|| formData.email===null || formData.password === ''|| formData.password===null){
        toggleLoading();
        toast.error('Please fill all the fields')
        throw new Error('Missing fields')
      }
    }else{
      if(formData.firstName === ''|| formData.firstName===null || formData.secondName === ''|| formData.secondName===null || formData.email === ''|| formData.email===null || formData.password === ''|| formData.password===null || formData.registrationNumber === ''|| formData.registrationNumber===null){
        toggleLoading();
        toast.error('Please fill all the fields')
        throw new Error('Missing fields')
      }
    }

    

    try {

     

      if (variant === 'REGISTER') {

        


        toast.loading("Sending request...")

        const preUser = await fetch ('/api/createPreuser',{
          method:'POST',
          body:JSON.stringify(formData)
        })
        toast.dismiss()
        if(preUser?.ok && preUser?.status===200){
          toast.dismiss()
          toast.success('Request sent to admin successfully')
        } else if(!preUser?.ok && preUser?.status===400){
          toast.dismiss()
          toast.error('Something went wrong')
        }
        else if(preUser?.status===402){
          toast.dismiss()
          toast.error('User with credentials already exists')
        }
      }


      if (variant === 'LOGIN') {
        toast.loading("Authenticating user...")

        const callback = await signIn('credentials', {
          ...formData,
          redirect: false,
        });



        if (callback?.status === 401) {
          toast.dismiss();
          toast.error('Unauthorized');
        } else if (callback?.ok && !callback?.error) {
          toast.dismiss();
          toast.success('Logged In');
        }
      }
    } catch (error) {
      toast.dismiss();
      toast.error('Something went wrong');
    } finally {
      toggleLoading();
    }
  };

  useEffect(() => {
    setDisabled(loading);
  }, [loading]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event) {
      return;
    }
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <>
      <div className=' mx-16 bg-white px-4 lg:px-10 py-6 mt-2 gap-2 rounded-md  shadow-lg'>
        <form>
          {variant === 'REGISTER' && (
             <>
             <Input
               id='FName'
               name='firstName'
               label='First Name'
               type='text'
               required
               placeholder='Enter First Name'
               disabled={disabled}
               value={formData.firstName}
               onChange={handleChange}
             />
             <Input
               id='SName'
               name='secondName'
               label='Second Name'
               required
               type='text'
               placeholder='Enter Second Name'
               disabled={disabled}
               value={formData.secondName}
               onChange={handleChange}
             />
             <Input
               id='regNo'
               name='registrationNumber'
               label='Registration Number'
               required
               type='text'
               placeholder='Enter Registration Number'
               disabled={disabled}
               value={formData.registrationNumber}
               onChange={handleChange}
             />
           </>
         )}
         <Input
           required
           id='email'
           name='email'
           label=' Email'
           type='email'
           placeholder='Email address'
           disabled={disabled}
           value={formData.email}
           onChange={handleChange}
            pattern="^[a-zA-Z0-9._%+-]+@mmust\.ac\.ke$"
           
         />
   <div className='relative'>
           <Input
             required
             id='Pword'
             name='password'
             label='Password'
             type={showPassword ? 'text' : 'password'} 
             placeholder='Enter Password'
             disabled={disabled}
             value={formData.password}
             onChange={handleChange}
           />
           <div
             className='absolute inset-y-0 right-0 flex  pr-1 cursor-pointer   items-center mt-7 '
             onClick={togglePasswordVisibility} 
           >
             {showPassword ? (
              <EyeSlashIcon className='w-4 max-[425px]:w-3'/>
             ) : (
               <EyeIcon className='w-4 max-[425px]:w-3'/>
             )}
           </div>
         </div>
          <div className='mt-4 text-gray-100'>
            <Button
              type='submit'
              fullWidth
              onClick={() => handleSubmit()}
              disabled={disabled}
            >
              {variant === 'LOGIN' ? 'Sign in' : 'Register'}
            </Button>
          </div>
        </form>
        <div className='flex gap-2 justify-center text-xs mt-6 px-2 text-gray-500'>
          <div>{variant === 'LOGIN' ? "Don't have an account?": "Already have an account?"}
          </div>
          <div onClick={toggleVariant} className='underline cursor-pointer'>
            {variant === 'LOGIN' ? 'Sign up' : 'Login'}
          </div>
        </div>
        <div className='mt-4 text-gray-100 '>
            <button
              type='submit'
              onClick={() => handleGuestSubmit()}
              disabled={disabled}
              className={clsx(`flex justify-center rounded-md px-2 py-1 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600`,disabled&&'opacity-50 cursor-not-allowed')}
            >
              Access as Guest
            </button>
          </div>
      </div>
    </>
  );
}
