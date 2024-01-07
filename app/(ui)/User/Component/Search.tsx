'use client'
import { MagnifyingGlassCircleIcon } from '@heroicons/react/24/outline'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

// I need to import useDebounceCallback npm i use-debounce

export default function Search({placeholder}) {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const {replace} = useRouter()
    
    const handleSearch = useDebounceCallback( (e) =>{
    
    const params = new URLSearchParams(searchParams)
    if(e.target.value){
      e.target.value.length > 2 &&  params.set("q",e.target.value)
       
      }

      params.delete("q")
       replace(`${pathname}?${params}`)

    },300)

    
  return (
    <div>
      <MagnifyingGlassCircleIcon/>
      <input type="text" placeholder={placeholder} onChange={handleSearch} className='' />
    </div>
  )
}
