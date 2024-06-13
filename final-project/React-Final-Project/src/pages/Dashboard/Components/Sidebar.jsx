import React, { useContext, useState } from 'react';
import { Box, List, ListItem, ListItemText, ListItemIcon, Divider, Typography } from '@mui/material';
import { ShoppingCart, ListAlt, ExitToApp } from '@mui/icons-material';
import CategoryIcon from '@mui/icons-material/Category';
import ColorContext from '../../../contexts/ColorContext';
import PostsContext from '../../../contexts/PostsContext';
import '@fontsource/cairo/500.css'; // Import Cairo Medium
import '@fontsource/cairo/700.css'; // Import Cairo Bold

import { useNavigate } from "react-router-dom";
import UserContext from '../../../contexts/UserContext';
const Sidebar = ({ onMenuItemClick }) => {
    const {fetchUserData, userData}= useContext(UserContext)
    const { color, lightColor } = useContext(ColorContext);
    const [selectedItem, setSelectedItem] = useState(null);
   const navigate = useNavigate()
    const handleItemClick = (item) => {
        if(item === 'logout'){
            localStorage.setItem('token' , '')
            navigate('/login')
            fetchUserData()
            console.log(userData);
        }
        setSelectedItem(item);
        onMenuItemClick(item);
    };

    const menuItems = [
        { id: 'categories', text: 'Categories', icon: <CategoryIcon /> },
        { id: 'products', text: 'Products', icon: <ShoppingCart /> },
        { id: 'orders', text: 'Orders', icon: <ListAlt /> },
        { id: 'posts', text: 'Posts', icon: <CategoryIcon /> },
        { id: 'logout', text: 'Log Out', icon: <ExitToApp /> }
    ];

    return (
        <Box
            sx={{
                height: '100vh',
                width: { xs: '100%', md: '100%' },
                background: `radial-gradient(${lightColor}, ${color})`,
                color: '#fff',
                display: 'flex',
                flexDirection: 'column',
                fontFamily: 'Cairo, sans-serif', // Apply the font family here
                fontWeight: 500, // Apply medium weight to the entire box
            }}
        >
            <Box sx={{ padding: '16px', textAlign: 'center',background:  `linear-gradient(10deg, ${color} 30%, ${lightColor} 90%)` }}>
                <Typography variant="h5" component="div" sx={{ paddingBottom:'3px', color: '#fff', fontFamily: 'Cairo, sans-serif', fontWeight: 700 }}>
                    VibeVerse
                </Typography>
            </Box>
            <Divider />
            <List>
                {menuItems.map((item) => (
                    <ListItem
                        button
                        key={item.id}
                        onClick={() => handleItemClick(item.id)}
                        selected={selectedItem === item.id}
                        sx={{ color: '#fff' }}
                    >
                        <ListItemIcon sx={{ color: '#fff' }}>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} sx={{ color: '#fff' }} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default Sidebar;
