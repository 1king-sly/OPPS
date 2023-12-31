import React from 'react'
import Table from './Table'


type variant = 'Accepted'| 'Rejected'|'Pending'

type details={
  status:variant,
  title:string,
  date:string
}

export default function Tables() {

 
  
  const projects:details[]=[{
    status:'Accepted',
    title:'Introduction to everything',
    date:'26/12/23'
  },{
    status:'Pending',
    title:'Introduction',
    date:'26/12/23'
  },{
    status:'Rejected',
    title:'Introduction',
    date:'26/12/23'
  },{
    status:'Accepted',
    title:'Introduction',
    date:'26/12/23'
  },{
    status:'Pending',
    title:'Introduction',
    date:'26/12/23'
  },
  
  ]
  return (
    <>
     <div className='w-5/6 max-[425px]:w-full gap-1  flex flex-col pb-6 '>
        <div className='w-full h-16 items-center justify-around flex
          max-[767px]:ml-0 max-[425px]:text-sm max-[425px]:ml-2'>
            <div className=' max-[425px]:w-24 truncate max-[1024px]:w-52 max-  flex justify-start w-64 '>Title</div>
            <div className='lg:mr-[70px] md:mr-16'>Date</div>
            <div>Status</div>
        </div>
        <div className='-mt-4 flex gap-3 flex-col rounded-md'>
        {projects.map((project)=>{
          return(
            <Table key={project.title} title={project.title} date={project.date} status={project.status}></Table>
          )
        })}
        </div>
       

    </div>
    
    </>
  )
}
