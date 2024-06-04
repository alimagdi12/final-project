import { Box, CardMedia, Container, Grid, Typography } from '@mui/material';
import React from 'react';
import ServiceBox from '../components/ServiceBox';
import PaymentsIcon from '@mui/icons-material/Payments';
import AboutCard from '../components/AboutCard';

export default function AboutUs() {
  return (
    <Container>
      {/* First section */}
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={6}>
          <CardMedia
            sx={{ height: 300 }}
            image="../public/PlaceholderGlossary.svg"
            title="green iguana"
          />
        </Grid>
        <Grid item xs={12} md={6} container justifyContent="center">
          <Grid item xs={12} md={8}>
            <ServiceBox title={'some title'} text={'lorem 20 20 '}>
              <PaymentsIcon />
            </ServiceBox>
          </Grid>
          <Grid item xs={12} md={8}>
            <ServiceBox title={'some title'} text={'lorem 20 20 '}>
              <PaymentsIcon />
            </ServiceBox>
          </Grid>
          <Grid item xs={12} md={8}>
            <ServiceBox title={'some title'} text={'lorem 20 20 '}>
              <PaymentsIcon />
            </ServiceBox>
          </Grid>
          <Grid item xs={12} md={8}>
            <ServiceBox title={'some title'} text={'lorem 20 20 '}>
              <PaymentsIcon />
            </ServiceBox>
          </Grid>
        </Grid>
      </Grid>

      {/* Team section */}
      <Typography variant="h3" marginTop={3} textAlign="center">
        Our Team
      </Typography>
      <Box marginY={3}>
        <Grid  spacing={2} sx={{display:'flex', flexWrap:'wrap'}} justifyContent="center">
          <Grid item xs={6} sm={4} md={3}>
            <AboutCard>Ali</AboutCard>
          </Grid>
          <Grid item xs={6} sm={4} md={3}>
            <AboutCard>Ayman</AboutCard>
          </Grid>
          <Grid item xs={6} sm={4} md={3}>
            <AboutCard>Sara</AboutCard>
          </Grid>
          <Grid item xs={6} sm={4} md={3}>
            <AboutCard>Tolba</AboutCard>
          </Grid>
          <Grid item xs={6} sm={4} md={3}>
            <AboutCard>Omar</AboutCard>
          </Grid>
        </Grid>
      </Box>

      {/* Last section */}
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={6} container justifyContent="center">
          <Grid item xs={12} md={8}>
            <Typography>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta sunt nemo, laboriosam aperiam dolores nam in quos. Aliquam quo eveniet laboriosam! Culpa totam a, commodi dignissimos vero eum hic molestias.
            </Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <ServiceBox title={'some title'} text={'lorem 20 20 '}>
              <PaymentsIcon />
            </ServiceBox>
          </Grid>
          <Grid item xs={12} md={8}>
            <ServiceBox title={'some title'} text={'lorem 20 20 '}>
              <PaymentsIcon />
            </ServiceBox>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <CardMedia
            sx={{ height: 300 }}
            image="../public/PlaceholderGlossary.svg"
            title="green iguana"
          />
        </Grid>
      </Grid>
    </Container>
  );
}
