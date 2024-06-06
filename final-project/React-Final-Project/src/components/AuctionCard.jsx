import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Box, ButtonBase } from '@mui/material';

const AuctionCard = ({ item, onBidClick }) => {
    return (
        <Card sx={{ marginLeft: '15px' }}>
            <Box sx={{  padding: '5px' }}>
                <CardMedia
                    component="img"
                    height="250px"
                    sx={{ borderRadius: '5px' }}
                    image={item.image}
                    alt={item.title}
                />
                <ButtonBase
                    sx={{
                        borderRadius: '5px',
                        fontWeight: 'bold',
                        fontSize: '12px',
                        padding: '10px 6px',
                        position: 'absolute',
                        bottom: 16,
                        right: 16,
                        backgroundColor: '#5DAA60',
                        color: '#fff',
                    }}
                    variant="contained"
                >
                    {item.timeLeft}
                </ButtonBase>
            </Box>

            {/* Card Content */}
            <CardContent sx={{ padding: '5px' }}>
                <Typography gutterBottom variant="h5" component="div">
                    {item.title}
                </Typography>
                <Box textAlign={'center'}>
                    <Typography sx={{ marginTop: '16px', display: 'flex', justifyContent: 'space-around', fontWeight: 'bold' }} variant="body2" >
                        Your last bid:<Box sx={{ backgroundColor: '#5DAA60', color: '#fff', padding: '6px 12px', borderRadius: '5px', fontWeight: 'bold' }}> {item.yourBid}$</Box>
                    </Typography>
                    <Typography sx={{ marginTop: '22px', display: 'flex', justifyContent: 'space-around', fontWeight: 'bold' }} variant="body2" >
                        Highest bid: <Box sx={{ backgroundColor: '#5DAA60', color: '#fff', padding: '6px 12px', borderRadius: '5px', fontWeight: 'bold' }}>{item.highestBid}$</Box>
                    </Typography>
                    <ButtonBase
                        sx={{
                            borderRadius: '5px',
                            fontWeight: 'bold',
                            fontSize: '12px',
                            padding: '10px 10px',
                            backgroundColor: '#5DAA60',
                            color: '#fff', marginTop: '22px', '&:hover': { backgroundColor: '#fff', color: '#5DAA60', outline: '2px solid #5DAA60' }
                        }}
                        variant="contained"
                    >
                        Go to bidding page
                    </ButtonBase>
                </Box>
            </CardContent>
            {/* End of Card content */}
        </Card>
    );
}

export default AuctionCard;


