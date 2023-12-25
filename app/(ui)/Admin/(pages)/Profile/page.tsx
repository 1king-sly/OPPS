'use client'
import React,{useState} from 'react'
import Image from 'next/image'
import profile from '@/public/images/profile.png'
import Button from '@/app/(ui)/Button'


export default function Page() {

  // const [selectedImage, setSelectedImage] = useState(null);
  // const [imagePreview, setImagePreview] = useState(null);

  // const handleImageChange = (event) => {
  //   const file = event.target.files[0];
  
  //   if (file) {
  //     const reader = new FileReader();
  
  //     reader.onloadend = () => {
  //       setSelectedImage(reader.result);
  //       setImagePreview(reader.result);
  //     };
  
  //     reader.readAsDataURL(file);
  //   }
  // };
  return (
    <>
    <div className='w-full h-full flex items-center justify-center '>
      <div className='shadow-lg rounded-md flex flex-col w-96 h-96  items-center justify-center'>
        <div className=' h-24 flex items-center justify-center  gap-4 px-2'>
          <Image className='h-20 w-20 rounded-full shadow-md' src={profile} alt='profile'></Image>

          <Button>
          <label className=" ">
                <p className=''>Edit</p>
                <input
                  type="file"
                  accept="image/*"
                  sr-only
                  className='hidden'
                  // onChange={handleImageChange}
                
                />
           </label>
          </Button>
         
        </div>

        <div className=' gap-3 flex flex-col ' >
          <label >
          <p className='text-sm'>Name</p>
          <input type="text" disabled className='bg-white outline-sky-400 px-2 py-1 rounded-md ' placeholder='Byrone Kinsly' />

          </label>
          <label >
          <p className='text-sm'>Email Address</p>
          <input type="email" className='bg-white outline-sky-400 px-2 py-1 rounded-md ' placeholder='kinslybyrone17@gmail.com' />

          </label>
          <label  >
          <p className='text-sm'>Contacts</p>
          <input type="text" className='bg-white outline-sky-400 px-2 py-1 rounded-md ' placeholder='0720041750' />

          </label>


        </div>
        <div className='mt-2 w-[236px] '>
        <Button type='submit' fullWidth>
          SAVE
        </Button>
        </div>
       

        



      </div>

    </div>
    </>
  )
}
