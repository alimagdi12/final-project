import React, { useContext } from 'react';
import { Box, Container, Grid } from '@mui/material';
import CardHeader from '../components/CardHeader.jsx';
import MainCard from '../components/MainCard.jsx';
import Hero from '../Hero.jsx/Hero.jsx';
import ProductsContext from '../contexts/ProductsContext.jsx';
import CategoryContext from '../contexts/CategoriesContext.jsx';

function Home() {
  const {products} = useContext(ProductsContext)
  const {categories} = useContext(CategoryContext)
  return (
    <div className="Home">
      <Hero />
      <Container>
        <CardHeader>Home</CardHeader>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <MainCard />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MainCard />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MainCard />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MainCard />
          </Grid>
        </Grid>
      </Container>
      <Container>
        <CardHeader>Home</CardHeader>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <MainCard />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MainCard />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MainCard />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MainCard />
          </Grid>
        </Grid>
      </Container>
      {/* <Container>
        <CardHeader>Home</CardHeader>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <MainCard />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MainCard />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MainCard />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MainCard />
          </Grid>
        </Grid>
      </Container> */}
    </div>
  );
}

export default Home;
