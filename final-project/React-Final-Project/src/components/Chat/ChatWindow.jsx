import React, { useContext, useEffect, useRef } from "react";
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

const ChatWindow = ({ id, selectedChat, messagesByChat, input, setInput, sendMessage, userData }) => {

  console.log(selectedChat);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messagesByChat[id]]);

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        padding: "16px",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
          flexGrow: 1,
          overflowY: "auto",
          marginBottom: "16px",
          maxHeight: "calc(100vh )",
          widows: '100%'
        }}
      >
        <List sx={{ display: 'flex', flexDirection: 'column', width: '100%', flexWrap: 'wrap' }}>
          {
            selectedChat?.messages?.map((msg, index) => (

              msg.sender === userData._id ?
                (
                  <ListItem
                    key={index}
                    alignItems="flex-end"
                    sx={{
                      alignSelf: 'end',
                      width: '30%',
                      justifyContent: "flex-end",
                      textAlign: "right",
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar />
                    </ListItemAvatar>
                    <ListItemText sx={{display:'flex', flexDirection:'column', alignItems:'flex-start'}} primary={msg.sender.firstName} secondary={msg.content} />
                  </ListItem>
                )
                :
                (
                  <ListItem
                    key={index}
                    alignItems="flex-start"
                    sx={{
                      width: '100%',
                      justifyContent: "flex-start",
                      textAlign: "left",
                      alignItems:'center'
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar />
                    </ListItemAvatar>
                    <ListItemText primary={msg.sender.firstName} secondary={msg.content} />
                  </ListItem>
                )
            ))
          }

{messagesByChat[id]?.map((msg, index) => (

msg.sender === userData._id ?
  (
    <ListItem
    key={index}
    alignItems="flex-end"
    sx={{
      alignSelf: 'end',
      width: '30%',
      justifyContent: "flex-end",
      textAlign: "right",
    }}
  >
    <ListItemAvatar>
    <Avatar/>
    </ListItemAvatar>
    <ListItemText sx={{display:'flex', flexDirection:'column', alignItems:'flex-start'}} primary={userData.firstName} secondary={msg.content} />
  </ListItem>
  )
  :
  (
    <ListItem
    key={index}
    alignItems="flex-start"
    sx={{
      alignSelf: 'start',
      width: '30%',
      justifyContent: "flex-start",
      textAlign: "left",
    }}
  >
    <ListItemAvatar>
      <Avatar/>
    </ListItemAvatar>
    <ListItemText primary={userData.firstName} secondary={msg.content} />
  </ListItem>
  )
))
}

          {/* {messagesByChat[id]?.map((msg, index) => (
            
            <ListItem
              key={index}
              alignItems="flex-start"
              sx={{
                justifyContent: "flex-end",
                textAlign: "right", 
              }}
            >
              <ListItemAvatar>
                <Avatar>{msg.sender[0]}</Avatar>
              </ListItemAvatar>
              <ListItemText primary={userData.firstName} secondary={msg.content} />
            </ListItem>
          ))} */}
          <div ref={messagesEndRef} />
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
