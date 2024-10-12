'use server'
import React from 'react'
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authUptions";
import UserChat from '../../Component/UserChat';

export default async function page() {

  const session = await getServerSession(authOptions)

  if(!session){
    return null
  }
  const userId = session.id
  return (
    <>
    <UserChat userId={userId}/>
    </>
  )
}
