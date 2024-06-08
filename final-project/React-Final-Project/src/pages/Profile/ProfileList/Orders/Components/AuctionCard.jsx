import React, { useContext } from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Box, ButtonBase } from '@mui/material';
import ColorContext from '../../../../../contexts/ColorContext';

const AuctionCard = ({ item, onBidClick }) => {
    const { color } = useContext(ColorContext)
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
                        backgroundColor: color,
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
                        Your last bid:<Box sx={{ backgroundColor: color, color: '#fff', padding: '6px 12px', borderRadius: '5px', fontWeight: 'bold' }}> {item.yourBid}$</Box>
                    </Typography>
                    <Typography sx={{ marginTop: '22px', display: 'flex', justifyContent: 'space-around', fontWeight: 'bold' }} variant="body2" >
                        Highest bid: <Box sx={{ backgroundColor: color, color: '#fff', padding: '6px 12px', borderRadius: '5px', fontWeight: 'bold' }}>{item.highestBid}$</Box>
                    </Typography>
                    <ButtonBase
                        sx={{
                            borderRadius: '5px',
                            fontWeight: 'bold',
                            fontSize: '12px',
                            padding: '10px 10px',
                            backgroundColor: color,
                            color: '#fff', marginTop: '22px', '&:hover': { backgroundColor: '#fff' , transition:'0.3s ease in out', color: color, outline: `2px solid ${color}`  }
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


