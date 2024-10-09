import React from 'react';
import Image from 'next/image';
import profile from '@/public/images/profile.png';

export default function ChatArea({ selectedContact }:{selectedContact:any}) {
  return (
    <div className="flex flex-col h-full w-full">
      {/* Chat Header */}
      <header className=" p-4 text-gray-700 shadow-md">
        <h1 className="text-2xl font-semibold">{selectedContact ? selectedContact.firstName : 'Select a contact'}</h1>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 py-16 pt-2 cursor-default ">
        {/* Incoming Message */}
        <div className="flex mb-4 cursor-pointer">
          <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
            <Image src={profile} alt="User Avatar" className="w-8 h-8 rounded-full" width={100} height={100} />
          </div>
          <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
            <p className="text-gray-700">Hey Bob, how it going?</p>
          </div>
        </div>

        {/* Outgoing Message */}
        <div className="flex justify-end mb-4 cursor-pointer">
          <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
            <p>Hi Alice! Doing good, just finished a great book. How about you?</p>
          </div>
          <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
            <Image src={profile} alt="My Avatar" className="w-8 h-8 rounded-full" width={100} height={100} />
          </div>
        </div>

                 {/* <!-- Incoming Message --> */}
                 <div className="flex mb-4 cursor-pointer">
                 <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                   <Image src={profile}alt="User Avatar" className="w-8 h-8 rounded-full"
                   width ={100}
                   height={100}></Image>
                 </div>
                 <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                   <p className="text-gray-700">Hey Bob,  it going?</p>
                 </div>
               </div>
               
               {/* <!-- Outgoing Message --> */}
               <div className="flex justify-end mb-4 cursor-pointer">
                 <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
                   <p>Hi Alice!  good, just finished a great book. How about you?</p>
                 </div>
                 <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
                   <Image src={profile}alt="My Avatar" className="w-8 h-8 rounded-full"
                   width ={100}
                   height={100}></Image>
                 </div>
               </div>
               
               {/* <!-- Incoming Message --> */}
               <div className="flex mb-4 cursor-pointer">
                 <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                   <Image src={profile} alt="User Avatar" className="w-8 h-8 rounded-full"
                   width ={100}
                   height={100}></Image>
                 </div>
                 <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                   <p className="text-gray-700">That book sounds interesting!  it about?</p>
                 </div>
               </div>
               
               {/* <!-- Outgoing Message --> */}
               <div className="flex justify-end mb-4 cursor-pointer">
                 <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
                   <p> about an astronaut stranded on Mars, trying to survive. Gripping stuff!</p>
                 </div>
                 <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
                   <Image src={profile} alt="My Avatar" className="w-8 h-8 rounded-full"
                   width ={100}
                   height={100}></Image>
                 </div>
               </div>
               
               {/* <!-- Incoming Message --> */}
               <div className="flex mb-4 cursor-pointer">
                 <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                   <Image src={profile} alt="User Avatar" className="w-8 h-8 rounded-full"
                   width ={100}
                   height={100}></Image>
                 </div>
                 <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                   <p className="text-gray-700"> intrigued! Maybe borrow it from you when  done?</p>
                 </div>
               </div>
               
               {/* <!-- Outgoing Message --> */}
               <div className="flex justify-end mb-4 cursor-pointer">
                 <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
                   <p>Of course!  drop it off at your place tomorrow.</p>
                 </div>
                 <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
                   <Image src={profile} alt="My Avatar" className="w-8 h-8 rounded-full"
                   width ={100}
                   height={100}></Image>
                 </div>
               </div>
               
               {/* <!-- Incoming Message --> */}
               <div className="flex mb-4 cursor-pointer">
                 <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                   <Image src={profile} alt="User Avatar" className="w-8 h-8 rounded-full"
                   width ={100}
                   height={100}></Image>
                 </div>
                 <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                   <p className="text-gray-700">Thanks,  the best!</p>
                 </div>
               </div>
               
               {/* <!-- Outgoing Message --> */}
               <div className="flex justify-end mb-4 cursor-pointer">
                 <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
                   <p>Anytime! Let me know how you like it. 😊</p>
                 </div>
                 <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
                   <Image src={profile}alt="My Avatar" className="w-8 h-8 rounded-full"
                   width ={100}
                   height={100}></Image>
                 </div>
               </div>
               
               {/* <!-- Incoming Message --> */}
               <div className="flex mb-4 cursor-pointer">
                 <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                   <Image src={profile}alt="User Avatar" className="w-8 h-8 rounded-full"
                   width ={100}
                   height={100}></Image>
                 </div>
                 <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                   <p className="text-gray-700">So, pizza next week, right?</p>
                 </div>
               </div>
               
               {/* <!-- Outgoing Message --> */}
               <div className="flex justify-end mb-4 cursor-pointer">
                 <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
                   <p>Absolutely!  wait for our pizza date. 🍕</p>
                 </div>
                 <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
                   <Image src={profile}alt="My Avatar" className="w-8 h-8 rounded-full"
                   width ={100}
                   height={100}></Image>
                 </div>
               </div>
               {/* <!-- Incoming Message --> */}
               <div className="flex mb-4 cursor-pointer">
                 <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                   <Image src={profile} alt="User Avatar" className="w-8 h-8 rounded-full"
                   width ={100}
                   height={100}></Image>
                 </div>
                 <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                   <p className="text-gray-700">Hoorayy!!</p>
                 </div>
               </div>
        <div className="flex mb-4 cursor-pointer">
          <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
            <Image src={profile} alt="User Avatar" className="w-8 h-8 rounded-full" width={100} height={100} />
          </div>
          <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
            <p className="text-gray-700">Hey Bob, how it going?</p>
          </div>
        </div>

        {/* Outgoing Message */}
        <div className="flex justify-end mb-4 cursor-pointer">
          <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
            <p>Hi Alice! Doing good, just finished a great book. How about you?</p>
          </div>
          <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
            <Image src={profile} alt="My Avatar" className="w-8 h-8 rounded-full" width={100} height={100} />
          </div>
        </div>

                 {/* <!-- Incoming Message --> */}
                 <div className="flex mb-4 cursor-pointer">
                 <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                   <Image src={profile}alt="User Avatar" className="w-8 h-8 rounded-full"
                   width ={100}
                   height={100}></Image>
                 </div>
                 <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                   <p className="text-gray-700">Hey Bob,  it going?</p>
                 </div>
               </div>
               
               {/* <!-- Outgoing Message --> */}
               <div className="flex justify-end mb-4 cursor-pointer">
                 <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
                   <p>Hi Alice!  good, just finished a great book. How about you?</p>
                 </div>
                 <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
                   <Image src={profile}alt="My Avatar" className="w-8 h-8 rounded-full"
                   width ={100}
                   height={100}></Image>
                 </div>
               </div>
               
               {/* <!-- Incoming Message --> */}
               <div className="flex mb-4 cursor-pointer">
                 <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                   <Image src={profile} alt="User Avatar" className="w-8 h-8 rounded-full"
                   width ={100}
                   height={100}></Image>
                 </div>
                 <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                   <p className="text-gray-700">That book sounds interesting!  it about?</p>
                 </div>
               </div>
               
               {/* <!-- Outgoing Message --> */}
               <div className="flex justify-end mb-4 cursor-pointer">
                 <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
                   <p> about an astronaut stranded on Mars, trying to survive. Gripping stuff!</p>
                 </div>
                 <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
                   <Image src={profile} alt="My Avatar" className="w-8 h-8 rounded-full"
                   width ={100}
                   height={100}></Image>
                 </div>
               </div>
               
               {/* <!-- Incoming Message --> */}
               <div className="flex mb-4 cursor-pointer">
                 <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                   <Image src={profile} alt="User Avatar" className="w-8 h-8 rounded-full"
                   width ={100}
                   height={100}></Image>
                 </div>
                 <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                   <p className="text-gray-700"> intrigued! Maybe borrow it from you when  done?</p>
                 </div>
               </div>
               
               {/* <!-- Outgoing Message --> */}
               <div className="flex justify-end mb-4 cursor-pointer">
                 <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
                   <p>Of course!  drop it off at your place tomorrow.</p>
                 </div>
                 <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
                   <Image src={profile} alt="My Avatar" className="w-8 h-8 rounded-full"
                   width ={100}
                   height={100}></Image>
                 </div>
               </div>
               
               {/* <!-- Incoming Message --> */}
               <div className="flex mb-4 cursor-pointer">
                 <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                   <Image src={profile} alt="User Avatar" className="w-8 h-8 rounded-full"
                   width ={100}
                   height={100}></Image>
                 </div>
                 <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                   <p className="text-gray-700">Thanks,  the best!</p>
                 </div>
               </div>
               
               {/* <!-- Outgoing Message --> */}
               <div className="flex justify-end mb-4 cursor-pointer">
                 <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
                   <p>Anytime! Let me know how you like it. 😊</p>
                 </div>
                 <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
                   <Image src={profile}alt="My Avatar" className="w-8 h-8 rounded-full"
                   width ={100}
                   height={100}></Image>
                 </div>
               </div>
               
               {/* <!-- Incoming Message --> */}
               <div className="flex mb-4 cursor-pointer">
                 <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                   <Image src={profile}alt="User Avatar" className="w-8 h-8 rounded-full"
                   width ={100}
                   height={100}></Image>
                 </div>
                 <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                   <p className="text-gray-700">So, pizza next week, right?</p>
                 </div>
               </div>
               
               {/* <!-- Outgoing Message --> */}
               <div className="flex justify-end mb-4 cursor-pointer">
                 <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
                   <p>Absolutely!  wait for our pizza date. 🍕</p>
                 </div>
                 <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
                   <Image src={profile}alt="My Avatar" className="w-8 h-8 rounded-full"
                   width ={100}
                   height={100}></Image>
                 </div>
               </div>
               {/* <!-- Incoming Message --> */}
               <div className="flex mb-4 cursor-pointer">
                 <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                   <Image src={profile} alt="User Avatar" className="w-8 h-8 rounded-full"
                   width ={100}
                   height={100}></Image>
                 </div>
                 <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                   <p className="text-gray-700">Hoorayy!!</p>
                 </div>
               </div>

        {/* Add more messages as needed */}
      </div>

      {/* Chat Input */}
      <footer className="bg-white border-t border-gray-300 p-4 sticky bottom-[70px] w-full">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Type a message..."
            className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
          />
          <button className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2">Send</button>
        </div>
      </footer>
    </div>
  );
}
