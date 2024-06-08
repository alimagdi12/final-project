import React from 'react';
import { Container, Card, Typography, Grid } from '@mui/material';
import { FaDollarSign } from 'react-icons/fa';
import { GiHammerBreak } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';
export default function List() {
    const navigate = useNavigate()
  return (
    <Container>
      <Grid container spacing={3} marginY={3} justifyContent="center">
        <Grid item xs={12} md={6} onClick={()=>{navigate('/add-product')}}>
          <Card sx={{ paddingY: 13, textAlign: 'center', border:'2px solid #5daa60' }}>
            <FaDollarSign size={59} color="#000" />
            <Typography variant="h4">Sell an Item</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} onClick={()=>{navigate('/add-auction')}}>
          <Card sx={{ paddingY: 13, textAlign: 'center' , border:'2px solid #5daa60'}}>
          <GiHammerBreak size={59} color="#000" />
            <Typography variant="h4">Start an Auction</Typography>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
