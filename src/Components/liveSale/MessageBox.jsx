import React, { useEffect, useRef } from "react";

const MessageBox = ({ messages }) => {
  const messageBoxRef = useRef(null);

  useEffect(() => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight; // Scroll to the top whenever messages change
    }
  }, [messages]);

  // console.log("messages", messages);
  return (
    <div className="message-box" ref={messageBoxRef}>
      {messages.map((message, index) => {
        // Check if the message indicates that the quantity is 0
        const isZeroStockMessage = message.text.includes("is out of stock");

        return (
          <div
            key={index}
            className="message"
            style={{
              backgroundColor: isZeroStockMessage ? "#FF7F7F" : "inherit",
            }} // Change color for zero stock message
          >
            <span style={{ fontWeight: "bold", marginBottom: "10px" }}>
              {message.text}
            </span>
            <span style={{ fontSize: "12px" }}>{message.time}</span>
          </div>
        );
      })}
    </div>
  );
};

export default MessageBox;
