import React from 'react'
import Card from './Card'

export default function Cards() {
  return (
    <>
    <div className='w-full h-48 flex gap-3 justify-around items-center'>
        <Card title='Total' number={20}></Card>
        <Card title='Pending' number={20}></Card>
        <Card title='Accepted' number={20}></Card>
        <Card title='Rejected' number={20}></Card>
    </div>
    </>
  )
}
