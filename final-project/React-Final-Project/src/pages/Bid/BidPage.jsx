import React, { useContext, useEffect, useState } from "react";
import { CssBaseline, Container, Typography } from "@mui/material";
import BidCard from "./Components/BidCard";
import SimilarItems from "../../components/SimilarItems/SimilarItems";
import { useParams } from "react-router-dom";
import axios from "axios";
import UserContext from "../../contexts/UserContext";
import ProductsContext from "../../contexts/ProductsContext";
import { useSocket } from "../../contexts/SocketContext";
import io from "socket.io-client";
import { toast } from "react-toastify";

let socket;

const BidPage = () => {
  const [highestBid, setHighestBid] = useState(2500);
  const [highestBidderName, setHighestBidderName] = useState('');
  const [auction, setAuction] = useState({});
  const [bids, setBids] = useState([]);

  const { userData } = useContext(UserContext);
  const { products } = useContext(ProductsContext);
  const { token } = useContext(UserContext);
  const { id } = useParams();

  const fetchHighestBidder = async (id) => {
    if (id) {
      try {
        const response = await axios.get(
          `http://127.0.0.1:3000/api/v1/get-heighst-bid/${id._id}`,
          {
            headers: {
              "Content-Type": "application/json",
              jwt: localStorage.getItem("token"),
            },
          }
        );

        const data = await response.data;
        setHighestBid(data.bid.amount);
        setHighestBidderName(data.bid.biderId.firstName + ' ' + data.bid.biderId.lastName);
      } catch (error) {
        console.error("Error fetching bid:", error);
      }
    }
  };

  const fetchBid = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:3000/api/v1/get-auction-by-id/${id}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            jwt: localStorage.getItem("token"),
          },
        }
      );

      const auctionData = response.data.auction;
      setAuction(auctionData);

      const highestBidAmount = auctionData.bidsId.reduce(
        (max, bid) => (bid.amount > max ? bid.amount : max),
        auctionData.initialValue
      );
      setHighestBid(highestBidAmount);

      setTimeout(() => {
        fetchHighestBidder(auctionData);
      }, 3000);
    } catch (error) {
      console.error("Error fetching bid:", error);
    }
  };

  useEffect(() => {
    fetchBid();
  }, [id]);

  useEffect(() => {
    socket = io(`http://localhost:3000`, {
      extraHeaders: {
        jwt: localStorage.getItem("token"),
      },
    });

    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("newBid", (message) => {
      if (message.id == id) {
        setHighestBid(message.highestBid);
        setHighestBidderName(message.highestBidder);
        toast.error('somebody put a higher bid');
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const handleBid = (number) => {
    socket.emit("newBid", { id: id, highestBid: number, highestBidder: (userData?.firstName + ' ' + userData?.lastName) });
    setHighestBid(number);
  };

  return (
    <div>
      <CssBaseline />
      <Container>
        <BidCard
          auction={auction}
          handleBid={handleBid}
          setHighestBid={setHighestBid}
          highestBid={highestBid}
          highestBidderName={highestBidderName}
        />
        <Typography variant="h6" mt={4}>
          You May Also Like:
        </Typography>
        <SimilarItems products={products} />
      </Container>
      <button onClick={handleBid}></button>
    </div>
  );
};

export default BidPage;
