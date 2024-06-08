import React, { useContext, useEffect, useState } from 'react';
import { Box, Typography, TextField, IconButton, List, ListItem, ListItemAvatar, ListItemText, Avatar, Grid, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import io from 'socket.io-client';
import axios from 'axios';
import UserContext from '../contexts/UserContext';

const socket = io('http://localhost:3000', {
  extraHeaders: {
    jwt: localStorage.getItem('token'),
  },
});

const ChatWindow = () => {
  const { userData } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/chat-history');
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching chat history:', error);
      }
    };

    fetchChatHistory();

    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('chat message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('connect');
      socket.off('chat message');
    };
  }, []);

  const sendMessage = () => {
    const message = { sender: userData._id, message: input };
    socket.emit('chat message', message);
    setInput('');
  };

  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '16px' }}>
      <Box sx={{ flexGrow: 1, overflowY: 'auto', marginBottom: '16px' }}>
        <List>
          {messages.map((msg, index) => (
            <ListItem key={index} alignItems="flex-start">
              <ListItemAvatar>
                <Avatar>{msg.sender[0]}</Avatar>
              </ListItemAvatar>
              <ListItemText primary={msg.sender} secondary={msg.message} />
            </ListItem>
          ))}
        </List>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type a message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') sendMessage();
          }}
        />
        <IconButton color="primary" onClick={sendMessage}>
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ChatWindow;
