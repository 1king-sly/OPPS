import React from 'react'
import Image from 'next/image';
import profile from '@/public/images/profile.png';

export default function IncomingChat() {
  return (
    <>
     {/* Incoming Message */}
     <div className="flex mb-4 cursor-pointer">
          <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
            <Image src={profile} alt="User Avatar" className="w-8 h-8 rounded-full" width={100} height={100} />
          </div>
          <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
            <p className="text-gray-700">Hey Bob, how it going?</p>
          </div>
        </div>
    </>
)
}
