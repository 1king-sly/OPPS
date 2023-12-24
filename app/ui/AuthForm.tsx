import React, { useCallback, useState } from 'react'
import Input from './Input'
import Button from './Button'

type variant = 'REGISTER'| 'LOGIN'
export default function AuthForm() {
    const [variant,setVariant] = useState<variant>('LOGIN')

    const [loading,setisLoading]=useState(false)

    const toggleVariant = useCallback(()=>{
        if(variant === 'LOGIN'){
            setVariant('REGISTER')
        }else{
            setVariant('LOGIN')
        }
    },[variant])
   
    
  return (
    <>
     <div className=' mx-16 bg-white px-4 py-2 mt-2'>
        <form >
        {variant === 'REGISTER' && (<>
        <Input id='FName' label='First Name' type='text' required placeholder='Enter First Name' ></Input>
        <Input id='SName' label='Second Name' required type='text' placeholder='Enter Second Name' ></Input>
        </>
      )}
        <Input required id='email' label='Student Email' type='email' placeholder='Enter Student Email' ></Input>
        <Input required id='Pword' label='Password' type='password' placeholder='Enter Password' ></Input>

        <div>
            <Button type='submit'  fullWidth>
                {variant ==='LOGIN'? 'Sign in':'Register'}
            </Button>
        </div>
     </form>

     {/* <div className='mt-6'>
        <div className='relative'>
            <div className='absolute inset-0 flex items-center'>
                <div className='w-full border-t border-gray-300'>
                </div>
                <div className='relative flex justify-center text-sm'>
                    <span className='bg-white px-2 text-gray-500'>
                       or continue with
                    </span>
                </div>
            authentication buttons
            </div>
        </div>

     </div> */}
        <div className='flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500'>
            <div>
                {variant ==='LOGIN'? 'Create an account?':"Already have an account?"}
            </div>
            <div onClick={toggleVariant} className='underline cursor-pointer'>
                {}{variant ==='LOGIN'? 'Sign up':"Login"}

            </div>
        </div>
     </div>
    </>
  )
}
