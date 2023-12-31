import React from 'react'

export default function Card({
    title,number
}:{title:string,number:number}) {
  return (
    <>
        <div className='flex w-28 h-28 items-center justify-center flex-col shadow-xl md:h-40 md:w-40  rounded-lg '>
            <div>{title} </div>
            <div>{number} </div>

        </div>
    </>
  )
}
