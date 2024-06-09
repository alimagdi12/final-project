import React, { useState } from 'react';
import { Box, Grid } from '@mui/material';
import Sidebar from './Components/Sidebar';
import Topbar from './Products/Topbar';
import Content from './Products/Content';
import OrderList from './Orders/Components/OrderList';

const Dashboard = () => {
    const [selectedMenuItem, setSelectedMenuItem] = useState('products');

    const handleMenuItemClick = (menuItem) => {
        setSelectedMenuItem(menuItem);
    };

    return (
        <Grid container sx={{ }}>
            <Grid item xs={12} md={3} lg={2}>
                <Sidebar onMenuItemClick={handleMenuItemClick} />
            </Grid>
            <Grid item xs={12} md={9} lg={10} sx={{ display: 'flex', flexDirection: 'column' }}>
                <Topbar />
                {/* <Box sx={{ flexGrow: 1, overflow: 'auto', height:'100vh' }}> */}
                    {selectedMenuItem === 'products' && <Content />}
                    {selectedMenuItem === 'orders' && <OrderList />}
                {/* </Box> */}
            </Grid>
        </Grid>
    );
};

export default Dashboard;
