'use client'
import React, { useEffect } from 'react'

export default function Error({error,reset}:{error:Error & {digest?:string},reset:()=> void}) {

    useEffect(()=>{
        console.error(error);
    },[error])
  return (
    <main className='flex h-full w-full flex-col items-center justify-center'>
        <h2 className='text-center'>Something went wrong</h2>
        <button className='mt-4 rounded-md bg-blue-300 p-4 text-sm text-white transition-colors hover:bg-blue-400' onClick={()=> reset()}>Try Again</button>
    </main>
  )
}
