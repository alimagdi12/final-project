import React, { useContext } from 'react';
import { Container, Card, Typography, Grid } from '@mui/material';
import { FaDollarSign } from 'react-icons/fa';
import { GiHammerBreak } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';
import ColorContext from '../../contexts/ColorContext';
export default function List() {
  const {color} = useContext(ColorContext)
    const navigate = useNavigate()
  return (
    <Container sx={{marginBottom:'3%'}}>
      <Grid container spacing={3} marginY={3} justifyContent="center" sx={{cursor:'pointer'}}>
        <Grid item xs={12} md={6} onClick={()=>{navigate('/add-product')}}>
          <Card sx={{ paddingY: 13, textAlign: 'center', border:`2px solid ${color}` }}>
            <FaDollarSign size={59} color="#000" />
            <Typography variant="h4">Sell an Item</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} onClick={()=>{navigate('/add-auction')}} >
          <Card sx={{ paddingY: 13, textAlign: 'center' , border:`2px solid ${color}`}}>
          <GiHammerBreak size={59} color="#000" />
            <Typography variant="h4">Start an Auction</Typography>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
