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
    <Container sx={{ width: '100%' , backgroundColor:'transparent' }}>
      <CardHeader>Categories</CardHeader>
      <Grid container item spacing={2} md={12}>
        <Box sx={{ marginTop: '5px', display: 'flex' }}>
          <Grid  sx={{ display: 'flex', flexWrap: 'wrap' }} justifyContent="center">
            <Grid item xs={6} sm={4} md={12} sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
              {categories.categories.slice(0, 4).map((category, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <AboutCard img={category?.imageUrl?.images[0]} name={category.title}>
                    {category.title}
                  </AboutCard>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Container>
  );
};

export default CategoriesSection;
