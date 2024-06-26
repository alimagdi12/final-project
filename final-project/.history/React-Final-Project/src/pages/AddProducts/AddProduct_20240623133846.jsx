import React, { useContext, useState } from 'react';
import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ColorContext from '../../contexts/ColorContext';

export default function AddProduct() {
    const { color } = useContext(ColorContext);
    const navigate = useNavigate();

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

    const [emailError, setEmailError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setFormData({
            ...formData,
            images: files,
        });
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+\.(com|net|org)$/i;
        if (!emailRegex.test(email)) {
            setEmailError('Please enter a valid email address');
        } else {
            setEmailError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Implement form submission logic here
        // Example: Axios request to submit form data
        try {
            const productForm = new FormData();
            productForm.append('title', formData.title);
            productForm.append('categoryId', formData.categoryId);
            productForm.append('quantity', formData.quantity);
            productForm.append('location', formData.location);
            productForm.append('price', formData.price);
            productForm.append('productStatus', formData.productStatus);
            productForm.append('folderName', formData.folderName);
            productForm.append('userId', formData.userId);
            formData.images.forEach((image) => {
                productForm.append('images', image);
            });

            const response = await axios.post('http://127.0.0.1:3000/api/v1/products/add-product', productForm, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'jwt': localStorage.getItem('token'),
                },
            });
            (response);
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
                    <Grid item xs={12} sm={6}>
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
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6">Email</Typography>
                        <TextField
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            onBlur={(e) => validateEmail(e.target.value)}
                            fullWidth
                            variant="outlined"
                            error={!!emailError}
                            helperText={emailError}
                            sx={{ mt: 1 }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6">Product Status</Typography>
                        <TextField
                            name="productStatus"
                            value={formData.productStatus}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                            multiline
                            sx={{ mt: 1 }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6">Category</Typography>
                        <TextField
                            name="categoryId"
                            value={formData.categoryId}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                            multiline
                            sx={{ mt: 1 }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                width: '60%',
                                backgroundColor: color,
                                color: '#ffffff',
                                '&:hover': {
                                    backgroundColor: '#fff',
                                    color: color,
                                    outline: `2px solid ${color}`,
                                },
                            }}
                        >
                            Add Auction Product
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}
