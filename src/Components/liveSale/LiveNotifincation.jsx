import React, { useEffect, useState } from "react";
import MessageBox from "./MessageBox";
import "./message.css";

const LiveNotifincation = ({ liveData, orderSuccessMessage }) => {
  const shopId = localStorage.getItem("shopId");
  console.log("orderSuccessMessage", orderSuccessMessage);
  console.log("liveData", liveData);
  // const orderSuccessMessageData = {
  //   shopId: "S-00000010",
  //   message: "Aung Aung got A001 x 2 from live sale.",
  //   socket: null,
  // };
  // console.log("orderSuccessMessage", orderSuccessMessage);
  const [messages, setMessages] = useState([]);

  const maxMessages = 100; // Maximum number of messages to display

  const showMessage = () => {
    // if (liveData.length === 0) return;

    if (liveData.shopID === shopId) {
      liveData.products.map((product) => {
        // console.log("product", product);
        if (product.quantity === 0) {
          const newMessage = {
            text: `${product.sale_code} is out of stock`,
            time: new Date().toLocaleTimeString(),
          };
          setMessages((prevMessages) => {
            // Limit the messages array and add the new message
            const newMessages = [...prevMessages, newMessage];
            // If exceeding maxMessages, remove the oldest message
            return newMessages.length > maxMessages
              ? newMessages.slice(1)
              : newMessages;
          });
        }

        return null; // Add this line to return a value from the arrow function
      });
    }

    if (orderSuccessMessage.shopId === shopId) {
      console.log("orderSuccessMessageData", orderSuccessMessage.message);
      const newMessage = {
        text: orderSuccessMessage.message,
        time: new Date().toLocaleTimeString(),
      };
      setMessages((prevMessages) => {
        // Limit the messages array and add the new message
        const newMessages = [...prevMessages, newMessage];
        // If exceeding maxMessages, remove the oldest message
        return newMessages.length > maxMessages
          ? newMessages.slice(1)
          : newMessages;
      });
    }
  };

  useEffect(() => {
    showMessage();
  }, [liveData, orderSuccessMessage]);

  // const decrementQuantity = () => {
  //   if (liveData.products[0].quantity >= 0) {
  //     const newQuantity = quantity - 1;
  //     setQuantity(newQuantity);
  //     const newMessage = `Quantity decreased to ${newQuantity}`;

  //     setMessages((prevMessages) => {
  //       // Limit the messages array and add the new message
  //       const newMessages = [...prevMessages, newMessage];
  //       // If exceeding maxMessages, remove the oldest message
  //       return newMessages.length > maxMessages
  //         ? newMessages.slice(1)
  //         : newMessages;
  //     });

  //     // Optionally auto-remove the latest message after a delay (e.g., 5 seconds)
  //     // setTimeout(() => {
  //     //   setMessages((prevMessages) =>
  //     //     prevMessages.filter((msg) => msg !== newMessage)
  //     //   );
  //     // }, 5000);
  //   }
  // };

  return (
    <div className="container">
      <div className="live-container">
        <div className="live-header">
          <p>Live Sale Notification</p>
        </div>
        <MessageBox messages={messages} />
      </div>
    </div>
  );
};

export default LiveNotifincation;
