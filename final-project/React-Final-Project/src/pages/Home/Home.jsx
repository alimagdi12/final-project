import React, { useContext, useEffect } from 'react';
import { Box, Container, Grid, CircularProgress } from '@mui/material';
import CardHeader from './components/CardHeader.jsx';
import MainCard from './components/MainCard.jsx';
import Hero from './components/Hero.jsx';
import ProductsContext from '../../contexts/ProductsContext.jsx';
import CategoryContext from '../../contexts/CategoriesContext.jsx';
import { toast } from 'react-toastify';
import { GradientCircularProgress } from '../../components/loader/Loader.jsx';
import LoaderContext from '../../contexts/LoaderContext.jsx';


function Home() {
const{setLoader} = useContext(LoaderContext)
  const { products } = useContext(ProductsContext);
  const { categories } = useContext(CategoryContext);

  console.log(products);

  const prd = products?.products?.[0];
useEffect(()=>{
  setLoader(false)
},[])
  if (!products || !products.products || !categories.categories) {

    return (
      <Container>
        <GradientCircularProgress />
      </Container>
    );
  }

  return (
    <div className="Home" style={{marginBottom:'5%'}}>
      <Hero />
      <Container>
        <CardHeader>Categories</CardHeader>
        <Grid container spacing={2}>
          {categories.categories.slice(0, 4).map((category, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <MainCard product={category} />
            </Grid>
          ))}
        </Grid>
      </Container>
      <Container>
        <CardHeader>Products</CardHeader>
        <Grid container spacing={2}>
          {products.products.slice(0, 4).map((product, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <MainCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default Home;
