import React from 'react'
import Table from './Table'

export default function Tables() {
type details={
  regNumber:string,
  title:string,
  date:string
}

const projects:details[]=[{
  regNumber:'COM/B/01-00086/2022',
  title:'Introduction',
  date:'26/12/23'
},{
  regNumber:'BIT/B/01-00175/2020',
  title:'Introduction',
  date:'26/12/23'
},{
  regNumber:'COM/B/01-00097/2021',
  title:'Introduction',
  date:'26/12/23'
},{
  regNumber:'SIK/B/01-00123/2021',
  title:'Introduction',
  date:'26/12/23'
},{
  regNumber:'COM/B/01-00102/2023',
  title:'Introduction',
  date:'26/12/23'
},

]

  return (
    <>
    <div className='w-full gap-1 flex flex-col '>
        <div className='w-full h-16 items-center justify-around flex sm:-ml-4 md:-ml-0'>
            <div className='md:-ml-8'>REG. NUMBER</div>
            <div className='md:-ml-8 '>Title</div>
            <div>Date</div>
        </div>
        <div className='-mt-6'>
       
        {projects.map((project)=>{
          return(
            <Table key={project.title} title={project.title} date={project.date} regNumber={project.regNumber}></Table>
          )
        })}
        </div>
       

    </div>
    
    </>
  )
}
