import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  TextField,
  IconButton,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const ChatWindow = ({ selectedChat, messages, input, setInput, sendMessage, userData }) => {
  return (
    <Box sx={{ flex: 1, display: "flex", flexDirection: "column", padding: "16px" }}>
      <Box sx={{ flexGrow: 1, overflowY: "auto", marginBottom: "16px" }}>
        <List>
          {selectedChat?.messages?.map((msg, index) => (
            <ListItem key={index} alignItems="flex-start">
              <ListItemAvatar>
                <Avatar />
              </ListItemAvatar>
              <ListItemText primary={msg.sender.firstName} secondary={msg.content} />
            </ListItem>
          ))}
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
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type a message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") sendMessage();
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
