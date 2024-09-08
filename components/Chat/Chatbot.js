"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/24/outline";

const Chatbot = () => {
  const chatBoxRef = useRef(null);

  // DON'T TOUCH THIS CODE BELOW
  useEffect(() => {
    // Check if the script is already loaded to avoid duplicate loading
    if (
      !document.querySelector(
        "script[src='https://cdn.botframework.com/botframework-webchat/latest/webchat.js']"
      )
    ) {
      const script = document.createElement("script");
      script.src =
        "https://cdn.botframework.com/botframework-webchat/latest/webchat.js";
      script.async = true;

      script.onload = () => {
        // Ensure WebChat is loaded before using it
        if (window.WebChat) {
          // Style customization for the chatbot
          const styleSet = window.WebChat.createStyleSet({
            width: "100%",
            bubbleBackground: "blue",
            bubbleFromUserBackground: "green",
            bubbleFromUserTextColor: "white",
            bubbleTextColor: "white",
            bubbleFromUserBorderRadius: "10px",
            bubbleBorderRadius: "10px",
            sendBoxButtonColor: "black",
            sendBoxButtonColorOnHover: "black",
            sendBoxButtonColorOnPress: "black",
            sendBoxButtonColorOnDisabled: "black",
            hideUploadButton: true,
            botAvatarImage: "/chatbot.png",
            botAvatarInitials: "EB",
          });

          // Render the chatbot
          window.WebChat.renderWebChat(
            {
              directLine: window.WebChat.createDirectLine({
                token: process.env.NEXT_PUBLIC_CHATBOT_SECRET_KEY,
              }),
              styleSet,
            },
            document.getElementById("webchat")
          );
        }
      };

      document.body.appendChild(script);
    }

    // Add event listener for clicks outside the chatbox
    const handleClickOutside = (event) => {
      if (chatBoxRef.current && !chatBoxRef.current.contains(event.target)) {
        document.getElementById("chatBox").classList.add("hidden");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Cleanup the event listener on unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  // DON'T TOUCH THIS CODE ABOVE

  return (
    <>
      {/* Chatbot image */}
      <Image
        src="/chatbot.png"
        alt="chatbot"
        width={50}
        height={50}
        priority={true}
        className="fixed bottom-5 right-5 z-50 cursor-pointer"
        onClick={() => {
          document.getElementById("chatBox").classList.toggle("hidden");
        }}
      />
      {/* Chat Box */}
      <div
        ref={chatBoxRef}
        id="chatBox"
        style={{
          height: "70vh",
          width: "350px",
          background: "linear-gradient(135deg, #5B86E5, #36D1DC)", // Softer gradient
          borderRadius: "20px", // Smooth border
          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.15)", // Deeper shadow
        }}
        className="fixed bottom-5 right-1 z-50 hidden"
      >
        {/* ChatBox header */}
        <div className="flex items-center justify-between p-4 bg-blue-700 rounded-t-lg">
          <div className="flex items-center space-x-3">
            <Image src="/chatbot.png" alt="chatbot" width={30} height={30} />
            <p className="text-white text-lg font-bold">EventBot</p>
          </div>
          <button
            className="text-white hover:bg-blue-500 p-2 rounded-full transition duration-200"
            onClick={() => {
              document.getElementById("chatBox").classList.toggle("hidden");
            }}
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        {/* ChatBox body */}
        <div
          style={{
            position: "relative",
            height: "calc(100% - 60px)",
            width: "100%",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column-reverse",
            padding: "10px",
            backgroundColor: "#F7F7F7", // Lighter background for chat content
            scrollbarWidth: "none"
          }}
        >
          <div id="webchat"></div>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
