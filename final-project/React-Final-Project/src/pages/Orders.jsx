import React, { useState } from 'react';
import { Container, Box, ButtonBase, Typography, Card } from '@mui/material';
import OrderCard from '../components/OrderCard';
import AuctionCard from '../components/AuctionCard';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CompletedBidCard from '../components/CompletedBidCard';
import CompletedOrderCard from '../components/CompletedOrderCard';

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
    const [activeTab, setActiveTab] = useState('active');
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3, 
        slidesToScroll: 2, 
    };

    const handleTabToggle = (tab) => {
        setActiveTab(tab);
    };

    return (
        <Container sx={{ position: 'relative', width: '100%' }}>

        {/* Green box containing toggle buttons */}
        <Box bgcolor="#5DAA60" display={'flex'} p={2} mb={4} padding={1.5} borderRadius={'0px 0px 20px 20px'} width={'21%'} justifyContent={'center'}>
            <ButtonBase
                onClick={() => handleTabToggle('active')}
                sx={{
                    bgcolor: activeTab === 'active' && '#5DAA60',
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
                    bgcolor: activeTab === 'complete' && '#5DAA60',
                    color: 'white',
                    borderBottom: activeTab === 'complete' && '4px solid white',
                    borderRadius: 1, 
                    padding: '0px 0px'
                }}
            >
                <Typography variant="button">Complete</Typography>
            </ButtonBase>
        </Box>

        {/* Render cards based on active tab */}
        {activeTab === 'active' && (
            <>
                <Box mb={4}>
                    <Typography variant="h6" component="h2" fontWeight="bold" mb={2}>
                        Active Bids
                    </Typography>
                    <Card style={{ width: '100%', overflow: 'hidden' }}>
                        <Slider {...sliderSettings} >
                            {activeBidsObj.map(item => (
                                <Box key={item.id}sx={{marginLeft:'100px' , backgroundColor:'#E6E6E6'}}>
                                    <AuctionCard item={item} />
                                </Box>
                            ))}
                        </Slider>
                    </Card>
                </Box>
            
                <Box mb={4}>
                    <Typography variant="h6" component="h2" fontWeight="bold" mb={2}>
                        Pending Orders
                    </Typography>
                    <Card style={{ width: '100%', overflow: 'hidden' }}>
                        <Slider {...sliderSettings} >
                            {pendingOrdersObj.map(order => (
                                <Box key={order.id} sx={{marginLeft:'100px' , backgroundColor:'#E6E6E6'}}>
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
                <Box mb={4}>
                    <Typography variant="h6" component="h2" fontWeight="bold" mb={2}>
                        Completed Bids
                    </Typography>
                    <Card style={{ width: '100%', overflow: 'hidden' }}>
                        <Slider {...sliderSettings} >
                            {completedBids.map(item => (
                                <Box key={item.id} sx={{marginLeft:'100px' , backgroundColor:'#E6E6E6'}}>
                                    <CompletedBidCard item={item} />
                                </Box>
                            ))}
                        </Slider>
                    </Card>
                </Box>

                <Box mb={4}>
                    <Typography variant="h6" component="h2" fontWeight="bold" mb={2}>
                        Completed Orders
                    </Typography>
                    <Card sx={{ width: '100%', overflow: 'hidden' }}>
                        <Slider {...sliderSettings} >
                            {completedOrders.map(order => (
                                <Box key={order.id} sx={{marginLeft:'100px' , backgroundColor:'#E6E6E6'}}>
                                    <CompletedOrderCard order={order} />
                                </Box>
                            ))}
                        </Slider>
                    </Card>
                </Box>
            </>
        )}
    </Container>
    );
}

export default Orders;
