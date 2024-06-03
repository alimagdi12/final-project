import { Box, CardMedia, Container, Typography } from '@mui/material'
import React from 'react'
import ServiceBox from '../components/ServiceBox'
import PaymentsIcon from '@mui/icons-material/Payments';
import AboutCard from '../components/AboutCard';
export default function AboutUs() {

  return (
    <>
      <Container>
        <Box display={'flex'} marginTop={10} sx={{ justifyContent: 'space-between' }}>
          <Box width={'50%'}>
            <CardMedia
              sx={{ height: 300 }}
              image="../public/PlaceholderGlossary.svg"
              title="green iguana"
            />
          </Box>
          <Box width={'50%'} display={'flex'} flexWrap={'wrap'}>
            <ServiceBox title={'some title'} text={'lorem 20 20 '}>
              <PaymentsIcon></PaymentsIcon>
            </ServiceBox>
            <ServiceBox title={'some title'} text={'lorem 20 20 '}>
              <PaymentsIcon></PaymentsIcon>
            </ServiceBox>
            <ServiceBox title={'some title'} text={'lorem 20 20 '}>
              <PaymentsIcon></PaymentsIcon>
            </ServiceBox>
            <ServiceBox title={'some title'} text={'lorem 20 20 '}>
              <PaymentsIcon></PaymentsIcon>
            </ServiceBox>
          </Box>
        </Box>

        <Typography variant='h3' marginTop={3} textAlign={'center'}> Our Team</Typography>
        <Box marginY={3}>
          <Box display={'flex'} justifyContent={'space-between'} >
            <AboutCard>Ali</AboutCard>
            <AboutCard>Ayman</AboutCard>
            <AboutCard>Sara</AboutCard>
          </Box>


          <Box display={'flex'} justifyContent={'space-evenly'} >
            <AboutCard>Tolba</AboutCard>
            <AboutCard>Omar</AboutCard>
          </Box>
        </Box>

        <Box display={'flex'} marginTop={10} sx={{ justifyContent: 'space-between' }}>
          <Box width={'50%'} display={'flex'} flexWrap={'wrap'}>
            <Typography>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta sunt nemo, laboriosam aperiam dolores nam in quos. Aliquam quo eveniet laboriosam! Culpa totam a, commodi dignissimos vero eum hic molestias.</Typography>
            <ServiceBox title={'some title'} text={'lorem 20 20 '}>
              <PaymentsIcon></PaymentsIcon>
            </ServiceBox>
            <ServiceBox title={'some title'} text={'lorem 20 20 '}>
              <PaymentsIcon></PaymentsIcon>
            </ServiceBox>
          </Box>
          <Box width={'50%'}>
            <CardMedia
              sx={{ height: 300 }}
              image="../public/PlaceholderGlossary.svg"
              title="green iguana"
            />
          </Box>
        </Box>
      </Container>
    </>
  )
}
