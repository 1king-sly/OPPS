'use client'
import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';


export default function Refer({projectId,userName}:{projectId:string,userName:string}) {
    const [loading, setisLoading] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [formData, setFormData] = useState({
        email: '' || null,
        projectId: projectId,
        updatedBy: userName,
        status:'',
        comment:'',
      });

      const router = useRouter()
      
      const [visible,setIsvisible] = useState(false)

      const toggleVisibility = () =>{
        setIsvisible((prevVisible) => !prevVisible)
      }

      const toggleLoading = () => {
        setisLoading((prevLoading) => !prevLoading);
      };
    

      const handleChange = (event: React.ChangeEvent<HTMLInputElement| HTMLTextAreaElement>) => {
        if (!event) {
          return;
        }
        const { name, value } = event.target;
        setFormData({
          ...formData,
          [name]: value,
        });
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
            toast.loading('Updating Project...')
            const update = await fetch ('/api/updateProject',{
              method:"PUT",
              body:JSON.stringify(formData)
            })
  
            if(update?.ok && update?.status===200){
              toast.dismiss()
              toast.success('Project updated successfully')
              router.reload()
              router.push('/Admin/Projects')

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
      <div className='w-full h-full '>
              <p>Add a comment (Optional)</p>
              <textarea name="comment" id="comment" placeholder='Add a comment' className='w-full outline-sky-300 resize-none p-2 h-48 text-gray-900'
              onChange={handleChange} disabled={disabled}
              ></textarea>
        <div className='w-full justify-around flex mt-2'>
        <button className={clsx(`bg-orange-300 p-3 rounded-md`,visible && `hidden`)}  onClick={toggleVisibility } disabled={disabled}>
           External Moderator
        </button>
        <button className={clsx(`p-3 bg-green-500 rounded-md`,visible && `hidden`)} onClick={() => handleSubmit('ACCEPTED')} disabled={disabled}>
           ACCEPT
        </button>
        <button className={clsx(`p-3 bg-rose-500  rounded-md`,visible && `hidden`)} onClick={() => handleSubmit('REJECTED')} disabled={disabled}>
           REJECT
        </button>
      </div>
        
        <div className={clsx(`w-full flex flex-col`,!visible&&`hidden`)}>
        <input type="email" name='email' title='refer email' onChange={handleChange} disabled={disabled} className='p-3 '  />

        <div className='w-full flex justify-end mt-3'>

            <button className='bg-orange-300 p-3 rounded-md'  name='status'  disabled={disabled}  onClick={() => handleSubmit('REFERRED')}>
                    REFER
                </button>
            </div>
        </div>
       

    </div>
  )
}
