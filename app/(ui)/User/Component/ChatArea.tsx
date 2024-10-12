"use client";
import React, { Suspense, useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import profile from "@/public/images/profile.png";
import { sendUserText } from "@/app/lib/actions";
import EmptyChatContainer from "../../Component/EmptyChatContainer";

// Define a Message type
interface Message {
  receiverId: string;
  id: string;
  senderId: string;
  content: string;
}



export default function ChatArea({
 
  userId,
}: {
 
  userId: string;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [formData, setFormData] = useState({
    text: "",
    receiverId: "",
    senderId: userId,
  });

  const [loading, setLoading] = useState(false);

  const messagesContainerRef = useRef<HTMLDivElement | null>(null); 

  
  const fetchTexts = useCallback(async () => {
    const response = await fetch(`/api/fetchUserTexts`, {
      method: 'GET',
    });
    if (response.status !== 200) {
      return null;
    }
    const data = await response.json();
    setMessages(data || []);
  }, []);


  useEffect(() => {

    fetchTexts();

    // Ensure the scrollbar is always at the bottom when new messages arrive
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [fetchTexts, messages]);

  

  const handleSubmit = async () => {
    setLoading(true);
    const event = window.event;
    if (!event) {
      return;
    }
    event.preventDefault();
    try {
      const create = await sendUserText(formData);
      if (create) {
        formData.text = '';
        setLoading(false);
        fetchTexts();
      }
    } catch (error: any) {
      setLoading(false);
      console.log('Failed to create text: ', error);
    }
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
      <header className="p-4 text-gray-700 shadow-md">
        <h1 className="text-2xl font-semibold text-sky-500">
           Kingsly Assistant
        </h1>
      </header>

      {/* Chat Messages */}
      <Suspense fallback={<EmptyChatContainer />}>
        <>
          {messages.length > 0 ? (
            <div
              className="flex-1 overflow-y-auto p-4 py-16 pt-2 cursor-default"
              ref={messagesContainerRef} // Attach ref to messages container
            >
              {messages.map((message) => {
                return (
                  <div className="flex mb-4 cursor-pointer" key={message.id}>
                    {message.senderId == userId ? (
                      <>
                        {/* Incoming Message */}
                        <div className="flex mb-4 cursor-pointer">
                          <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                            <Image
                              src={profile}
                              alt="User Avatar"
                              className="w-8 h-8 rounded-full"
                              width={100}
                              height={100}
                            />
                          </div>
                          <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                            <p className="text-gray-700">{message.content}</p>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Outgoing Message */}
                        <div className="flex justify-end mb-4 cursor-pointer w-full">
                          <div className="ml-auto flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
                            <p>{message.content}</p>
                          </div>
                          <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
                            <Image
                              src={profile}
                              alt="My Avatar"
                              className="w-8 h-8 rounded-full"
                              width={100}
                              height={100}
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <EmptyChatContainer />
          )}
        </>
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
            className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500 outline-sky-300 "
          />
          <button
            type="submit"
            disabled={loading}
            onClick={() => handleSubmit()}
            className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2"
          >
            {loading ? 'Sending... ' : 'Send'}
          </button>
        </div>
      </footer>
    </div>
  );
}
