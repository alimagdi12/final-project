import React from 'react';
import { Box, Container } from '@mui/material';
import Navbar from '../NavBar/Navbar.jsx';
import CardHeader from '../components/CardHeader.jsx';
import MainCard from '../components/MainCard.jsx';
import Hero from '../Hero.jsx/Hero.jsx';

function Home() {
  return (

    <div className="Home">

      <Hero></Hero>
      <Container>
        <CardHeader>Home</CardHeader>
        <Box display={'flex'} justifyContent={'space-between'} sx={{ width: '100%' }}>

          <MainCard style={{ flex: '1 0 25%' }}></MainCard>
          <MainCard style={{ flex: '1 0 25%' }}></MainCard>
          <MainCard style={{ flex: '1 0 25%' }}></MainCard>
          <MainCard style={{ flex: '1 0 25%' }}></MainCard>

        </Box>
      </Container>
      <Container>
        <CardHeader>Home</CardHeader>
        <Box display={'flex'} justifyContent={'space-between'} sx={{ width: '100%' }}>

          <MainCard style={{ flex: '1 0 25%' }}></MainCard>
          <MainCard style={{ flex: '1 0 25%' }}></MainCard>
          <MainCard style={{ flex: '1 0 25%' }}></MainCard>
          <MainCard style={{ flex: '1 0 25%' }}></MainCard>

        </Box>
      </Container>
      <Container>
        <CardHeader>Home</CardHeader>
        <Box display={'flex'} justifyContent={'space-between'} sx={{ width: '100%' }}>

          <MainCard style={{ flex: '1 0 25%' }}></MainCard>
          <MainCard style={{ flex: '1 0 25%' }}></MainCard>
          <MainCard style={{ flex: '1 0 25%' }}></MainCard>
          <MainCard style={{ flex: '1 0 25%' }}></MainCard>

        </Box>
      </Container>
    </div>
  );
}

export default Home;