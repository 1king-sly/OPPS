'use client'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import clsx from 'clsx';
import { useRouter } from 'next/router';

export default function Validate({email,registrationNumber,firstName,secondName,hashedPassword,userType}:{email:string,registrationNumber:string,firstName:string,secondName:string,hashedPassword:string,userType:string}) {
    const [loading, setisLoading] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [formData, setFormData] = useState({
        firstName:firstName,
        secondName:secondName,
        hashedPassword:hashedPassword,
        email: email,
        userType:userType,
        registrationNumber: registrationNumber,
        status:'',
      });
      const router = useRouter()
      const toggleLoading = () => {
        setisLoading((prevLoading) => !prevLoading);
      };
      const handleSubmit= async (referBtnValue: string)=>{
        const event = window.event
        if(!event){
            return;
        }
        event.preventDefault()


       setFormData((prevFormData) => ({
          ...prevFormData,
          status: referBtnValue,
        }));

          toggleLoading();

          try{

            setFormData((prevFormData) => ({
              ...prevFormData,
              status: referBtnValue,
            }));
            toast.loading('Validating user...')
            const update = await fetch ('/api/validate',{
              method:"POST",
              body:JSON.stringify(formData)
            })
  
            if(update?.ok && update?.status===200){
              toast.dismiss()
              toast.success('Updated')
              router.reload()
            }else if(update?.status !== 200){
              toast.dismiss()
              toast.error('Something went wrong')
            }
          }catch(error){
            toast.dismiss()
            toast.error('Something went wrong')
          }finally{
            toggleLoading();
          }    
      }

      useEffect(() => {
        setDisabled(loading);
      }, [loading]);

  return (
    <div className ='w-full flex justify-between'>
        <button className={clsx('p-2 bg-rose-500  rounded-md',disabled&&`opacity-50 cursor-not-allowed`)} disabled={disabled}  onClick={() => handleSubmit('DECLINE')}>Decline</button>
        <button className={clsx('p-2 bg-sky-300  rounded-md',disabled&&`opacity-50 cursor-not-allowed`)} disabled={disabled}  onClick={() => handleSubmit('APPROVE')}>Approve</button>
    </div>
  )
}
