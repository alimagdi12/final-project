import React, { useContext, useState } from 'react';
import { Box, List, ListItem, ListItemText, ListItemIcon, Divider, Typography } from '@mui/material';
import { ShoppingCart, ListAlt, ExitToApp } from '@mui/icons-material';
import CategoryIcon from '@mui/icons-material/Category';
import ColorContext from '../../../contexts/ColorContext';
import '@fontsource/cairo/500.css'; // Import Cairo Medium
import '@fontsource/cairo/700.css'; // Import Cairo Bold

const Sidebar = ({ onMenuItemClick }) => {
    const { color, lightColor } = useContext(ColorContext);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleItemClick = (item) => {
        setSelectedItem(item);
        onMenuItemClick(item);
    };

    const menuItems = [
        { id: 'categories', text: 'Categories', icon: <CategoryIcon /> },
        { id: 'products', text: 'Products', icon: <ShoppingCart /> },
        { id: 'orders', text: 'Orders', icon: <ListAlt /> },
        { id: 'logout', text: 'Log Out', icon: <ExitToApp /> }
    ];

    return (
        <Box
            sx={{
                height: '100%',
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
