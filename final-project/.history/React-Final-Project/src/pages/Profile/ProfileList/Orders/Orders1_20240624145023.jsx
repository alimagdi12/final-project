import React, { useContext } from 'react';
import { Grid, Avatar, Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { OrderContext } from '../../../../contexts/OrderContext';

// const orders = [
//     {
//         id: '1',
//         orderPlaced: '9 Mar 2024',
//         total: '23.900',
//         shipTo: 'Sara Ayman',
//         items: [
//             {
//                 _id: '123',
//                 folderName: 'macbook',
//                 imagesUrl: { images: ['macbook.jpg'] },
//                 description: "Macbook Air MGN63 13'' Apple M1 Chip With 8-Core Processor"
//             },
//         ],
//     },
//     {
//         id: '2',
//         orderPlaced: '9 May 2024',
//         total: '23.900',
//         shipTo: 'Sara Ayman',
//         items: [
//             {
//                 _id: '124',
//                 folderName: 'clothes',
//                 imagesUrl: { images: ['clothes.jpg'] },
//                 description: 'T-Shirt, Pants and shoes by Pull&Bear'
//             },
//         ],
//     },
//     {
//         id: '3',
//         orderPlaced: '9 Jun 2024',
//         total: '23.900',
//         shipTo: 'Sara Ayman',
//         items: [
//             {
//                 _id: '125',
//                 folderName: 'jacket',
//                 imagesUrl: { images: ['jacket.jpg'] },
//                 description: 'Cool leather jacket for everyday use water proof'
//             },
//         ],
//     },
// ];

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
                            <Typography variant="h6">Order Placed</Typography>
                            <Typography variant="subtitle1">{order.orderPlaced}</Typography>
                            <Typography variant="h6">Ship To</Typography>
                            <Typography variant="subtitle1">{order.userId.firstName} {order.userId.lastName}</Typography>
                            <Typography variant="h6">Total</Typography>
                            <Typography variant="subtitle1">{order.total}</Typography>
                            <Button variant="contained" color="success" component={Link} to={`/order/${order.id}`}>
                                View Order Details
                            </Button>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Orders1;