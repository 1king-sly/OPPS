import NextAuth from "next-auth"

declare module "next-auth" {
  interface User{
    firstName: string,
    secondName: string,
    userType: string,
    registrationNumber: string,
    email:string
  }
  interface Session {
    user:User 
    firstName: string,
    secondName: string,
    userType: string,
    registrationNumber: string,
    email:string
    
  }
}



// 'use server'
// import React from 'react'
// import Image from 'next/image'
// import logo from '@/public/images/Mmust logo.png'
// import { getSession, useSession } from 'next-auth/react'
// import authOptions from '@/utils/authUptions'

// export default async function Header() {

//   const session = await getSession(authOptions)

//   console.log('Session Data', session)

//   let email, firstName, secondName, userType;

//   if (session) {
//     secondName = session.secondName;
//     email = session.email;
//     firstName = session.firstName;
//     userType = session.userType;
//   }
//   return (
//     <div className='w-full h-full flex items-center justify-around px-1 sm:px-4 lg:px-8 '>
//       <div className='sm:w-1/4  flex justify-start   '>
//         <Image src={logo} alt='logo' className=' object-cover h-16 w-16'></Image>
//       </div>
//       <div className='flex-1 flex justify-center   md:text-lg lg:text-xl text-sky-400 text-sm'>
//         ONLINE PROJECT PROPOSAL SYSTEM
//       </div>
//       <div className='w-1/4 flex justify-end'><span className='text-sky-400'> {firstName} </span> </div>
//     </div>
//   )
// }
