import React from 'react'
import Image from 'next/image'
import profile from '@/public/images/profile.png'



export default function AdminChat() {
  return (
    <>
    {/* <!-- component --> */}
<div className="flex h-screen overflow-hidden">
        {/* <!-- Sidebar --> */}
        <div className="w-1/4 bg-white border-r border-gray-300">
          {/* <!-- Sidebar Header --> */}
          <header className="p-4 border-b border-gray-300 flex justify-between items-center bg-indigo-600 text-white">
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
                  {/* <!-- Add more menu options here --> */}
                </ul>
              </div>
            </div>
          </header>
        
          {/* <!-- Contact List --> */}
          <div className="overflow-y-auto h-screen p-3 mb-9 pb-20">
            <div className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
              <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                <Image 
                src={profile}
                alt="User Avatar" className="w-12 h-12 rounded-full"
                width ={100}
                height={100}
                ></Image>
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold">Alice</h2>
                <p className="text-gray-600">Hoorayy!!</p>
              </div>
            </div>
            
            <div className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
              <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                <Image src={profile}
                alt="User Avatar" className="w-12 h-12 rounded-full"
                width ={100}
                height={100}></Image>
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold">Martin</h2>
                <p className="text-gray-600">That pizza place was amazing! We should go again sometime. 🍕</p>
              </div>
            </div>
            
            <div className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
              <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                <Image src={profile}
                alt="User Avatar" className="w-12 h-12 rounded-full"
                width ={100}
                height={100}></Image>
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold">Charlie</h2>
                <p className="text-gray-600">Hey, do you have any recommendations for a good movie to watch?</p>
              </div>
            </div>
            
            <div className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
              <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                <Image src={profile}
                 alt="User Avatar" className="w-12 h-12 rounded-full"
                width ={100}
                height={100}></Image>
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold">David</h2>
                <p className="text-gray-600">I just finished reading a great book! It was so captivating.</p>
              </div>
            </div>
            
            <div className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
              <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                <Image src={profile}
                alt="User Avatar" className="w-12 h-12 rounded-full"
                width ={100}
                height={100}></Image>
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold">Ella</h2>
                <p className="text-gray-600"> the plan for this weekend? Anything fun?</p>
              </div>
            </div>
            
            <div className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
              <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                <Image src={profile}
                alt="User Avatar" className="w-12 h-12 rounded-full"
                width ={100}
                height={100}></Image>
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold">Fiona</h2>
                <p className="text-gray-600">I heard  a new exhibit at the art museum. Interested?</p>
              </div>
            </div>
            
            <div className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
              <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                <Image src={profile}
                alt="User Avatar" className="w-12 h-12 rounded-full"
                width ={100}
                height={100}></Image>
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold">George</h2>
                <p className="text-gray-600">I tried that new cafe downtown. The coffee was fantastic!</p>
              </div>
            </div>
            
            <div className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
              <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                <Image src={profile}
                alt="User Avatar" className="w-12 h-12 rounded-full"
                width ={100}
                height={100}></Image>
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold">Hannah</h2>
                <p className="text-gray-600"> planning a hiking trip next month. Want to join?</p>
              </div>
            </div>
            
            <div className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
              <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                <Image src={profile}
                alt="User Avatar" className="w-12 h-12 rounded-full"
                width ={100}
                height={100}></Image>
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold">Ian</h2>
                <p className="text-gray-600"> catch up soon.  been too long!</p>
              </div>
            </div>
            
            <div className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
              <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                <Image src={profile}
                alt="User Avatar" className="w-12 h-12 rounded-full"
                width ={100}
                height={100}></Image>
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold">Jack</h2>
                <p className="text-gray-600">Remember that hilarious joke you told me? I  stop laughing!</p>
              </div>
            </div>
            
            
          </div>
        </div>
        
        {/* <!-- Main Chat Area --> */}
        <div className="flex-1">
            {/* <!-- Chat Header --> */}
            <header className="bg-white p-4 text-gray-700">
                <h1 className="text-2xl font-semibold">Alice</h1>
            </header>
            
            {/* <!-- Chat Messages --> */}
            <div className="h-screen overflow-y-auto p-4 pb-36">
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
                   <Image src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" className="w-8 h-8 rounded-full"
                   width ={100}
                   height={100}></Image>
                 </div>
                 <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                   <p className="text-gray-700">Hoorayy!!</p>
                 </div>
               </div>
               
            </div>
            
            {/* <!-- Chat Input --> */}
            <footer className="bg-white border-t border-gray-300 p-4 absolute bottom-0 w-3/4">
                <div className="flex items-center">
                    <input type="text" placeholder="Type a message..." className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"/>
                    <button className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2">Send</button>
                </div>
            </footer>
        </div>
    </div>
    <script>
      {/* // JavaScript for showing/hiding the menu
      const menuButton = document.getElementById('menuButton');
      const menuDropdown = document.getElementById('menuDropdown'); */}
      
      {/* menuButton.addEventListener('click', () => {
        if (menuDropdown.classNameList.contains('hidden')) {
          menuDropdown.classNameList.remove('hidden');
        } else {
          menuDropdown.classNameList.add('hidden');
        }
      });
      
      // Close the menu if you click outside of it
      document.addEventListener('click', (e) => {
        if (!menuDropdown.contains(e.target) && !menuButton.contains(e.target)) {
          menuDropdown.classNameList.add('hidden');
        }
      }); */}
    </script>
    </>
  )
}
