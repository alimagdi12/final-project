import React, { useContext, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";
import io from "socket.io-client";
import axios from "axios";
import UserContext from "../../contexts/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import { Box } from "@mui/material";
let socket;
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
    const navigate = useNavigate();

    // Initialize socket connection
    useEffect(() => {
        socket = io("http://localhost:3000", {
            extraHeaders: {
                jwt: localStorage.getItem("token"),
            },
        });

        socket.on("connect", () => {
            console.log("Connected to server");
        });

        socket.on("chat message", (message) => {
            if ((message.sender === userData?._id && message.receiver === id) || (message.sender === id && message.receiver === userData?._id)) {
                setMessages((prevMessages) => [...prevMessages, message]);
            }
        });

        // Cleanup on component unmount
        return () => {
            socket.disconnect();
        };
    }, [id, userData?._id]);

    const getMessages = async () => {
        try {
            const response = await axios.post(
                "http://127.0.0.1:3000/api/v1/auth/usersMessages",
                { sender: userData?._id, receiver: id }
            );

            response.data.forEach((message) => {
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
    }, [id, userData?._id]);

    const sendMessage = () => {
        const message = { sender: userData?._id, receiver: id, content: input };
        console.log(message);
        socket.emit("chat message", message);
        setInput("");
        console.log(message);
        setMessages((prevMessages) => [...prevMessages, message]);
    };

    const handleChatClick = (chat) => {
        const participantId = userData._id === chat.participants[0]._id ? chat.participants[1]._id : chat.participants[0]._id;
        navigate(`/chat/${participantId}`);
        setSelectedChat(chat);
    };

    return (
        <Box sx={{ display: 'flex', width: '100%' }}>
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
    );
};

export default Chat;
