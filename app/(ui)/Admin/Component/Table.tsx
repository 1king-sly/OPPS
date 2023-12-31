import React from 'react'


export default function Table({regNumber,title,date,}:{regNumber:string,title:string,date:string}) {
  return (
    <>
    <div className='w-full h-12 items-center justify-around flex px-4
    cursor-pointer bg-gray-50 rounded-sm  '>
        <div className=' flex justify-start '>{regNumber} </div>
        <div className='  w-2/6 flex justify-center'>{title} </div>
        <div className='w-1/6  flex justify-center'
        >{date} </div>

    </div>
    </> 
 )
}
