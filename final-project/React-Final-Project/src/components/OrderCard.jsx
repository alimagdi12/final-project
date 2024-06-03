import React, { useState } from 'react';
import { Card, CardMedia, CardContent, Typography, Button, ButtonBase, Box } from '@mui/material';

const OrderCard = ({ order, onCancelClick }) => {

    console.log(order);
    console.log(order.image);
    return (
        <Card sx={{ marginLeft: '15px' }}>
            <Box sx={{ position: 'relative', padding: '5px' }}>
                <CardMedia
                    component="img"
                    height="250px"
                    sx={{ borderRadius: '5px' }}
                    image={order.image}
                    alt={order.title}
                />

            </Box>
            <CardContent sx={{ padding: '5px', marginTop: '25px' }}>
                <Typography gutterBottom variant="h5" component="div">
                    {order.title}
                </Typography>
                <Box textAlign={'center'}>

                    <ButtonBase
                        sx={{
                            borderRadius: '5px',
                            fontWeight: 'bold',
                            fontSize: '12px',
                            padding: '9px 25px',
                            backgroundColor: '#DC1F1F',
                            color: '#fff', marginTop: '22px', '&:hover': { backgroundColor: '#fff', color: '#DC1F1F', outline: '2px solid #DC1F1F' }
                        }}
                        variant="contained"
                        onClick={() => onCancelClick(order?.id)}
                    >
                        Cancel order
                    </ButtonBase>
                </Box>
            </CardContent>
        </Card>
    );
};

export default OrderCard
