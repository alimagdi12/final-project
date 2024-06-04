/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from 'react';
import { CssBaseline, Container, Typography } from '@mui/material';
import BidCard from '../components/BidCard';
import SimilarItems from '../components/SimilarItems';
import AuctionContext from '../contexts/AuctionContext';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const items = [
    { title: 'MacBook Pro MNEH3', image: '../public/villa2.jpg' },
    { title: 'MacBook Pro MNEH3', image: '../public/villa3.jpg' },
    { title: 'MacBook Pro MNEH3', image: '../public/vila.jpg' },
    { title: 'MacBook Pro MNEH3', image: '../public/laptop.jpg' },
];

const BidPage = () => {
    const{id}= useParams()
   
    useEffect(() => {
        const fetchBid = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:3000/api/v1/get-auction-by-id/${id}`, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'jwt': localStorage.getItem('token')
                    }
                });

                const data = response.data;
               
                setAuction(response.data.auction)

                const now = Date.now();
                

              const expirDate = new Date (response.data.auction.expirationDate)
                const differenceInMs = expirDate - now;
          
                const hours = Math.floor(differenceInMs / (1000 * 60 * 60));
                const minutes = Math.floor((differenceInMs % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((differenceInMs % (1000 * 60)) / 1000);
          
                
            } catch (error) {
                console.error('Error fetching bid:', error);
            }
        };

        fetchBid();
    }, [id]);

    const [highestBid, setHighestBid] = useState(2500);
    const [heartCount, setHeartCount] = useState(0);
    const[auction,setAuction]=useState({})
    


    const handleBid = (amount) => {
        setHighestBid((prev) => prev + amount);
    };

    return (
        <div>
            <CssBaseline />
            <Container>
                <BidCard auction={auction} onBid={handleBid} highestBid={highestBid} />


                <Typography variant="h6" mt={4}>
                    You May Also Like:
                </Typography>
                <SimilarItems items={items} />
            </Container>
        </div>
    );
};

export default BidPage;