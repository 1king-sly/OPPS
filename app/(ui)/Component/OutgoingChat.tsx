import React from 'react'
import Image from 'next/image';
import profile from '@/public/images/profile.png';

export default function OutgoingChat() {
  return (
    <>
     <div className="flex justify-end mb-4 cursor-pointer">
          <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
            <p>Hi Alice! Doing good, just finished a great book. How about you?</p>
          </div>
          <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
            <Image src={profile} alt="My Avatar" className="w-8 h-8 rounded-full" width={100} height={100} />
          </div>
        </div>
    </>
)
}
