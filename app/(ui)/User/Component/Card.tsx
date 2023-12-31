import React from 'react'

export default function Card({
    title,number
}:{title:string,number:number}) {
  return (
    <>
        <div className='flex w-28 h-28 items-center justify-center flex-col shadow-lg md:h-40 md:w-40 max-[380px]:text-sm max-[320px]:text-xs '>
            <div>{title} </div>
            <div>{number} </div>

        </div>
    </>
  )
}
