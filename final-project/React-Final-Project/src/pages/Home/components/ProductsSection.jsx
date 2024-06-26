import React, { useContext } from 'react';
import { Container, Grid } from '@mui/material';
import CardHeader from './CardHeader.jsx';
import MainCard from './MainCard.jsx';
import ProductsContext from '../../../contexts/ProductsContext.jsx';

const ProductsSection = () => {
  const { products } = useContext(ProductsContext);

  if (!products.products) {
    return null;
  }

  return (
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
  );
};

export default ProductsSection;
