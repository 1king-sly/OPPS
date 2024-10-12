'use client'
import React, { useState } from 'react';

import ChatArea from "./ChatArea";

export default function UserChat({userId}:{userId:any}) {

 

  return (
    <>
      {/* <!-- component --> */}
      <div className="flex h-screen overflow-hidden">
       
        <ChatArea userId={userId} /> 
      </div>
    </>
  );
}
