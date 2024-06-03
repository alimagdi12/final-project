import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Box, ButtonBase } from '@mui/material';

const  CompletedBidCard = ({ item, onBidClick }) => {
    return (
        <Card sx={{marginLeft:'15px'}}>
    <Box sx={{ position: 'relative', padding:'5px'}}>
        <CardMedia
            component="img"
            height="250px"
            sx={{borderRadius:'5px'}}
            image={item.image}
            alt={item.title}
        />
        <ButtonBase
            sx={{
                borderRadius:'5px',
                fontWeight:'bold',
                fontSize:'12px',
                padding:'10px 6px',
                position: 'absolute',
                bottom: 16,
                left: 16,
                backgroundColor:item.bidder === 'YOU WON'? '#5DAA60' : '#DC1F1F',

                color: '#fff',
            }}
            variant="contained"
        >
            {item.bidder === "YOU WON" ? "YOU WON" : "YOU LOST"}
        </ButtonBase>
        <ButtonBase
            sx={{
                borderRadius:'5px',
                fontWeight:'bold',
                fontSize:'12px',
                padding:'10px 6px',
                position: 'absolute',
                bottom: 16,
                right: 16,
                backgroundColor: item.checkWinner === 'win' ? '#5DAA60': '#2B4F2D',
                color: '#fff',
            }}
            variant="contained"
        >
            {item.checkWinner === "win" ? "Got to cart 🛒" : "Hard luck"}
        </ButtonBase>
    </Box>
    <CardContent sx={{padding:'5px'}}>
        <Typography gutterBottom variant="h5" component="div">
            {item.title}
        </Typography>
        
    </CardContent>
</Card>
    );
}

export default CompletedBidCard;


