"use client";
import React, { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import profile from "@/public/images/profile.png";
import {  sendText } from "@/app/lib/actions";
import EmptyChatContainer from "./EmptyChatContainer";
import MessagesArea from "./MessagesArea";

export default function ChatArea({
  selectedContact,
  userId,
}: {
  selectedContact: any;
  userId: any;
}) {

  const [formData, setFormData] = useState({
    text: "",
    receiverId: "",
    senderId: userId,
  });

  console.log(selectedContact?.id);


  useEffect(() => {
  
    formData.receiverId = selectedContact?.id;
  }, [formData, selectedContact?.id]);

  const handleSubmit = async () => {
    const event = window.event;
    if (!event) {
      return;
    }
    event.preventDefault();
    try {
      const create = await sendText(formData);
    } catch (error) {}
  };

  const handleChange = (
    event: React.ChangeEvent<
      HTMLTextAreaElement | HTMLSelectElement | HTMLInputElement
    >
  ) => {
    if (!event) {
      return;
    }
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="flex flex-col h-full w-full">
      {/* Chat Header */}
      <header className=" p-4 text-gray-700 shadow-md">
        <h1 className="text-2xl font-semibold">
          {selectedContact ? selectedContact.firstName : "Select a contact"}
        </h1>
      </header>

      {/* Chat Messages */}

      <Suspense fallback={<EmptyChatContainer/>}>

   <MessagesArea id={selectedContact?.id} userId={userId}/>
      </Suspense>


      {/* Chat Input */}
      <footer className="bg-white border-t border-gray-300 p-4 sticky bottom-[70px] w-full">
        <div className="flex items-center">
          <input
            type="text"
            name="text"
            onChange={handleChange}
            value={formData.text}
            placeholder="Type a message..."
            className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            onClick={() => handleSubmit()}
            className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2">
            Send
          </button>
        </div>
      </footer>
    </div>
  );
}
