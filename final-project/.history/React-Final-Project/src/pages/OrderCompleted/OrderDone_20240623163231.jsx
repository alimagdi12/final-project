import React, { useContext, useEffect } from 'react';
import { Typography, Container, Box, styled } from '@mui/material';
import { OrderContext } from '../../contexts/OrderContext';

const useStyles = styled((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundImage: `url('background_image_url')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        padding: theme.spacing(2),
    },
    content: {
        textAlign: 'center',
        marginBottom: theme.spacing(2),
    },
    image: {
        width: '50%',
    },
}));

const OrderDone = () => {
    const { orders, userOrders, createOrder, getOrder, getUserOrders, setOrders} = useContext(OrderContext);
    console.log(orders.orders[0].status );
    const classes = useStyles();

    useEffect(() => {
        getOrder()
        console.log(orders);
        // getUserOrders();
        // userOrders()
        // getOrder()
        // setOrders(orders)
    }, []);

    return (
        <Container className={classes.root}>
            <Typography variant="h4" className={classes.content} gutterBottom>
                Relax, your order is on the way!
            </Typography>
            <img src="orderPlaceDone.png" alt="Order placed" className={classes.image} />
            <Box mt={4} width="100%">
                {Array.isArray(orders) && orders.orders.length > 0 ? (
                    orders?.orders?.map((order) => (
                        <Container key={order._id} sx={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px', marginBottom: '10px' }}>
                            <Typography variant="h5" gutterBottom>
                                Order Details
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Order ID: {order._id}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Total Amount: ${order.totalAmount.toFixed(2)}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Total Amount: ${order.status}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Products:
                            </Typography>
                            <ul>
                                {order.items.map((item) => (
                                    <li key={item.productId._id}>
                                        {item.productId.title} - Quantity: {item.quantity}
                                    </li>
                                ))}
                            </ul>
                        </Container>
                    ))
                ) : (
                    <Typography variant="body1">No orders found</Typography>
                )}
            </Box>
        </Container>
    );
};

export default OrderDone;
