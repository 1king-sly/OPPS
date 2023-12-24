import React from 'react'
import clsx from 'clsx'

type variant = 'Accepted'| 'Rejected'|'Pending'
export default function Table({title,date,status}:{title:string,date:string,status:variant}) {
  return (
    <>
    <div className='w-full h-16 items-center justify-around flex '>
        <div>{title} </div>
        <div>{date} </div>
        <div className='
        px-2 py-2 rounded-lg 
        '
        >{status} </div>

    </div>
    </> 
 )
}
