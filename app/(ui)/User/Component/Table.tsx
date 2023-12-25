import React from 'react'
import clsx from 'clsx'

type variant = 'Accepted'| 'Rejected'|'Pending'
export default function Table({title,date,status}:{title:string,date:string,status:variant}) {
  return (
    <>
    <div className='w-full h-16 items-center justify-around flex '>
        <div>{title} </div>
        <div>{date} </div>
        <div className={clsx(`px-2 py-2 rounded-lg w-24 flex justify-center`,{
          'bg-green-400':status==='Accepted','bg-gray-300':status==='Pending','bg-rose-500':status==='Rejected'
        })}
        >{status} </div>

    </div>
    </> 
 )
}
