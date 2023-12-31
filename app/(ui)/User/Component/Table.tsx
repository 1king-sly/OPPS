import React from 'react'
import clsx from 'clsx'
import { ClockIcon,CheckIcon,ExclamationTriangleIcon } from '@heroicons/react/24/outline'

type variant = 'Accepted'| 'Rejected'|'Pending'
export default function Table({title,date,status}:{title:string,date:string,status:variant}) {

  return (
    <>
    <div className='w-full h-12 items-center justify-around flex 
    bg-gray-50 cursor-pointer max-[425px]:text-xs'>
        <div className=' max-[425px]:w-24 truncate max-[1024px]:w-52 max-  flex justify-start w-64 '>{title} </div>
        <div>{date} </div>
        <div className={clsx(` py-2 rounded-lg md:w-[105px] max-[1024px]:ml-[52px] max-[767px]:ml-0 flex justify-center items-center gap-0.5 text-gray-900 text-xs`,{
          'bg-green-400':status==='Accepted','bg-gray-300':status==='Pending','bg-rose-500':status==='Rejected'
        })}
        >
            <div >
                {status === 'Pending' ? (
                <>
                  <div className='w-full flex gap-0.5'>
                  <ClockIcon className="ml-1 w-4 text-gray-500" />
                  Pending
                  </div>
                  
                </>
              ) : null}
              {status === 'Accepted' ? (
                <>
                  
                  <div className='w-full flex gap-0.5'>
                  <CheckIcon className="ml-1 w-4 text-gray-500" />
                  Accepted
                  </div>
                </>
              ) : null}       
              {status === 'Rejected' ? (
                <>
                  
                  <div className='w-full flex gap-0.5'>
                  <ExclamationTriangleIcon className="ml-1 w-4 " />
                  Rejected
                  </div>
                </>
              ) : null}       
          </div> 
        </div>

    </div>
    </> 
 )
}
