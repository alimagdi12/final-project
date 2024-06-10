/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import { CssBaseline, Container, Typography } from '@mui/material';
import BidCard from './Components/BidCard';
import SimilarItems from '../../components/SimilarItems/SimilarItems';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../../contexts/UserContext';
import ProductsContext from '../../contexts/ProductsContext';
import { useSocket } from '../../contexts/SocketContext';

const BidPage = () => {
    const [highestBid, setHighestBid] = useState(2500);
    const [auction, setAuction] = useState({});
    const [bids, setBids] = useState([]);

    const socket = useSocket();
    const { products } = useContext(ProductsContext);
    const { token } = useContext(UserContext);
    const { id } = useParams();

    const fetchHighestBidder = async (id) => {
        if (id) {
            try {
                const response = await axios.get(`http://127.0.0.1:3000/api/v1/get-heighst-bid/${id._id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'jwt': localStorage.getItem('token')
                    }
                });

                const data = response.data;
                setHighestBid(response.data.bid.amount);
            } catch (error) {
                console.error('Error fetching bid:', error);
            }
        }
    };

    const fetchBid = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:3000/api/v1/get-auction-by-id/${id}`, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'jwt': localStorage.getItem('token')
                }
            });

            const auctionData = response.data.auction;
            setAuction(auctionData);

            const highestBidAmount = auctionData.bidsId.reduce((max, bid) => bid.amount > max ? bid.amount : max, auctionData.initialValue);
            setHighestBid(highestBidAmount);

            setTimeout(() => {
                fetchHighestBidder(auctionData);
            }, 3000);

            const now = Date.now();
            const expirDate = new Date(auctionData.expirationDate);
            const differenceInMs = expirDate - now;

            const hours = Math.floor(differenceInMs / (1000 * 60 * 60));
            const minutes = Math.floor((differenceInMs % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((differenceInMs % (1000 * 60)) / 1000);
            return auctionData;

        } catch (error) {
            console.error('Error fetching bid:', error);
        }
    };

    useEffect(() => {
        console.log('Socket:', socket);
        fetchBid();
        if (socket) {
            console.log('Setting up socket event listener');
            socket.on('newBid', (bid) => {
                console.log('New bid received:', bid);
                setBids((prevBids) => [...prevBids, bid]);
                setHighestBid(bid.amount); // Update highestBid with the new bid amount
            });

            return () => {
                console.log('Cleaning up socket event listener');
                socket.off('newBid');
            };
        }
    }, [id, socket]);


    const handleBid = (amount) => {
        setHighestBid((prev) => prev + amount);
    };

    return (
        <div>
            <CssBaseline />
            <Container>
                <BidCard auction={auction} onBid={handleBid} setHighestBid={setHighestBid} highestBid={highestBid} />
                <Typography variant="h6" mt={4}>
                    You May Also Like:
                </Typography>
                <SimilarItems products={products} />
            </Container>
        </div>
    );
};

export default BidPage;
