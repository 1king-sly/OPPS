import React, { Suspense } from 'react'
import Cards from '../../Component/Cards'
import Tables from '../../Component/Tables'
import Dashboard from '../../Skeleton/Dashboard'

export default  function page() {
  return (
  <>
  <Suspense fallback={<Dashboard></Dashboard>}>

  <Cards></Cards>
  <Tables></Tables>

  </Suspense>
  
  </> 
 )
}
