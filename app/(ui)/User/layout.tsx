import React, { useEffect } from 'react';
import SideNav from './Component/SideNav';
import Header from './Component/Header';
import { Metadata } from 'next';

const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dashboard',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {


  return (
    <>
        <div className='w-screen h-screen flex flex-col overflow-hidden gap-1'>
          <div className='w-full bg-gray-200 shadow-md h-[10vh]'>
            <Header />
          </div>
          <div className='w-full max-h-full h-full flex flex-row'>
            <div className='h-full overflow-hidden w-[15vw] bg-sky-500 flex justify-center'>
              <SideNav />
            </div>
            <div className='h-full overflow-y-auto w-full bg-gray-200'>{children}</div>
          </div>
        </div>
    </>
  );
};

export default RootLayout;
