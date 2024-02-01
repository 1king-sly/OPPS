import React, { Suspense } from 'react'
import Cards from '../../Component/Cards'
import Dashboard from '../../Skeleton/Dashboard'

export default function page() {
  return (
  <>
  <Suspense fallback={<Dashboard></Dashboard>}>

  <Cards></Cards>


</Suspense>
  
  </> 
 )
}
