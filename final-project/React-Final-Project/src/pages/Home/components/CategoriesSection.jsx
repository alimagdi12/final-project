import React, { useContext } from 'react';
import { Box, Container, Grid } from '@mui/material';
import CardHeader from './CardHeader.jsx';
import AboutCard from '../../About/Components/AboutCard.jsx';
import CategoryContext from '../../../contexts/CategoriesContext.jsx';

const CategoriesSection = () => {
  const { categories } = useContext(CategoryContext);

  if (!categories.categories) {
    return null;
  }

  return (
    <Container sx={{ width: '100%', backgroundColor: 'transparent', mt: 4 }}>
      <CardHeader>Categories</CardHeader>
      <Grid container spacing={2}>
        {categories.categories.slice(0, 4).map((category, index) => (
          <Grid item xs={12} sm={6} md={3} key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
            <AboutCard img={category?.imageUrl?.images[0]} name={category.title}>
              {category.title}
            </AboutCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CategoriesSection;
