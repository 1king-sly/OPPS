'use client'
import React, { useCallback, useState } from 'react'

import Input from './Input'
import Button from './Button'

type variant = 'REGISTER'| 'LOGIN'
export default function AuthForm() {
    const [variant,setVariant] = useState<variant>('LOGIN')

    const [loading,setisLoading]=useState(false)
    const [disabled,setDisabled] = useState(false)



    const toggleLoading = ()=>{
        if(loading === false){
            setisLoading(true)
            setDisabled(true)
            console.log(disabled)

        }else{
            setisLoading(false)
            setDisabled(false)
            console.log(disabled)


        }
    }

    const toggleVariant = useCallback(()=>{
        if(variant === 'LOGIN'){
            setVariant('REGISTER')
        }else{
            setVariant('LOGIN')
        }
    },[variant])
   
    
  return (
    <>
     <div className=' mx-16 bg-white px-10 py-6 mt-2 gap-2 rounded-md  shadow-lg'>
        <form >
        {variant === 'REGISTER' && (<>
        <Input id='FName' label='First Name' type='text' required placeholder='Enter First Name' disabled={disabled} ></Input>
        <Input id='SName' label='Second Name' required type='text' placeholder='Enter Second Name' disabled={disabled} ></Input>
        </>
      )}
        <Input required id='email' label='Student Email' type='email' placeholder='Enter Student Email' disabled={disabled} ></Input>
        <Input required id='Pword' label='Password' type='password' placeholder='Enter Password' disabled={disabled} ></Input>

        <div className='mt-4 text-gray-100'>
            <Button type='submit'  fullWidth onClick={toggleLoading} disabled={disabled}>
                {variant ==='LOGIN'? 'Sign in':'Register'}
            </Button>
        </div>
     </form>
        <div className='flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500'>
            <div>
                {variant ==='LOGIN'? 'Create an account?':"Already have an account?"}
            </div>
            <div onClick={toggleVariant} className='underline cursor-pointer'>
                {variant ==='LOGIN'? 'Sign up':"Login"}

            </div>
        </div>
     </div>
    </>
  )
}
