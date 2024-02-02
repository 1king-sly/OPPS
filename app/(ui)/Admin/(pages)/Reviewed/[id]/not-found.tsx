import { FaceFrownIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import React from 'react'

export default function NotFound() {
  return (
    <div className='w-full h-full flex flex-col justify-center items-center gap-2'>
    <FaceFrownIcon className="ml-1 w-20 text-gray-500" />
    <h2>404 Not Found</h2>
    <p>Could Not Find Requested Project</p>

    <Link href='/Admin/Projects'>
        <button className='p-3 text-white bg-sky-300 rounded-md'>Go Back</button>
    </Link>

</div>


  )
}
