import { Typography, Container, styled, Box } from '@mui/material';
import React, { useContext } from 'react';
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
    const {orders, userOrders, createOrder, getOrder, getUserOrders} = useContext(OrderContext)
    const classes = useStyles();

    return (
        <Container className={classes.root} sx={{width:'50%',display:'flex',flexDirection:'column', alignItems:'center', padding:'2%'}}>
            <Typography sx={{fontSize:'25px', fontWeight:'bold', color:'#2B4F2D'}} width={400} variant="h4" className={classes.content} gutterBottom>
                Relax, your order is on the way!
            </Typography>
            <img src="orderPlaceDone.png" width={400} alt="Order placed" className={classes.image}  />
        </Container>
    );
};

export default OrderDone;