import React from 'react'
import clsx from 'clsx'
import { CheckIcon, ClockIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'

type variant = 'ACCEPTED'| 'REJECTED'|'PENDING'
export default function Table({title,date,status}:{title:string,date:string,status:variant}) {
  return (
    <>
    <div className='w-full h-16 items-center justify-around flex '>
        {/* <div>{title} </div>
        <div>{date} </div>
        <div className={clsx(`px-2 py-2 rounded-lg w-24 flex justify-center`,{
          'bg-green-400':status==='ACCEPTED','bg-gray-300':status==='PENDING','bg-rose-500':status==='REJECTED'
        })}
        >{status} </div> */}


        <tr>
          <td className=' truncate'>{title} </td>
          <td>{date} </td>
          <td className={clsx(`px-2 py-2 rounded-lg w-24 flex justify-center`,{
              'bg-green-400':status==='ACCEPTED','bg-gray-300':status==='PENDING','bg-rose-500':status==='REJECTED'
            })}><div >
            {status === 'PENDING' ? (
            <>
               <div className='w-full flex gap-0.5'>
                  <ClockIcon className="ml-1 w-4 text-gray-500" />
                  PENDING
                  </div>
                  
                </>
              ) : null}
              {status === 'ACCEPTED' ? (
                <>
                  
                  <div className='w-full flex gap-0.5'>
                  <CheckIcon className="ml-1 w-4 text-gray-500" />
                  ACCEPTED
                  </div>
                </>
              ) : null}       
              {status === 'REJECTED' ? (
                <>
                  
                  <div className='w-full flex gap-0.5'>
                  <ExclamationTriangleIcon className="ml-1 w-4 " />
                  REJECTED
                  </div>
                </>
              ) : null}       
          </div> 
            
           </td>
        </tr>

    </div>
   
    </> 
 )
}
