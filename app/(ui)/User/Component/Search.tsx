'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

export default function Search({placeholder}) {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const {replace} = useRouter()

    const handleSearch = (e) =>{

      const params = new URLSearchParams(searchParams)
      params.set("q",e.target.value)
       replace(`${pathname}?${params}`)

    }

    
  return (
    <div>Search</div>
  )
}
