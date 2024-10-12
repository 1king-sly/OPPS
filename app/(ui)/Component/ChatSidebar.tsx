
'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image'
import profile from '@/public/images/profile.png'
import { fetchContacts } from '@/app/lib/actions'

export default function ChatSidebar({ setSelectedContact }:{setSelectedContact:any}) {

   const [contacts, setContacts] = useState<any[]>([]); 
  useEffect(() => {
    const getContacts = async () => {
      const sortedContacts = await fetchContacts();
      setContacts(sortedContacts || []); 
    };
    getContacts(); 
  }, [contacts]);

    const handleContactClick = (contact:any) => {
    setSelectedContact(contact);
   
  };
  return (
    <div className="w-full  border-r border-gray-300">
          {/* <!-- Sidebar Header --> */}
          <header className="p-4 border-b  border-l border-gray-300 flex justify-between items-center bg-sky-500 text-white">
            <h1 className="text-2xl font-semibold">Chat Web</h1>
            <div className="relative">
              <button id="menuButton" className="focus:outline-none" title='btn'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-100" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path d="M2 10a2 2 0 012-2h12a2 2 0 012 2 2 2 0 01-2 2H4a2 2 0 01-2-2z" />
                </svg>
              </button>
              {/* <!-- Menu Dropdown --> */}
              <div id="menuDropdown" className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg hidden">
                <ul className="py-2 px-3">
                  <li><a href="#" className="block px-4 py-2 text-gray-800 hover:text-gray-400">Option 1</a></li>
                  <li><a href="#" className="block px-4 py-2 text-gray-800 hover:text-gray-400">Option 2</a></li>
                 
                </ul>
              </div>
            </div>
          </header>
        
          {/* <!-- Contact List --> */}

         
          <div className="overflow-y-auto h-screen p-3 mb-9 pb-20">
       
          {contacts.map((contact) => (

            <div
              className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md"
              key={contact.id}
              onClick={() => handleContactClick(contact)}
            >
              <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                <Image
                  src={profile}
                  alt="User Avatar"
                  className="w-12 h-12 rounded-full"
                  width={100}
                  height={100}
                />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{contact.firstName}</h2>
                <p className="text-gray-600">{contact.
      sentMessages[0]?.content||contact.
      receivedMessages[0]?.content || 'Start conversation'}</p>
              </div>
            </div>
          ))} 
            
          </div>
        </div>
)
}
