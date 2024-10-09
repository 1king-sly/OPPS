'use server'
import AdminChat from '@/app/(ui)/Component/AdminChat'
import React from 'react'
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authUptions";

export default async function page() {

  const session = await getServerSession(authOptions)

  if(!session){
    return null
  }
  const userId = session.id
  return (
    <>
    <AdminChat userId={userId}/>
    </>
  )
}
