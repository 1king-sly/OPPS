import React from 'react'
import Table from './Table'

export default function Tables() {
  return (
    <>
    <div className='w-full gap-1 flex flex-col '>
        <div className='w-full h-16 items-center justify-around flex '>
            <div>Title</div>
            <div>Date</div>
            <div>Status</div>
        </div>
        <div className='-mt-6'>
        <Table title='Introduction' date='12/12/23' status='Pending'></Table>
        <Table title='Introduction' date='12/12/23' status='Accepted'></Table>
        <Table title='Introduction' date='12/12/23' status='Pending'></Table>
        <Table title='Introduction' date='12/12/23' status='Rejected'></Table>
        <Table title='Introduction' date='12/12/23' status='Accepted'></Table>
        </div>
       

    </div>
    
    </>
  )
}
