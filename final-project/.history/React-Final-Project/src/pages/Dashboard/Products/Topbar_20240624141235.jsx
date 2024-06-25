import React, { useState, useContext, useEffect } from 'react';
import { AppBar, Toolbar, Avatar, Box, Typography, InputBase, styled } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import ColorContext from '../../../contexts/ColorContext';
import UserContext from '../../../contexts/UserContext';
import { OrderContext } from '../../../contexts/OrderContext';
import OrderRow from '../Orders/Components/OrderRow'; // Ensure you import the correct component

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
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredOrders, setFilteredOrders] = useState([]);

    useEffect(() => {
        if (orders?.orders) {
            const results = orders.orders.filter(order =>
                order?.userId?.firstName?.toLowerCase().includes(searchTerm)
            );
            setFilteredOrders(results);
        }
    }, [searchTerm, orders]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
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
                    <Box key={order._id} sx={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                        <OrderRow order={order} />
                    </Box>
                ))}
            </Box>
        </>
    );
};

export default Topbar;
