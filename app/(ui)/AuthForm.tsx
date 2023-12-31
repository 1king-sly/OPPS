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
    FName: '',
    SName: '',
    email: '',
    Pword: '',
  });

  const toggleLoading = () => {
    if (loading === false) {
      setisLoading(true);
      setDisabled(true);
      console.log(disabled);
    } else {
      setisLoading(false);
      setDisabled(false);
      console.log(disabled);
    }
  };

  const toggleVariant = useCallback(() => {
    setVariant((prevVariant) => (prevVariant === 'LOGIN' ? 'REGISTER' : 'LOGIN'));
  }, []);

  const session = useSession()
  const router = useRouter()

  useEffect(()=>{
    if(session?.status ==='authenticated'){
      router.push('/User/Dashboard')
    }
  })

  const handleSubmit = async (event) => {
    event.preventDefault();
    setisLoading(true)

    if(variant === 'REGISTER'){
      axios.post('/app/api/register', formData)
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
  
    console.log('Before Form Data Log');
    console.log('Form Data:', formData);
    console.log('After Form Data Log');

    
  };
  
  const handleChange = (event) => {
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
                name='FName'
                label='First Name'
                type='text'
                required
                placeholder='Enter First Name'
                disabled={disabled}
                value={formData.FName}
                onChange={handleChange}
              />
              <Input
                id='SName'
                name='SName'
                label='Second Name'
                required
                type='text'
                placeholder='Enter Second Name'
                disabled={disabled}
                value={formData.SName}
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
            name='Pword'
            label='Password'
            type='password'
            placeholder='Enter Password'
            disabled={disabled}
            value={formData.Pword}
            onChange={handleChange}
          />

          <div className='mt-4 text-gray-100'>
          <Button type='submit' fullWidth onClick={() => { handleSubmit(event); toggleLoading(); }} disabled={disabled}>
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