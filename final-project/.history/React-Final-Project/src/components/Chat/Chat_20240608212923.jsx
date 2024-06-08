import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
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
    const message = { sender: userData._id, message: input };
    socket.emit("chat message", message);
    setInput("");
  };

  return (
    <Box mt={3}>
      <Grid container spacing={2} direction="column">
        <Grid item>
          <Box
            sx={{
              maxHeight: '60vh',
              overflowY: 'auto',
              padding: 2,
              border: '1px solid #ccc',
              borderRadius: 2,
            }}
          >
            {messages.map((msg, index) => (
              <Typography key={index} variant="body1" component="div">
                <strong>{msg.sender}</strong>: {msg.message}
              </Typography>
            ))}
          </Box>
        </Grid>
        <Grid item>
          <TextField
            fullWidth
            variant="outlined"
            label="Type a message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') sendMessage();
            }}
          />
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" fullWidth onClick={sendMessage}>
            Send
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Chat;
