import React from 'react'

export default function Question({
    question,instructions,max,id,number
}:{
    question:string,instructions?:string,max:number,id:string,number:string
}) {
  return (
   <>
    <div>
        <p><span>{number}) </span>{question} <span>( Max {max} words) </span> </p>
        <p className='text-sm'>{instructions} </p>
    </div>
    <div>
        <textarea name={id} id={id} maxLength={max} title={id}  className=' resize-none h-60 w-full px-2 py-2 outline-sky-200 mt-3' ></textarea>
    </div>
   </>
  )
}
