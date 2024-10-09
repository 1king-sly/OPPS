"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import profile from "@/public/images/profile.png";
import { fetchTexts, sendText } from "@/app/lib/actions";
import EmptyChatContainer from "./EmptyChatContainer";

export default function ChatArea({
  selectedContact,
  userId,
}: {
  selectedContact: any;
  userId: any;
}) {
  const [messages, setMessages] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    text: "",
    receiverId: "",
    senderId: userId,
  });

  console.log(selectedContact?.id);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMessages = async () => {
      const chats = await fetchTexts(selectedContact?.id);
      setMessages(chats || []);
      setLoading(false);
    };

    getMessages();
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

      {messages.length > 0 ? (
  <div className="flex-1 overflow-y-auto p-4 py-16 pt-2 cursor-default">
    <>
      {messages.map((message) => {
        return (
          <div className="flex mb-4 cursor-pointer" key={message.id}>
            {message.senderId != userId ? (
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
                    <p> {message.content} </p>
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
    </>
  </div>
) : (
  <EmptyChatContainer />
)}

      {/* Chat Input */}
      <footer className="bg-white border-t border-gray-300 p-4 sticky bottom-[70px] w-full">
        <form className="flex items-center">
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
        </form>
      </footer>
    </div>
  );
}
