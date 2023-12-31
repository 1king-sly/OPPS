import React from 'react'
import Tables from './Tables'
import Projects from '../../Skeleton/Projects'
import Search from './search'

export default function page() {
  return (
    <>
    
    <div className='w-full flex items-center justify-center mt-4 flex-col'>
      <Search placeholder='Search'></Search>
     <Tables></Tables>

    </div>    
   {/* use as fallback when rendering */}
    {/* <Projects></Projects> */}
    </>
  )
}
