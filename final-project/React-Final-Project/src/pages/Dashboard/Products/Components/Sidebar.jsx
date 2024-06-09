import React from 'react';
import { Box, List, ListItem, ListItemText, ListItemIcon, Divider, Typography } from '@mui/material';
import { Dashboard, ShoppingCart, ListAlt, BarChart, Settings, ExitToApp } from '@mui/icons-material';

const Sidebar = ({ onMenuItemClick }) => {
    return (
        <Box sx={{height:'100vh', width: { xs: '100%', md: 250 }, backgroundColor: '#1F1B24', color: '#fff', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ padding: '16px', textAlign: 'center', background: 'linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)' }}>
                <Typography variant="h5" component="div" sx={{ color: '#fff' }}>VibeVerse</Typography>
            </Box>
            <Divider />
            <List>
                <ListItem button onClick={() => onMenuItemClick('dashboard')}>
                    <ListItemIcon><Dashboard style={{ color: '#AC51CC' }} /></ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItem>
                <ListItem button onClick={() => onMenuItemClick('products')}>
                    <ListItemIcon><ShoppingCart style={{ color: '#AC51CC' }} /></ListItemIcon>
                    <ListItemText primary="Products" />
                </ListItem>
                <ListItem button onClick={() => onMenuItemClick('orders')}>
                    <ListItemIcon><ListAlt style={{ color: '#AC51CC' }} /></ListItemIcon>
                    <ListItemText primary="Orders" />
                </ListItem>
                <ListItem button onClick={() => onMenuItemClick('analytics')}>
                    <ListItemIcon><BarChart style={{ color: '#AC51CC' }} /></ListItemIcon>
                    <ListItemText primary="Analytics" />
                </ListItem>
                <Divider />
                <ListItem button onClick={() => onMenuItemClick('settings')}>
                    <ListItemIcon><Settings style={{ color: '#AC51CC' }} /></ListItemIcon>
                    <ListItemText primary="Settings" />
                </ListItem>
                <ListItem button onClick={() => onMenuItemClick('logout')}>
                    <ListItemIcon><ExitToApp style={{ color: '#AC51CC' }} /></ListItemIcon>
                    <ListItemText primary="Log Out" />
                </ListItem>
            </List>
        </Box>
    );
};

export default Sidebar;
