import React, { Suspense } from 'react'
import Tables from './Tables'
import Projects from '../../Skeleton/Projects'

export default function page() {
  return (
    <>
    <Suspense fallback={<Projects/>}>

    <Tables></Tables>

    </Suspense>
   
    </>
  )
}
