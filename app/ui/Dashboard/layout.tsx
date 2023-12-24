import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import SideNav from './Component/SideNav'
import Header from './Component/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
    <div>
        <Header></Header>
    </div>
    <div className='flex h-screen flex-col md:flex-row md:overflow-hidden mt-20 absolute '>
        <div className='w-full flex-none md:w-64'>
            <SideNav></SideNav>
        </div>
        <div className='flex-grow p-6 md:overflow-y-auto md:p-12 '>{children} </div>
    </div>
    </>
  )
}
