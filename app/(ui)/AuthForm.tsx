'use client'
import React, { useCallback, useEffect, useState } from 'react';
import Input from './Input';
import Button from './Button';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';


type Variant = 'REGISTER' | 'LOGIN';

export default function AuthForm() {
  const [variant, setVariant] = useState<Variant>('LOGIN');
  const [loading, setisLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    secondName: '',
    email: '',
    password: '',
    registrationNumber:'',
  });

  const toggleLoading = () => {
    if (loading === false) {
      setisLoading(true);
      setDisabled(true);
    } else {
      setisLoading(false);
      setDisabled(false);
    }
  };

  const toggleVariant = useCallback(() => {
    setVariant((prevVariant) => (prevVariant === 'LOGIN' ? 'REGISTER' : 'LOGIN'));
  }, []);

  const session = useSession()
  const {data: userType} = useSession()

  const router = useRouter()


  useEffect(()=>{
    if(session?.status ==='authenticated'){
        if(session.data.userType === 'ADMIN'){
          router.push('/Admin/Dashboard')
        }else{
          router.push('/User/Dashboard')
        }
        
    }
  })

  const handleSubmit = async () => {
    const event = window.event; 
    if (!event) {
      return;
    }
    event.preventDefault();

    setisLoading(true)

    if(variant === 'REGISTER'){
      axios.post('/api/register', formData)
      .catch(()=>toast.error('Something went wrong'))
      .finally(()=> setisLoading(false))
      .then(()=> signIn('credentials',formData))
    }
    if(variant === 'LOGIN'){
      signIn('credentials',{
        ...formData,
        redirect: false,
      })
      .then((callback)=>{
        if(callback?.error) toast.error("Invalid Credentials")
        if(callback?.ok && !callback?.error){
          toast.success("Logged In")
        }
      })
      .finally(()=> setisLoading(false))
    }
  
   

    
  };
  
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
  

  return (
    <>
      <div className=' mx-16 bg-white px-10 py-6 mt-2 gap-2 rounded-md  shadow-lg'>
        <form >
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
                placeholder='Enter Registration Numbe'
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
            label='Student Email'
            type='email'
            placeholder='Enter Student Email'
            disabled={disabled}
            value={formData.email}
            onChange={handleChange}
          />
          <Input
            required
            id='Pword'
            name='password'
            label='Password'
            type='password'
            placeholder='Enter Password'
            disabled={disabled}
            value={formData.password}
            onChange={handleChange}
          />

          <div className='mt-4 text-gray-100'>
          <Button type='submit' fullWidth onClick={() => { handleSubmit(); toggleLoading(); }}
           disabled={disabled}>
              {variant === 'LOGIN' ? 'Sign in' : 'Register'}
            </Button>

          </div>
        </form>
        <div className='flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500'>
          <div>{variant === 'LOGIN' ? 'Create an account?' : 'Already have an account?'}</div>
          <div onClick={toggleVariant} className='underline cursor-pointer'>
            {variant === 'LOGIN' ? 'Sign up' : 'Login'}
          </div>
        </div>
      </div>
    </>
  );
}