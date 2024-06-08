import React, { useContext, useState } from 'react';
import { Container, Box, ButtonBase, Typography, Card, Grid } from '@mui/material';
import OrderCard from './Components/OrderCard';
import AuctionCard from './Components/AuctionCard';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CompletedBidCard from './Components/CompletedBidCard';
import CompletedOrderCard from './Components/CompletedOrderCard';
import { useMediaQuery } from '@mui/material';
import ColorContext from '../../../../contexts/ColorContext';

const activeBidsObj = [
    {
        id: 1,
        title: 'Macbook Air MGN63 13" Apple M1 Chip With 8-Core Processor',
        image: '../../public/clothes.jpg',
        yourBid: 20,
        highestBid: 50,
        timeLeft: '2 hours left',
    },
    {
        id: 2,
        title: 'Macbook Air MGN63 13" Apple M1 Chip With 8-Core Processor',
        image: '../../public/labtop.jpg',
        yourBid: 20,
        highestBid: 50,
        timeLeft: '2 hours left',
    }
];

const pendingOrdersObj = [
    {
        id: 1,
        title: 'Hair and face care by Curology',
        image: '../../public/shmpo.jpg',
    },
    {
        id: 2,
        title: 'Hair and face care by Curology',
        image: '../../public/shmpo.jpg',
    },
];

const completedBids = [
    {
        id: 1,
        title: 'Macbook Air MGN63 13" Apple M1 Chip With 8-Core Processor',
        image: '../../public/clothes.jpg',
        yourBid: 20,
        highestBid: 50,
        bidder:'YOU LOST',
        checkWinner:'win'
    },
    {
        id: 2,
        title: 'Macbook Air MGN63 13" Apple M1 Chip With 8-Core Processor',
        image: '../../public/labtop.jpg',
        yourBid: 20,
        highestBid: 50,
        bidder:'YOU WON',
        checkWinner:'lost'
    }
    ,
    {
        id: 3,
        title: 'Macbook Air MGN63 13" Apple M1 Chip With 8-Core Processor',
        image: '../../public/labtop.jpg',
        yourBid: 20,
        highestBid: 50,
        bidder:'YOU WON',
        checkWinner:'lost'
    }
    ,
    {
        id: 4,
        title: 'Macbook Air MGN63 13" Apple M1 Chip With 8-Core Processor',
        image: '../../public/labtop.jpg',
        yourBid: 20,
        highestBid: 50,
        bidder:'YOU WON',
        checkWinner:'lost'
    }
];

const completedOrders = [
    {
        id: 1,
        title: 'Macbook Air MGN63 13" Apple M1 Chip With 8-Core Processor',
        image: '../../public/clothes.jpg',
        status:'Delivered'
    },
    {
        id: 2,
        title: 'Macbook Air MGN63 13" Apple M1 Chip With 8-Core Processor',
        image: '../../public/labtop.jpg',
        status:'Delivered'
    },
    {
        id: 3,
        title: 'Macbook Air MGN63 13" Apple M1 Chip With 8-Core Processor',
        image: '../../public/labtop.jpg',
        status:'Delivered'
    },
    {
        id: 4,
        title: 'Macbook Air MGN63 13" Apple M1 Chip With 8-Core Processor',
        image: '../../public/labtop.jpg',
        status:'Delivered'
    }
];


function Orders() {
    const { color } = useContext(ColorContext)
    const [activeTab, setActiveTab] = useState('active');
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: isSmallScreen ? 1 : 3,
        slidesToScroll: 3,
        vertical: isSmallScreen,
    };
    

    const handleTabToggle = (tab) => {
        setActiveTab(tab);
    };

    return (
        
<Container>
    <Grid container>
            {/* Green Tab */}
            <Grid item xs={12} md={6}>
                <Box bgcolor={color} display="flex" p={2} mb={4} marginTop={2} padding={1.5} borderRadius={'0px 0px 20px 20px'} justifyContent={'center'}>
                    <ButtonBase
                        onClick={() => handleTabToggle('active')}
                        sx={{
                            bgcolor: activeTab === 'active' && color,
                            color: 'white',
                            borderBottom: activeTab === 'active' && '4px solid white',
                            mr: 2,
                            borderRadius: 1,
                            padding: '0px 0px'
                        }}
                    >
                        <Typography variant="button">Active</Typography>
                    </ButtonBase>
                    <ButtonBase
                        onClick={() => handleTabToggle('complete')}
                        sx={{
                            bgcolor: activeTab === 'complete' && color,
                            color: 'white',
                            borderBottom: activeTab === 'complete' && '4px solid white',
                            borderRadius: 1,
                            padding: '0px 0px'
                        }}
                    >
                        <Typography variant="button">Complete</Typography>
                    </ButtonBase>
                </Box>
            </Grid>

            {/* Render cards based on active tab */}
            <Grid item xs={12} md={12}>
    {activeTab === 'active' && (
        <>
            {/* Active Bids */}
            <Box mb={4}>
                <Typography variant="h6" component="h2" fontWeight="bold" mb={2}>
                    Active Bids
                </Typography>
                <Card style={{ width: '100%', overflow: 'hidden' }}>
                    <Slider {...sliderSettings}>
                        {activeBidsObj.map(item => (
                            <Box 
                                key={item.id} 
                                sx={{ 
                                    backgroundColor: '#E6E6E6', 
                                    mt: { xs: 2, sm: 1 }, // marginTop for extra-small and small screens
                                    ml: { sm: '100px', md: '100px' } // marginLeft for small and medium screens
                                }}
                            >
                                <AuctionCard item={item} />
                            </Box>
                        ))}
                    </Slider>
                </Card>
            </Box>

            {/* Pending Orders */}
            <Box mb={4}>
                <Typography variant="h6" component="h2" fontWeight="bold" mb={2}>
                    Pending Orders
                </Typography>
                <Card style={{ width: '100%', overflow: 'hidden' }}>
                    <Slider {...sliderSettings}>
                        {pendingOrdersObj.map(order => (
                            <Box 
                                key={order.id} 
                                sx={{ 
                                    backgroundColor: '#E6E6E6', 
                                    mt: { xs: 2, sm: 1 }, // marginTop for extra-small and small screens
                                    ml: { sm: '100px', md: '100px' } // marginLeft for small and medium screens
                                }}
                            >
                                <OrderCard order={order} />
                            </Box>
                        ))}
                    </Slider>
                </Card>
            </Box>
        </>
    )}

    {activeTab === 'complete' && (
        <>
            {/* Completed Bids */}
            <Box mb={4}>
                <Typography variant="h6" component="h2" fontWeight="bold" mb={2}>
                    Completed Bids
                </Typography>
                <Card style={{ width: '100%', overflow: 'hidden' }}>
                    <Slider {...sliderSettings}>
                        {completedBids.map(item => (
                            <Box 
                                key={item.id} 
                                sx={{ 
                                    backgroundColor: '#E6E6E6', 
                                    mt: { xs: 2, sm: 1 }, // marginTop for extra-small and small screens
                                    ml: { sm: '100px', md: '100px' } // marginLeft for small and medium screens
                                }}
                            >
                                <CompletedBidCard item={item} />
                            </Box>
                        ))}
                    </Slider>
                </Card>
            </Box>

            {/* Completed Orders */}
            <Box mb={4}>
                <Typography variant="h6" component="h2" fontWeight="bold" mb={2}>
                    Completed Orders
                </Typography>
                <Card style={{ width: '100%', overflow: 'hidden' }}>
                    <Slider {...sliderSettings}>
                        {completedOrders.map(order => (
                            <Box 
                                key={order.id} 
                                sx={{ 
                                    backgroundColor: '#E6E6E6', 
                                    mt: { xs: 2, sm: 1 }, // marginTop for extra-small and small screens
                                    ml: { sm: '100px', md: '100px' } // marginLeft for small and medium screens
                                }}
                            >
                                <CompletedOrderCard order={order} />
                            </Box>
                        ))}
                    </Slider>
                </Card>
            </Box>
        </>
    )}
</Grid>

        </Grid>

    </Container>


    );
}

export default Orders;
