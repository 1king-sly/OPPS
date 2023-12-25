import React from 'react'
import clsx from 'clsx'


export default function Table({regNumber,title,date,}:{regNumber:string,title:string,date:string}) {
  return (
    <>
    <div className='w-full h-16 items-center justify-around flex px-8
    cursor-pointer  '>
        <div className='w-1/6 flex justify-start '>{regNumber} </div>
        <div className='  w-2/6 flex justify-center'>{title} </div>
        <div className='w-1/6  flex justify-center'
        >{date} </div>

    </div>
    </> 
 )
}
