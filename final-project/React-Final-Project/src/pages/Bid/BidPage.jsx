/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from 'react';
import { CssBaseline, Container, Typography } from '@mui/material';
import BidCard from './Components/BidCard';
import SimilarItems from '../../components/SimilarItems/SimilarItems';
import AuctionContext from '../../contexts/AuctionContext';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../../contexts/UserContext';
import ProductsContext from '../../contexts/ProductsContext';


const BidPage = () => {
    
    const [highestBid, setHighestBid] = useState(2500);
    const [heartCount, setHeartCount] = useState(0);
    const [auction, setAuction] = useState({})

    const { products } = useContext(ProductsContext);
    console.log(products);
    const { token } = useContext(UserContext)
    
    
    
    
    const fetchHighestBidder = async (id) => {
        console.log(id);
        if (id) {

            try {
                const response = await axios.get(`http://127.0.0.1:3000/api/v1/get-heighst-bid/${id._id}`,  {
                    headers: {
                        'Content-Type': 'application/json',
                        'jwt': localStorage.getItem('token')
                    }
                })

                // console.log(response);
                const data = response.data;
                console.log(response.data.bid.amount);
                setHighestBid(response.data.bid.amount)
            } catch (error) {
                console.error('Error fetching bid:', error);
            }
        }
    };

    const { id } = useParams()
    let hours, seconds, minutes = 0

    const fetchBid = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:3000/api/v1/get-auction-by-id/${id}`, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'jwt': localStorage.getItem('token')
                }
            });

            const data = response.data;
            console.log(data);

            setAuction(response.data.auction)
            setTimeout(() => {
                fetchHighestBidder(response.data.auction)
            }, 3000);
            const now = Date.now();


            const expirDate = new Date(response.data.auction.expirationDate)
            const differenceInMs = expirDate - now;

            const hours = Math.floor(differenceInMs / (1000 * 60 * 60));
            const minutes = Math.floor((differenceInMs % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((differenceInMs % (1000 * 60)) / 1000);


        } catch (error) {
            console.error('Error fetching bid:', error);
        }
    };

    useEffect(() => {


        fetchBid();

    }, [id]);

 

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