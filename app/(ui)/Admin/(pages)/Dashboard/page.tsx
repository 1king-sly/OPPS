import React from 'react'
import Cards from '../../Component/Cards'
import Tables from '../../Component/Tables'
import Dashboard from '../../Skeleton/Dashboard'

export default function page() {
  return (
  <>
  <Cards></Cards>
  <Tables></Tables>
  {/* use as fallback when rendering data */}
  {/* <Dashboard></Dashboard> */}
  </> 
 )
}
