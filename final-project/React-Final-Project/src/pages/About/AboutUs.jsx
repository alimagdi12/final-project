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

export default function AboutUs() {
  const members = [
    { img: '/public/Omar.jpg', name: 'Omar Hassan' },
    { img: '/public/omar1.jpg', name: 'Omar Tolba' },
    { img: '/public/Ali.jpg', name: 'Ali' },
    { img: '/public/Mohamed Ayman.jpg', name: 'Mohamed Ayman' },
    { img: '/public/Sara.jpg', name: 'Sara' }
  ]
  return (
    <Container >
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
              {
                members.map((member) => {
                  return (
                    <AboutCard key={member.name} img={member.img} name={member.name}>{member.name}</AboutCard>
                  )
                })
              }
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Last section */}
      <container>
        <Grid container spacing={2} alignItems="center" sx={{marginTop:'8%'}}>

          <Grid item xs={12} md={6} container justifyContent="center" sx={{}}>
            <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
              <Box sx={{ display: 'flex' }}>
                <Box>
                  <Typography sx={{ fontWeight: '800', fontSize: '28px' }}>Our Working Progress</Typography>
                  <Typography sx={{ color: colors.gray }}>At our company, we continuously strive to improve and innovate. Our goal is to exceed customer expectations through high-quality products and exceptional service..</Typography>
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
