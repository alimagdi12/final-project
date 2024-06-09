import React from "react";
import { Search as SearchIcon } from '@mui/icons-material';
import {
  Box,
  Typography,
  InputBase,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ conversation, userData, handleChatClick }) => {
  const navigate = useNavigate();
  
  return (
    <Box sx={{ width: '400px', backgroundColor: '#2f3b52', color: '#fff', padding: '16px', height:'90vh' }}>
      <Typography variant="h6" gutterBottom>
        All Chats
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
        <SearchIcon />
        <InputBase placeholder="Search…" sx={{ marginLeft: '8px', flex: 1, color: '#fff' }} />
      </Box>
      <List>
        {conversation.map((chat, index) => (
          <ListItem key={index} button onClick={() => handleChatClick(chat)}>
            <ListItemAvatar>
              <Avatar />
            </ListItemAvatar>
            <ListItemText
              primary={
                chat.participants[0]._id === userData._id
                  ? chat.participants[1].firstName
                  : chat.participants[0].firstName
              }
              secondary={chat?.message}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
