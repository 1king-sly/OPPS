import React from 'react'
import clsx from 'clsx'

type variant = 'ACCEPTED'| 'REJECTED'|'PENDING'
export default function Table({title,date,status}:{title:string,date:string,status:variant}) {
  return (
    <>
    <div className='w-full h-16 items-center justify-around flex '>
        <div>{title} </div>
        <div>{date} </div>
        <div className={clsx(`px-2 py-2 rounded-lg w-24 flex justify-center`,{
          'bg-green-400':status==='ACCEPTED','bg-gray-300':status==='PENDING','bg-rose-500':status==='REJECTED'
        })}
        >{status} </div>

    </div>
    </> 
 )
}
