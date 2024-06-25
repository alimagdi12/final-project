import React, { useContext } from 'react';
import { Grid, Avatar, Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { OrderContext } from '../../../../contexts/OrderContext';


const Orders1 = () => {
    const {orders} = useContext(OrderContext)
    return (
        <Box sx={{ padding: 4, backgroundColor: '#E5F6E5', borderRadius: 2 }}>
            <Grid container spacing={2}>
                {orders.orders.map((order) => (
                    <Grid key={order._id} item xs={12} md={4} sx={{ textAlign: 'center' }}>
                        <Box sx={{ padding: 2, border: '1px solid #E0E0E0', borderRadius: 2 }}>
                            <Typography variant="h6">Order Id</Typography>
                            <Typography variant="subtitle1">{order._id}</Typography>
                            <Typography variant="h6">Order Status</Typography>
                            <Typography variant="subtitle1">{order.status}</Typography>
                            <Typography variant="h6">Ship To</Typography>
                            <Typography variant="subtitle1">{order.userId.firstName} {order.userId.lastName}</Typography>
                            <Typography variant="h6">Total</Typography>
                            <Typography variant="subtitle1">{order.totalAmount} EGP</Typography>

                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Orders1;