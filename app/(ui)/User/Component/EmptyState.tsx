import React from 'react'
import Image from 'next/image'
import emptyBox from '@/public/images/emptyBox.png'

export default function EmptyState() {
  return (
    <div className='w-full h-full flex items-center justify-center'>
        <Image src={emptyBox}
        alt='students'
        className='w-48 h-48 object-cover'></Image>
    </div>
  )
}
