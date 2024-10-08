import React from "react";
import Image from "next/image";
import profile from "@/public/images/profile.png";
import ChatSidebar from "./ChatSidebar";
import ChatArea from "./ChatArea";

export default function AdminChat() {
  return (
    <>
      {/* <!-- component --> */}
      <div className="flex h-screen overflow-hidden">
        <div className="w-1/4">
          <ChatSidebar />
        </div>

        <div className="flex flex-1 bg-sky-300">
          <ChatArea />
        </div>
      </div>
      <script>
        {/* // JavaScript for showing/hiding the menu
      const menuButton = document.getElementById('menuButton');
      const menuDropdown = document.getElementById('menuDropdown'); */}

        {/* menuButton.addEventListener('click', () => {
        if (menuDropdown.classNameList.contains('hidden')) {
          menuDropdown.classNameList.remove('hidden');
        } else {
          menuDropdown.classNameList.add('hidden');
        }
      });
      
      // Close the menu if you click outside of it
      document.addEventListener('click', (e) => {
        if (!menuDropdown.contains(e.target) && !menuButton.contains(e.target)) {
          menuDropdown.classNameList.add('hidden');
        }
      }); */}
      </script>
    </>
  );
}
