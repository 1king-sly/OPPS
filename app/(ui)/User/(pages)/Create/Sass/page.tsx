import React from 'react'
import logo from '@/public/images/Mmust logo.png'
import Image from 'next/image'
import Button from '@/app/(ui)/Button'
import Questions from '../Questions'


export default function page() {
  return (
    <>
    <div className='w-full min-h-screen flex flex-col items-center justify-center pb-40'>
      <div className='flex flex-col  items-center '>
        <Image src={logo} alt='logo' className='h-24 w-24 object-cover'></Image>

        <h3 className='text-sky-300'>APPLIED SCIENCES PROJECT PROPOSAL</h3>


      </div>
      <div>
        <form className='w-[80vw]' >
          <Questions></Questions>

          <div className='w-full flex justify-end'>
            <Button type='submit'>Submit</Button>
          </div>
        </form>
      </div>

     

    </div>
    </>
  )
}
