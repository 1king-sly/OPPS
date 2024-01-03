// ./app/ui/User/layout.tsx
'use client'
import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import SideNav from './Component/SideNav';
import Header from './Component/Header';
import { Provider } from './Component/Provider';
import { Metadata } from 'next';

const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dashboard',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') {
      // Session is still loading, show loading state if necessary
      return;
    }

    if (!session || !session.userType) {
      // User is not authenticated, redirect to the login page
      router.replace('/');
    } else if (router.pathname.startsWith('/Admin') && session.userType !== 'ADMIN') {
      // User is not an admin, redirect to the home page
      router.replace('/');
    } else if (router.pathname.startsWith('/User') && session.userType !== 'USER') {
      // User is not a regular user, redirect to the home page
      router.replace('/');
    }
  }, [session, status, router]);

  if (status === 'loading') {
    // Optionally, you can show a loading state while the session is being checked
    return <div>Loading...</div>;
  }

  return (
    <>
      <Provider>
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
      </Provider>
    </>
  );
};

export default RootLayout;
