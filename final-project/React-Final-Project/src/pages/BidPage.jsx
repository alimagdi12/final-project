import { useState } from 'react';
import { CssBaseline, Container, Typography } from '@mui/material';
import BidCard from '../components/BidCard';
import SimilarItems from '../components/SimilarItems';
import { useParams } from 'react-router-dom';

const items = [
    { title: 'MacBook Pro MNEH3', image: '../public/villa2.jpg' },
    { title: 'MacBook Pro MNEH3', image: '../public/villa3.jpg' },
    { title: 'MacBook Pro MNEH3', image: '../public/vila.jpg' },
    { title: 'MacBook Pro MNEH3', image: '../public/laptop.jpg' },
];

const BidPage = () => {
    
    const {id} = useParams()
    const [highestBid, setHighestBid] = useState(2500);
    const [heartCount, setHeartCount] = useState(0);



    const handleBid = (amount) => {
        setHighestBid((prev) => prev + amount);
    };

    return (
        <div>
            <CssBaseline />
            <Container>
                <BidCard onBid={handleBid} highestBid={highestBid} />
                <Typography variant="h6" mt={4}>
                    You May Also Like:
                </Typography>
                <SimilarItems items={items} />
            </Container>
        </div>
    );
};

export default BidPage;