import { Box, CardMedia, Container, Grid, Typography } from '@mui/material';
import React from 'react';
import ServiceBox from './Components/ServiceBox';
import PaymentsIcon from '@mui/icons-material/Payments';
import AboutCard from './Components/AboutCard';
import AboutInfoHeader from './Components/AboutInfoHeader';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import PaidIcon from '@mui/icons-material/Paid';
import { colors } from '../../Util/utilities';
import "./About.css"

export default function AboutUs() {
  const members = [
    { img: '/public/Omar.jpg', src:'https://www.linkedin.com/in/omar-hassan97/', name: 'Omar Hassan' },
    { img: '/public/omar1.jpg', src:'https://www.linkedin.com/in/omar-gaber-tolba/', name: 'Omar Tolba' },
    { img: '/public/Ali.jpg', src:'https://www.linkedin.com/in/ali-magdi-46a364193/', name: 'Ali' },
    { img: '/public/Mohamed Ayman.jpg', src:'https://www.linkedin.com/in/mohamed-aymanuiux/', name: 'Mohamed Ayman' },
    { img: '/public/Sara.jpg', src:'https://www.linkedin.com/in/sara-ayman-64a46720a/', name: 'Sara' }
  ]
  return (
    <Container style={{marginBottom:'5%'}}>
      {/* First section */}
      <AboutInfoHeader />

      {/* Team section */}
      <Box sx={{marginTop:'8%'}}>
        <Typography variant="h3" marginTop={3} textAlign="center">
          Our Team
        </Typography>
        <Box marginY={3}>
          <Grid spacing={2} sx={{ display: 'flex', flexWrap: 'wrap' }} justifyContent="center">
            <Grid item xs={6} sm={4} md={3} sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}>
            
            </Grid>
          </Grid>
        </Box>
      </Box>


      <div class="container w-75 m-auto" style={{width:'75% '}}>
    <div>
      <div class="content">
        <h2>Omar Hassan</h2>
        <span>Full-Stack Developer</span>
      </div>
    </div>
    <div>
      <div class="content">
        <h2>Omar Gaber</h2>
        <span>Full-Stack Developer</span>
      </div>
    </div>
    <div>
      <div class="content">
        <h2>Ali Magdi</h2>
        <span>Full-Stack Developer</span>
      </div>
    </div>
    <div>
      <div class="content">
        <h2>Mohamed Ayman</h2>
        <span>UI & UX Designer</span>
      </div>
    </div>
    <div>
      <div class="content">
        <h2>Sara Ayman</h2>
        <span>UI & UX Designer</span>
      </div>
    </div>
  </div>


      {/* Last section */}
      <container>
        <Grid container spacing={2} alignItems="center" sx={{marginTop:'8%'}}>

          <Grid item xs={12} md={6} container justifyContent="center" sx={{}}>
            <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
              <Box sx={{ display: 'flex' }}>
                <Box>
                  <Typography sx={{fontWeight:'800', fontSize:'28px', maxWidth:'100%', textAlign:'left'}}>Our Working Progress</Typography>
                  <Typography sx={{ color: colors.gray, maxWidth:'100%', textAlign:'left' }}>At our company, we continuously strive to improve and innovate. Our goal is to exceed customer expectations through high-quality products and exceptional service..</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={12} sx={{ display: 'flex' }}>
              <Grid item xs={12} md={8} sx={{ width: '100%' }}>
                <ServiceBox title={'Payment Secure'} text={'Your payment security is our priority. We employ cutting-edge technology to keep your financial information safe.'}>
                  <PaymentsIcon sx={{ width: '65%' }} />
                </ServiceBox>
              </Grid>
              <Grid item xs={12} md={8} sx={{ width: '100%' }}>
                <ServiceBox title={'Payment Secure'} text={'We use advanced encryption methods to ensure your payment information is secure. Shop with confidence knowing your data is protected.'}>
                  <PaymentsIcon sx={{ width: '65%' }} />
                </ServiceBox>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <CardMedia
              sx={{ height: 320 }}
              image="/public/team2.jpg"
              title="green iguana"
            />
          </Grid>
        </Grid>
      </container>
    
    </Container>
  );
}
