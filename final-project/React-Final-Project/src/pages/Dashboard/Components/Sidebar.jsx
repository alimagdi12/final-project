import React, { useState } from 'react';
import { Box, List, ListItem, ListItemText, ListItemIcon, Divider, Typography } from '@mui/material';
import { Dashboard, ShoppingCart, ListAlt, BarChart, Settings, ExitToApp } from '@mui/icons-material'
import CategoryIcon from '@mui/icons-material/Category';


const Sidebar = ({ onMenuItemClick }) => {
    const [selectedItem, setSelectedItem] = useState(null);

    const handleItemClick = (item) => {
        setSelectedItem(item);
        onMenuItemClick(item);
    };

    return (
        <Box sx={{  height: '100%', width: { xs: '100%', md: 250 }, backgroundColor: '#1F1B24', color: '#fff', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ padding: '16px', textAlign: 'center', background: 'linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)' }}>
                <Typography variant="h5" component="div" sx={{ color: '#fff' }}>VibeVerse</Typography>
            </Box>
            <Divider />
            <List>
                <ListItem button onClick={() => handleItemClick('categories')} selected={selectedItem === 'categories'}>
                    <ListItemIcon><CategoryIcon style={{ color: '#AC51CC' }} /></ListItemIcon>
                    <ListItemText primary="Categories" sx={{ color: selectedItem === 'categories' ? '#AC51CC' : '#fff' }} />
                </ListItem>
                <ListItem button onClick={() => handleItemClick('products')} selected={selectedItem === 'products'}>
                    <ListItemIcon><ShoppingCart style={{ color: '#AC51CC' }} /></ListItemIcon>
                    <ListItemText primary="Products" sx={{ color: selectedItem === 'products' ? '#AC51CC' : '#fff' }} />
                </ListItem>
                <ListItem button onClick={() => handleItemClick('orders')} selected={selectedItem === 'orders'}>
                    <ListItemIcon><ListAlt style={{ color: '#AC51CC' }} /></ListItemIcon>
                    <ListItemText primary="Orders" sx={{ color: selectedItem === 'orders' ? '#AC51CC' : '#fff' }} />
                </ListItem>

                <ListItem button onClick={() => handleItemClick('logout')} selected={selectedItem === 'logout'}>
                    <ListItemIcon><ExitToApp style={{ color: '#AC51CC' }} /></ListItemIcon>
                    <ListItemText primary="Log Out" sx={{ color: selectedItem === 'logout' ? '#AC51CC' : '#fff' }} />
                </ListItem>
            </List>
        </Box>
    );
};

export default Sidebar;
