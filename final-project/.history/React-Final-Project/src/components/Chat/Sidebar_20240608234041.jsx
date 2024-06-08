import React from 'react';
import { Box, List, ListItem, ListItemAvatar, ListItemText, Avatar, Typography, InputBase } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

const Sidebar = () => {
    const chats = [
        { name: "Bessie Cooper", message: "I have something to tell you🙌", avatar: "/path/to/avatar1.jpg" },
        { name: "Darrell", message: "The current situation 😈", avatar: "/path/to/avatar2.jpg" },
        { name: "Designers", message: "Sure !!", avatar: "/path/to/avatar3.jpg😘" },
    ];

    return (
        <Box sx={{ width: '300px', backgroundColor: '#2f3b52', color: '#fff', padding: '16px' }}>
            <Typography variant="h6" gutterBottom>
                All Chats
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                <SearchIcon />
                <InputBase placeholder="Search…" sx={{ marginLeft: '8px', flex: 1, color: '#fff' }} />
            </Box>
            <List>
                {chats.map((chat, index) => (
                    <ListItem key={index} button>
                        <ListItemAvatar>
                            <Avatar src={chat.avatar} />
                        </ListItemAvatar>
                        <ListItemText primary={chat.name} secondary={chat.message} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default Sidebar;
