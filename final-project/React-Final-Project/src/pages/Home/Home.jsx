import React, { useContext, useEffect, useState } from 'react';
import { Box, Container, Grid, CircularProgress, Typography } from '@mui/material';
import CardHeader from './components/CardHeader.jsx';
import MainCard from './components/MainCard.jsx';
import Hero from './components/Hero.jsx';
import ProductsContext from '../../contexts/ProductsContext.jsx';
import CategoryContext from '../../contexts/CategoriesContext.jsx';
import { toast } from 'react-toastify';
import { GradientCircularProgress } from '../../components/loader/Loader.jsx';
import LoaderContext from '../../contexts/LoaderContext.jsx';
 import "./Home.css";
import bgImage from '../../../public/8038874_25098.jpg';
import AboutCard from '../About/Components/AboutCard.jsx';

function Home() {
const{setLoader} = useContext(LoaderContext)
  const { products } = useContext(ProductsContext);
  const { categories } = useContext(CategoryContext);
  const [selectedItem, setSelectedItem] = useState('item-1');

  const handleChange = (event) => {
    setSelectedItem(event.target.id);
  };
  (products);

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
    <>
      <Hero />
    <div className="Home"  style={{paddingBottom:'5%' ,paddingTop:'5%' , backgroundImage: `url(${bgImage})`,zIndex:'-1', backgroundPosition:'center' , backgroundSize:'cover'}} >
      <Container>
        <CardHeader>Categories</CardHeader>
        <Grid container spacing={2}>
      
        <Box sx={{marginTop:'5px' , display:'flex'}}>
       
          <Grid spacing={2} sx={{ display: 'flex', flexWrap: 'wrap' }} justifyContent="center">
            <Grid item xs={6} sm={4} md={12} sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}>
              
              {categories.categories.slice(0, 4).map((category, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <AboutCard img={category?.imageUrl?.images[0]} name={category.title} >{category.title}</AboutCard>
            </Grid>))}
            </Grid>
          </Grid>
       
      </Box>

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

      <div className={`containerr ${selectedItem}`}>
      <input
        type="radio"
        name="slider"
        id="item-1"
        checked={selectedItem === 'item-1'}
        onChange={handleChange}
      />
      <input
        type="radio"
        name="slider"
        id="item-2"
        checked={selectedItem === 'item-2'}
        onChange={handleChange}
      />

      <input
        type="radio"
        name="slider"
        id="item-3"
        checked={selectedItem === 'item-3'}
        onChange={handleChange}
      />

      <div className="cards">
        <label className="card" htmlFor="item-1" id="song-1">
          <img src="https://images.unsplash.com/photo-1530651788726-1dbf58eeef1f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=882&q=80" alt="song" />
        </label>
        <label className="card" htmlFor="item-2" id="song-2">
          <img src="https://images.unsplash.com/photo-1559386484-97dfc0e15539?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1234&q=80" alt="song" />
        </label>
        <label className="card" htmlFor="item-3" id="song-3">
          <img src="https://images.unsplash.com/photo-1533461502717-83546f485d24?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60" alt="song" />
        </label>
      </div>
    </div>
    </div>
          </>
  );
}

export default Home;
