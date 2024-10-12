"use server";
import React from "react";
import Image from "next/image";
import profile from "@/public/images/profile.png";
import EmptyChatContainer from "./EmptyChatContainer";
import { fetchTexts } from "@/app/lib/actions";

export default async function MessagesArea({
  id,
  userId,
}: {
  id: any;
  userId: any;
}) {
  const messages = await fetchTexts(id);

  return (
    <>
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
    </>
  );
}
