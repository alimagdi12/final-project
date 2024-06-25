import React, { useContext, useState } from 'react';
import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ColorContext from '../../contexts/ColorContext';

export default function AddProduct() {
    const { color } = useContext(ColorContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        location: '',
        images: [],
        quantity: '',
        productStatus: '',
        categoryId: '',
        price: '',
        folderName: '',
        userId: '6643d585dd8c6b0c1065f2b5',
    });

    const [formErrors, setFormErrors] = useState({
        title: '',
        location: '',
        quantity: '',
        productStatus: '',
        categoryId: '',
        price: '',
        folderName: '',
    });

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

    const validateForm = () => {
        let valid = true;
        const newErrors = { ...formErrors };

        // Title validation
        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
            valid = false;
        } else {
            newErrors.title = '';
        }

        // Location validation
        if (!formData.location.trim()) {
            newErrors.location = 'Location is required';
            valid = false;
        } else {
            newErrors.location = '';
        }

        // Quantity validation
        if (!formData.quantity.trim()) {
            newErrors.quantity = 'Quantity is required';
            valid = false;
        } else {
            newErrors.quantity = '';
        }

        // Product Status validation
        if (!formData.productStatus.trim()) {
            newErrors.productStatus = 'Product Status is required';
            valid = false;
        } else {
            newErrors.productStatus = '';
        }

        // Category validation
        if (!formData.categoryId.trim()) {
            newErrors.categoryId = 'Category is required';
            valid = false;
        } else {
            newErrors.categoryId = '';
        }

        // Price validation
        if (!formData.price.trim()) {
            newErrors.price = 'Price is required';
            valid = false;
        } else {
            newErrors.price = '';
        }

        // Folder Name validation
        if (!formData.folderName.trim()) {
            newErrors.folderName = 'Folder Name is required';
            valid = false;
        } else {
            newErrors.folderName = '';
        }

        setFormErrors(newErrors);
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validateForm();

        if (isValid) {
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

            try {
                const response = await axios.post('http://127.0.0.1:3000/api/v1/products/add-product', productForm, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'jwt': localStorage.getItem('token'),
                    },
                });
                console.log(response);
                setFormData({
                    title: '',
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
        }
    };

    return (
        <Container style={{ marginBottom: '5%' }}>
            <form onSubmit={handleSubmit}>
                <label style={{ display: "flex", justifyContent: 'flex-start', alignItems: 'center' }}>
                    <img
                        src={'../../public/otp_icon_upload.gif'}
                        alt="Upload Photo"
                        style={{ cursor: 'pointer', width: '30%' }}
                    />
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
                            error={!!formErrors.title}
                            helperText={formErrors.title}
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
                            error={!!formErrors.price}
                            helperText={formErrors.price}
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
                            error={!!formErrors.quantity}
                            helperText={formErrors.quantity}
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
                            error={!!formErrors.folderName}
                            helperText={formErrors.folderName}
                            sx={{ mt: 1 }}
                        />
                    </Grid>
                    <Grid sx={{ display: 'flex', paddingTop: '16px', '@media(max-width:600px)':{
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
                                error={!!formErrors.location}
                                helperText={formErrors.location}
                                sx={{ mt: 1 }}
                            />
                        </Grid>
                        <Grid sx={{ display: 'flex', flexDirection: 'column', width: '50%' , '@media(max-width:600px)':{
                            width: '100%',
                        }}}>
                            <Grid xs={12} md={12} sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                <Grid item xs={12} sm={2} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                                    <Typography variant="h6">Status</Typography>
                                    <TextField
                                        width={130}
                                        name="productStatus"
                                        value={formData.productStatus}
                                        onChange={handleChange}
                                        error={!!formErrors.productStatus}
                                        helperText={formErrors.productStatus}
                                        sx={{ mt: 1 }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={2} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <Typography variant="h6">Category</Typography>
                                    <TextField
                                        width={130}
                                        name="categoryId"
                                        value={formData.categoryId}
                                        onChange={handleChange}
                                        error={!!formErrors.categoryId}
                                        helperText={formErrors.categoryId}
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
