import { Box, CardMedia, Container, Grid, Typography } from '@mui/material';
import React from 'react';
import ServiceBox from '../components/ServiceBox';
import PaymentsIcon from '@mui/icons-material/Payments';
import AboutCard from '../components/AboutCard';

export default function AboutUs() {
  return (
    <Container>
      {/* First section */}
      <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} marginTop={10}>
        <Box width={{ xs: '100%', md: '50%' }} marginBottom={{ xs: 4, md: 0 }}>
          <CardMedia
            sx={{ height: 300 }}
            image="../public/PlaceholderGlossary.svg"
            title="green iguana"
          />
        </Box>
        <Box width={{ xs: '100%', md: '50%' }} display="flex" flexDirection="column" justifyContent="space-between">
          <ServiceBox title={'some title'} text={'lorem 20 20 '}>
            <PaymentsIcon />
          </ServiceBox>
          <ServiceBox title={'some title'} text={'lorem 20 20 '}>
            <PaymentsIcon />
          </ServiceBox>
          <ServiceBox title={'some title'} text={'lorem 20 20 '}>
            <PaymentsIcon />
          </ServiceBox>
          <ServiceBox title={'some title'} text={'lorem 20 20 '}>
            <PaymentsIcon />
          </ServiceBox>
        </Box>
      </Box>

      {/* Team section */}
      <Typography variant="h3" marginTop={3} textAlign="center">
        Our Team
      </Typography>
      <Box marginY={3}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={6} md={3}>
            <AboutCard>Ali</AboutCard>
          </Grid>
          <Grid item xs={6} md={3}>
            <AboutCard>Ayman</AboutCard>
          </Grid>
          <Grid item xs={6} md={3}>
            <AboutCard>Sara</AboutCard>
          </Grid>
          <Grid item xs={6} md={3}>
            <AboutCard>Tolba</AboutCard>
          </Grid>
          <Grid item xs={6} md={3}>
            <AboutCard>Omar</AboutCard>
          </Grid>
        </Grid>
      </Box>

      {/* Last section */}
      <Box display="flex" flexDirection={{ xs: 'column-reverse', md: 'row' }} marginTop={10}>
        <Box width={{ xs: '100%', md: '50%' }} display="flex" flexDirection="column" justifyContent="space-between">
          <Typography>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta sunt nemo, laboriosam aperiam dolores nam in quos. Aliquam quo eveniet laboriosam! Culpa totam a, commodi dignissimos vero eum hic molestias.</Typography>
          <ServiceBox title={'some title'} text={'lorem 20 20 '}>
            <PaymentsIcon />
          </ServiceBox>
          <ServiceBox title={'some title'} text={'lorem 20 20 '}>
            <PaymentsIcon />
          </ServiceBox>
        </Box>
        <Box width={{ xs: '100%', md: '50%' }} marginBottom={{ xs: 4, md: 0 }}>
          <CardMedia
            sx={{ height: 300 }}
            image="../public/PlaceholderGlossary.svg"
            title="green iguana"
          />
        </Box>
      </Box>
    </Container>
  );
}
