import React, { useState, useContext } from 'react';
import { AppBar, Toolbar, Avatar, Box, Typography, InputBase, styled } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import ColorContext from '../../../contexts/ColorContext';
import UserContext from '../../../contexts/UserContext';
import { OrderContext } from '../../../contexts/OrderContext';
import { OrderRow } from '../Orders/Components/OrderRow';

// Custom styles for gradient text
const GradientTypography = styled(Typography)(({ theme }) => ({
    background: 'linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
}));

const Topbar = () => {
    const { color, lightColor } = useContext(ColorContext);
    const { userData } = useContext(UserContext);
    const { orders } = useContext(OrderContext);
    console.log(orders);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredOrders, setFilteredOrders] = useState([]);

    const handleSearchChange = (event) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);
        const results = orders?.orders?.filter(order =>
            order?.userId?.firstName?.toLowerCase().includes(term)
        );
        setFilteredOrders(results);
    };

    return (
        <>
            <AppBar
                position="static"
                sx={{
                    background: `linear-gradient(270deg, ${color} 30%,${lightColor} 110%)`,
                    margin: 'auto',
                    width: '90%',
                    borderRadius: '0 0 20px 20px',
                    boxShadow: 'none'
                }}
            >
                <Toolbar>
                    <Avatar alt="Sara" src={`${userData?.imageUrl?.images[0]}`} sx={{ marginRight: 2 }} />
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Hello, <span style={{ color: '#fff' }}>{userData?.firstName}</span>
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            borderRadius: '4px',
                            padding: '0 10px',
                            backgroundColor: '#fff'
                        }}
                    >
                        <SearchIcon sx={{ color: color }} />
                        <InputBase
                            placeholder="Search…"
                            sx={{ color: color, marginLeft: 1 }}
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </Box>
                </Toolbar>
            </AppBar>
            <Box sx={{ margin: '20px auto', width: '90%' }}>
                {filteredOrders.map(order => (
                    <Box key={order.id} sx={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                        {/* <Typography variant="body1">
                            {order.userId.firstName} {order.userId.lastName} - Order ID: {order._id}
                        </Typography> */}
                        <OrderRow/>
                        {/* Add more details about the order as needed */}
                    </Box>
                ))}
            </Box>
        </>
    );
};

export default Topbar;
