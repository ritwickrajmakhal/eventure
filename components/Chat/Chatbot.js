"use client";
import { useEffect } from "react";
import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/24/outline";

const Chatbot = () => {
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
            backgroundColor: "transparent",
            bubbleBackground: "rgba(0, 0, 255, .1)",
            bubbleFromUserBackground: "rgba(0, 255, 0, .1)",
            bubbleFromUserTextColor: "white",
            bubbleTextColor: "white",
            bubbleFromUserBorderRadius: "10px",
            bubbleBorderRadius: "10px",
            sendBoxButtonColor: "black",
            sendBoxButtonColorOnHover: "black",
            sendBoxButtonColorOnPress: "black",
            sendBoxButtonColorOnDisabled: "black",
            hideUploadButton: true,
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
        id="chatBox"
        style={{ height: "70vh", width: "350px" }}
        className="fixed bottom-1 right-1 z-50 dark:bg-gray-800 bg-gray-100 rounded-lg shadow-lg hidden"
      >
        {/* ChatBox header */}
        <div className="flex items-center justify-between p-3 py-5 bg-gray-800 dark:bg-gray-100 rounded-t-lg">
          <p className="text-white dark:text-gray-800">EventBot</p>
          <button
            className="text-white dark:text-gray-800"
            onClick={() => {
              document.getElementById("chatBox").classList.toggle("hidden");
            }}
          >
            <XMarkIcon className="h-5 w-5" />
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
          }}
        >
          <div id="webchat"></div>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
