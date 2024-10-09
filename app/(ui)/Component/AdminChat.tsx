'use client'
import React, { useEffect, useState } from 'react';
import Image from "next/image";
import profile from "@/public/images/profile.png";
import ChatSidebar from "./ChatSidebar";
import ChatArea from "./ChatArea";

export default function AdminChat() {
  const [selectedContact, setSelectedContact] = useState(null);

  return (
    <>
      {/* <!-- component --> */}
      <div className="flex h-screen overflow-hidden">
        <div className="w-1/4">
        <ChatSidebar setSelectedContact={setSelectedContact} />

        </div>
        <div className="flex flex-1 ">
        <ChatArea selectedContact={selectedContact} /> 
         </div>
      </div>
    </>
  );
}
