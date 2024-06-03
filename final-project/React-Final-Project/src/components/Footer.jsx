// src/components/Footer.js
import React from 'react';
import { Box, Container, Grid, Typography, TextField, Button } from '@mui/material';
import { Facebook, Instagram, Twitter } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#5DAA60', padding: '30px', color: 'white', position: 'absolute', width: '100%', marginTop:'5%' }}>
      <Container maxWidth="lg" sx={{ display: 'flex' }}>
        <Grid container spacing={4} sx={{ height: '100%', }}>
          <Box sx={{ backgroundColor: '#5DAA60', padding: '30px', color: 'white', mt: 'auto', position: 'relative', bottom: '-23px' }}>
            <Container maxWidth="lg" sx={{ display: 'flex' }}>
              <Grid container spacing={4} sx={{ height: '100%' }}>
                <Grid item xs={12} sm={3}>
                  <Link to={'/'}>
                    <img src="/logo.png" alt="Logo" width="100%" style={{ cursor: 'pointer' }} />
                  </Link>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#fff', marginBottom: '10px' }}>Categories</Typography>
                  <Typography>Vehicles</Typography>
                  <Typography>Mobiles & Tablets</Typography>
                  <Typography>Electronics & Appliances</Typography>
                  <Typography>Properties</Typography>
                  <Typography>Services</Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>Resources</Typography>
                  <Typography>Developer API</Typography>
                  <Typography>Tools</Typography>
                  <Typography>Blog</Typography>
                </Grid>
                <Grid item xs={12} sm={3} style={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>Explore</Typography>
                  <Link style={{ textDecoration: 'none', color: 'white' }} to={'/'}>Home</Link>
                  <Link style={{ textDecoration: 'none', color: 'white' }} to={'/cart'}>Cart</Link>
                  <Link style={{ textDecoration: 'none', color: 'white' }} to={'/about'}>About us</Link>
                  <Link style={{ textDecoration: 'none', color: 'white' }} to={'/listItem'}>List an item</Link>
                </Grid>
              </Grid>
              <Box sx={{ display: 'flex', flexDirection: 'column', width: '43%' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'center' }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>Subscribe To Our Newsletter</Typography>
                  <Box sx={{ backgroundColor: '#F0F0F0', borderRadius: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <TextField
                      variant="filled"
                      placeholder="Enter Your E-mail to subscribe"
                      sx={{ bgcolor: 'white', borderRadius: 1, mr: 2, width: '70%' }}
                    />
                    <Button sx={{
                      height: '65%',
                      backgroundColor: '#F0F8F0',
                      color: '#5DAA60',
                      border: '2px solid #5DAA60',
                      '&:hover': {
                        backgroundColor: '#5DAA60',
                        color: '#F0F0F0',
                        border: '2px solid #F0F0F0'
                      }
                    }} variant="contained" color="primary">JOIN</Button>
                  </Box>
                </Box>
                <Box mt={2}>
                  <Typography>FOLLOW VIBEVERSE.COM</Typography>
                  <Box mt={1}>
                    <Facebook sx={{ cursor: 'pointer' }} />
                    <Instagram sx={{ mx: 1, cursor: 'pointer' }} />
                    <Twitter sx={{ mx: 1, cursor: 'pointer' }} />
                  </Box>
                </Box>
              </Box>
            </Container>
          </Box>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
