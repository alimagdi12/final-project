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
      <Grid container spacing={3} marginY={3} justifyContent="center">
        <Grid item xs={12} md={6} onClick={()=>{navigate('/add-product')}}>
          <Card  sx={{
        paddingY: 13,
        textAlign: 'center',
        border: `2px solid ${color}`,
       color:color,
        ":hover": {
          backgroundColor: color,
          color: '#fff',
          transition: 'background-color .5s ease, color .5s ease'
        },
        transition: 'background-color .5s ease, color .5s ease' // Ensure transition is also applied initially
      }}>
            <FaDollarSign size={59}   />
            <Typography variant="h4">Sell an Item</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} onClick={()=>{navigate('/add-auction')}}>
          <Card sx={{
        paddingY: 13,
        textAlign: 'center',
        border: `2px solid ${color}`,
       color:color,
        ":hover": {
          backgroundColor: color,
          color: '#fff',
          transition: 'background-color .5s ease, color .5s ease'
        },
        transition: 'background-color .5s ease, color .5s ease' // Ensure transition is also applied initially
      }}>
          <GiHammerBreak size={59}  />
            <Typography variant="h4">Start an Auction</Typography>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
