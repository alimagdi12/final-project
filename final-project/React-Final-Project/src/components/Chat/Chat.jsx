import React, { useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";
import UserContext from "../../contexts/UserContext";

const socket = io("http://localhost:3000", {
  extraHeaders: {
    jwt: localStorage.getItem("token"),
  },
});

const Chat = () => {
  const { userData } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    console.log(userData);
    const fetchChatHistory = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/chat-history"
        );
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };

    fetchChatHistory();

    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("chat message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on("chat history", (history) => {
      setMessages(history);
    });

    return () => {
      socket.off("connect");
      socket.off("chat message");
      socket.off("chat history");
    };
  }, []);

  const sendMessage = () => {
    const message = { sender: userData._id,receiver:userD , message: input };
    socket.emit("chat message", message);
    setInput("");
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.sender}:</strong> {msg.message}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
