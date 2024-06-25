import * as React from 'react'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Typography, Container, Paper, Avatar, TextField, IconButton } from '@mui/material';
import SimilarItems from '../../components/SimilarItems/SimilarItems';
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useContext } from 'react';
import ProductsContext from '../../contexts/ProductsContext';
import HoverRating from './Components/HoverRating';
import ColorContext from '../../contexts/ColorContext';
import CardHeader from './../Home/components/CardHeader';
import MainCard from '../Home/components/MainCard'
import { CartContext } from '../../contexts/CartContext';

import DeleteIcon from '@mui/icons-material/Delete';
export default function ProductDetails() {
  const { color } = useContext(ColorContext)
  const { products } = useContext(ProductsContext)
  const { id } = useParams()
const {cartItems,deleteCartItem} = useContext(CartContext)
  const [product, setProduct] = useState({})

  useEffect(() => {
console.log(cartItems);
    const fetchBid = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:3000/api/v1/products/get-product/${id}`, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'jwt': localStorage.getItem('token')
          }
        });
        const data = response.data;
        console.log(data);

        setProduct(data.product)
      } catch (error) {
        console.error('Error fetching bid:', error);
      }
    };

    fetchBid();

  }, [id]);


  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
console.log(product);
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >

    </Box>
  );

  return (
    <>
      <Box sx={{ width: '90%', margin: '50px auto' }}>
        <Grid container spacing={2}>
          <Grid item xs={3} sx={{ width: '100%' }}>
            <Grid container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} spacing={2}>
              <Grid item xs={6} sx={{ height: '50%', width: '100%' }}>
                <img
                  src={`${product?.imagesUrl?.images[0]}`}
                  alt="Photo 1"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </Grid>
              <Grid item xs={6} sx={{ height: '50%' }}>
                <img
                  src={`${product?.imagesUrl?.images[1]}`}
                  alt="Photo 2"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={3} sx={{ height: '100%' }}>
            <img
              src={`${product?.imagesUrl?.images[2]}`}
              alt="Photo 3"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Grid>
          <Grid item xs={6} sx={{ height: '100%', width: '100%' }}>
            <Typography sx={{ width: '100%', marginBottom: '10px' }} variant='h4'> {product?.title}</Typography>
            <Box sx={{ display: 'flex' }} my={2}>
              {/* Dynamic Rating */}
              <HoverRating />
              {/* <Typography>{value} Stars</Typography> */}
            </Box>

            <div className='d-flex'>

              <Typography margin={1} sx={{ display: 'flex' }}>Publisher: {product?.userId?.firstName + ' ' + product?.userId?.lastName}</Typography>
            </div>

            <ul>
              <li>Status: {product.status?.status}</li>
              <li>Category: {product.categoryId?.title}</li>
              <li>Location: {product.location}</li>
              <li>Price: {product.price}$</li>
              <li>Quantity: {product.quantity}</li>
            </ul>

            <Link to={`/chat/${product?.userId?._id}`}> <Button variant="contained" sx={{marginRight:'5px', backgroundColor: color, '&:hover': { color: 'black', backgroundColor: '#FAAF00' } }}>Chat With Seller</Button></Link>
            {['right'].map((anchor) => (
              <React.Fragment key={anchor}>
                <Button variant="contained" onClick={toggleDrawer(anchor, true)} sx={{ backgroundColor: color, '&:hover': { color: 'black', backgroundColor: '#FAAF00' } }}>Add</Button>
                <Drawer
                  anchor={anchor}
                  open={state[anchor]}
                  onClose={toggleDrawer(anchor, false)}
                >
                    {cartItems?.map(item => (
                            <Paper key={item.productId?._id} sx={{ p: 2, marginBottom: '5px',  }}>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs={12} md={2} height={"100px"}>
                                        <Avatar variant="square" src={`${item.productId?.imagesUrl.images[0]}`} sx={{ width: '100%', height: '100%', borderRadius: '5px' }} />
                                    </Grid>
                                    <Grid item xs={12} md={8}>
                                        <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                                            <Grid item xs={12} md={12}>
                                                <Typography>Title - <Typography variant="p" sx={{ fontWeight: 'bold', fontSize: '17px', color: color }}>{item.productId?.title}</Typography></Typography>
                                             </Grid>
                                            <Grid item xs={12} md={12}>
                                                <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '17px', color: color }}>{item.productId?.price} EGP</Typography>
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                               
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={6} md={2} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start' }}>
                                        <IconButton sx={{ fontWeight: 'bold', fontSize: '17px', color: color }} color="secondary" onClick={() => { deleteCartItem(item._id) }}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Paper>
                        ))}
                    
                </Drawer>
              </React.Fragment>
            ))}


          </Grid>
        </Grid>
        <Container>
        <Typography variant="h4" mb={7} mt={15}>
          You May Also Like:
        </Typography>
        {/* <CardHeader>Products</CardHeader> */}
        <Grid container spacing={2}>
          {products?.products?.slice(0, 4).map((product, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <MainCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Container>
      </Box>

    </>
  );
}
