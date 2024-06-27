import React, { useContext, useState, useEffect } from 'react';
import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import CustomSelect from '../AddAuction/Components/CustomSelect';
import CategoryContext from '../../contexts/CategoriesContext';
import UserContext from '../../contexts/UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ColorContext from '../../contexts/ColorContext';
import styled from 'styled-components';
import LoaderContext from '../../contexts/LoaderContext';
import "./AddProduct.css";

export default function AddProduct() {
  const { color, lightColor } = useContext(ColorContext);
  const navigate = useNavigate();
  const { categories } = useContext(CategoryContext);
  const { token } = useContext(UserContext);
  const catgs = categories?.categories?.map(({ _id, title }) => ({ value: _id, label: title })) || [];
  const { setLoader } = useContext(LoaderContext);

  const StyledSpan = styled.span`
  width: 100px;
  height: 100px;
  position: relative;
  border-radius: 4px;
  
  overflow: hidden;
  margin: 50px 100px;
  background-color: #eee;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 40px;
    height: 40px;
    transform: rotate(45deg) translate(30%, 40%);
    background: ${color};
    box-shadow: 32px -34px 0 5px ${color};
    animation: slide 2s infinite ease-in-out alternate;
  }

  &::after {
    content: "";
    position: absolute;
    left: 10px;
    top: 10px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: ${color};
    transform: rotate(0deg);
    transform-origin: 35px 145px;
    animation: rotate 2s infinite ease-in-out;
  }

  @keyframes slide {
    0%, 100% { bottom: -35px }
    25%, 75% { bottom: -2px }
    20%, 80% { bottom: 2px }
  }

  @keyframes rotate {
    0% { transform: rotate(-15deg) }
    25%, 75% { transform: rotate(0deg) }
    100% { transform: rotate(25deg) }
  }
`;

  useEffect(() => {
    console.log('Categories:', categories);
    console.log('Token:', token);
  }, [categories, token]);

  useEffect(() => {
    setLoader(false);
  }, []);

  const [formData, setFormData] = useState({
    title: '',
    name: '',
    location: '',
    images: [],
    quantity: '',
    productStatus: '',
    categoryId: '',
    price: '',
    folderName: '',
    userId: '6643d585dd8c6b0c1065f2b5',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({
      ...formData,
      images: files
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productForm = new FormData();
    productForm.append('title', formData.title);
    productForm.append('categoryId', formData.categoryId);
    productForm.append('quantity', formData.quantity);  // Ensure quantity is appended
    productForm.append('location', formData.location);
    productForm.append('price', formData.price);
    productForm.append('productStatus', formData.productStatus);
    productForm.append('folderName', formData.folderName);
    productForm.append('userId', formData.userId);
    formData.images.forEach((image) => {
      productForm.append('images', image);
    });

    try {
      const response = await axios.post('http://127.0.0.1:3000/api/v1/products/add-product', productForm, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'jwt': localStorage.getItem('token')
        }
      });
      console.log(response);
      setFormData({
        title: '',
        name: '',
        location: '',
        images: [],
        quantity: '',
        productStatus: '',
        categoryId: '',
        price: '',
        folderName: '',
        userId: '6643d585dd8c6b0c1065f2b5',
      });
      navigate('/products');
      window.location.reload();
    } catch (err) {
      console.error('Error adding product:', err.response ? err.response.data : err);
    }
  };

  return (
    <Container style={{ marginBottom: '5%' }}>
      <form onSubmit={handleSubmit}>
        <label style={{ display: "flex", justifyContent: 'flex-start', alignItems: 'center' }}>
          <StyledSpan  />
          <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>Upload Images</Typography>
          <input
            type="file"
            name="images"
            multiple
            onChange={handleImageChange}
            style={{ display: 'none' }}
            required
          />
        </label>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Title</Typography>
            <TextField
              name="title"
              value={formData.title}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              sx={{ mt: 1 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Price</Typography>
            <TextField
              name="price"
              value={formData.price}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              sx={{ mt: 1 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Quantity</Typography>
            <TextField
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              multiline
              sx={{ mt: 1 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Folder Name</Typography>
            <TextField
              name="folderName"
              value={formData.folderName}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              sx={{ mt: 1 }}
            />
          </Grid>
          <Grid item sx={{ display: 'flex', paddingTop: '16px', '@media(max-width:600px)':{
            flexDirection: 'column',
          } }} xs={12} sm={12}>
            <Grid item xs={12} sm={6} sx={{ paddingLeft: '16px' }}>
              <Typography variant="h6">Location</Typography>
              <TextField
                name="location"
                value={formData.location}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                multiline
                rows={6}
                sx={{ mt: 1 }}
              />
            </Grid>
            <Grid sx={{ display: 'flex', flexDirection: 'column', width: '50%' , '@media(max-width:600px)':{
              width: '100%',
            }}}>
              <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <Grid item xs={12} sm={2} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                  <Typography variant="h6">Status</Typography>
                  <CustomSelect
                    width={130}
                    name="productStatus"
                    value={formData.productStatus}
                    onChange={handleChange}
                    options={[
                      { value: 'used', label: 'Used' },
                      { value: 'new', label: 'New' },
                    ]}
                    sx={{ mt: 1 }}
                  />
                </Grid>
                <Grid item xs={12} sm={2} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Typography variant="h6">Category</Typography>
                  <CustomSelect
                    width={130}
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleChange}
                    options={catgs}
                    sx={{ mt: 1 }}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    width:'60%',
                    backgroundColor: color,
                    color: '#ffffff',
                    '&:hover': {
                      backgroundColor: '#fff',
                      color: color,
                      outline: `2px solid ${color}`,
                    },
                    '@media (max-width: 600px)': { 
                      width:'80%'
                    },
                    '@media (max-width: 1440px)': { 
                      width:'60%'
                    },
                  }}
                >
                  Add Auction Product
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
