import React, { createContext, useState, useEffect } from 'react';

const AuctionContext = createContext();

export const AuctionProvider = ({ children }) => {

  const [auction, setAuction] = useState([]);


  
  const fetchAuction = async () => {
    try {
      const response = await fetch('https://portsaidrentals.onrender.com/api/v1/get-auctions');
      if (!response.ok) {
        throw new Error('Failed to fetch Auction');
      }
      const data = await response.json();
      setAuction(data.auctions);
    } catch (error) {
      console.error('Error fetching Auction:', error);
    }
  };

  useEffect(() => {
    fetchAuction();
  }, []); 
  
  return (
    <AuctionContext.Provider value={{ auction, setAuction,fetchAuction }}>
      {children}
    </AuctionContext.Provider>
  );
};

export default AuctionContext;
