import React, { useContext, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";
import io from "socket.io-client";
import axios from "axios";
import UserContext from "../../contexts/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Container } from "@mui/material";

const socket = io("http://localhost:3000", {
  extraHeaders: {
    jwt: localStorage.getItem("token"),
  },
});

const Chat = () => {
  const { id } = useParams();
  const [chats, setChats] = useState([]);
  const { userData, fetchUserData } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [input, setInput] = useState("");
  const [conversation, setConversation] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const senderMessages = {};
const navigate = useNavigate()
  const getMessages = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:3000/api/v1/auth/usersMessages",
        { sender: userData?._id, receiver: id }
      );

      response.data.forEach(message => {
        if (!senderMessages[message.sender._id]) {
          senderMessages[message.sender._id] = []; // Initialize array if not exists
        }
        senderMessages[message.sender._id].push(message);
      });

      const senderArrays = Object.values(senderMessages);
      setChats(senderArrays);
      setChatMessages(response.data);
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  const getConversations = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:3000/api/v1/auth/conversation",
        { sender: userData?._id }
      );
      setConversation(response.data);
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
    getConversations();
    getMessages();
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("chat message", (message) => {
      if ((message.sender === userData?._id) || (message.receiver === userData?._id)) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    });

    return () => {
      socket.off("connect");
      socket.off("chat message");
    };
  }, [id, userData?._id]);

  const sendMessage = () => {
    const message = { sender: userData?._id, receiver: id, message: input };
    socket.emit("chat message", message);
    setInput("");
  };

  const handleChatClick = (chat) => {
    if(userData._id === chat.participants[1]._id){
      navigate(`/chat/${chat.participants[1]._id}`)
    }
    else if(userData._id === chat.participants[0]._id){
      navigate(`/chat/${chat.participants[0]._id}`)
    }
    setSelectedChat(chat);
  };

  return (
    <>
<Box sx={{display:'flex', width:'100%'}}>

      <Sidebar conversation={conversation} userData={userData} handleChatClick={handleChatClick} />
      <ChatWindow
        selectedChat={selectedChat}
        messages={messages}
        input={input}
        setInput={setInput}
        sendMessage={sendMessage}
        userData={userData}
        />
        </Box>
    </>
  );
};

export default Chat;
