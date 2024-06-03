import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Box, ButtonBase } from '@mui/material';

const  CompletedOrderCard = ({ order, onBidClick }) => {
    return (
        <Card sx={{marginLeft:'15px'}}>
    <Box sx={{ position: 'relative', padding:'5px'}}>
        <CardMedia
            component="img"
            height="250px"
            sx={{borderRadius:'5px'}}
            image={order.image}
            alt={order.title}
        />
        <ButtonBase
            sx={{
                borderRadius:'5px',
                fontWeight:'bold',
                fontSize:'12px',
                padding:'10px 6px',
                position: 'absolute',
                bottom: 16,
                right: 16,
                backgroundColor:'#5DAA60',
                color: '#fff',
            }}
            variant="contained"
        >
            {order.status}
        </ButtonBase>
    </Box>
    <CardContent sx={{padding:'5px'}}>
        <Typography gutterBottom variant="h5" component="div">
            {order.title}
        </Typography>
        <Box textAlign={'center'}> 
            
        </Box>
    </CardContent>
</Card>
    );
}

export default CompletedOrderCard;


