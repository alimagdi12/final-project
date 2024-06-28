import React, { useContext, useEffect, useState } from "react";
import { Search as SearchIcon } from "@mui/icons-material";
import {
  Box,
  Typography,
  InputBase,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  useMediaQuery,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ColorContext from "../../contexts/ColorContext";
import userContext from "../../contexts/UserContext";

const Sidebar = ({ conversation, handleChatClick }) => {
  const { userData } = useContext(userContext);
  const navigate = useNavigate();
  const { color } = useContext(ColorContext);
  const [selectedChatIndex, setSelectedChatIndex] = useState(null);
  const { id } = useParams();

  const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down("sm"));

  useEffect(() => {
    if (conversation.length) {
      const x = conversation.findIndex(
        (conversation) => id === conversation.participants[1]._id
      );
      if (x !== -1) {
        selectChat(conversation[x], x);
      }
    }
  }, [conversation, id]);

  const selectChat = (chat, index) => {
    handleChatClick(chat);
    setSelectedChatIndex(index);
  };

  return (
    <Box
      sx={{
        width: isSmallScreen ? "100vw" : "400px",
        backgroundColor: color,
        color: "#fff",
        padding: isSmallScreen ? "8px" : "16px",
        height: {s:'100%' , md:"100vh"},
        boxSizing: "border-box",
      }}
    >
      <Typography variant="h6" gutterBottom>
        All Chats
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
        <SearchIcon />
        <InputBase
          placeholder="Search…"
          sx={{ marginLeft: "8px", flex: 1, color: "#fff" }}
        />
      </Box>
      <List sx={{ width: "100%" }}>
        {conversation.map((chat, index) => (
          <ListItem
            key={index}
            button
            onClick={() => selectChat(chat, index)}
            sx={{
              backgroundColor:
                selectedChatIndex === index ? "#ffff" : "transparent",
              color: selectedChatIndex === index ? "black" : "white",
              borderRadius: isSmallScreen ? "0" : "50px 0 0 50px",
              "&:hover": { color: "black", backgroundColor: "#EFEAE2" },
              width: "100%",
            }}
          >
            <ListItemAvatar>
              <Avatar
                src={
                  chat.participants[0]._id === userData._id
                    ? chat.participants[1].imageUrl.images[0]
                    : chat.participants[0].imageUrl.images[0]
                }
              />
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
