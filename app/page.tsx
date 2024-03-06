import Image from 'next/image'
import students from '@/public/images/student1.png'
import logo from '@/public/images/Mmust logo.png'
import AuthForm from '@/app/(ui)/AuthForm'
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';


export default function Home() {
  return (
   <>

  
    <div className='w-screen h-screen flex bg-gray-100'>
      <div className='w-full h-full  hidden md:block '>
      <Image src={students}
      alt='students'
      className='w-full h-full object-cover'></Image>
       
      </div>
      <div className='w-full h-full flex flex-col items-center justify-center'>
        <Image src={logo} alt='logo' className='w-20 h-20 '></Image>
        <h2>Sign in to your account</h2>
        <div className='mx-auto'>

          
          <AuthForm></AuthForm>
        </div>

      </div>


    </div> 
    </>
  )
}
