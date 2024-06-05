import React, { useContext, useState } from 'react';
import { Box, Container, Grid, TextField, Typography, Button } from '@mui/material';
import CustomSelect from '../components/CustomSelect';
import CategoryContext from '../contexts/CategoriesContext';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function AddAuction() {
    const { categories } = useContext(CategoryContext);
//     const { token } = useContext(UserContext);
    const catgs = categories?.categories?.map(({ _id, title }) => ({ value: _id, label: title })) || [];

    const [formData, setFormData] = useState({
        title: '',
        location: '',
        quantity: '',
        productStatus: '',
        categoryId: '',
        initialValue: '',
        expirationDays: '',
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
        productForm.append('quantity', '33');
        productForm.append('location', formData.location);
        productForm.append('initialValue', formData.initialValue);
        productForm.append('productStatus', formData.productStatus);
        productForm.append('expirationDays', 3);
        productForm.append('productId', '3132123133213133');
       
        formData.images.forEach((image) => {
            productForm.append('images', image); 
        });
        try {
            const response = await axios.post('http://127.0.0.1:3000/api/v1/add-auction', productForm, { 
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'jwt': localStorage.getItem('token')
                }
            });
            console.log(response);
            console.log(formData);
            // setFormData({
            //     title: '',
            //     name: '',
            //     location: '',
            //     images: [],
            //     quantity: '',
            //     productStatus: '',
            //     categoryId: '',
            //     initialValue: '',
            //     userId: '6643d585dd8c6b0c1065f2b5',
            // });
toast.success('added sucessfully')
        } catch (err) {
            console.error(err);
            
toast.error('failed to add auction')
        }
    };

    return (
        <Container>
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
                            sx={{ mt: 1 }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6">Initial Value</Typography>
                        <TextField
                            name="initialValue"
                            value={formData.initialValue}
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
                        <Typography variant="h6">Expiration Days</Typography>
                        <TextField
                            name="expirationDays"
                            value={formData.expirationDays}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                            multiline
                            sx={{ mt: 1 }}
                        />
                    </Grid>
                    <Grid sx={{ display: 'flex', paddingTop: '16px', '@media(max-width:600px)':{
                            flexDirection:'column'
                        }}} xs={12} sm={12}>

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
                        <Grid sx={{ display: 'flex', flexDirection: 'column',width:'50%', '@media(max-width:600px)':{
                            width:'100%'
                        } }}>
                            <Grid xs={12} md={12} sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
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
                                <Button  style={{ width: '60%' }} type="submit" variant="contained" sx={{
                                        '@media (max-width: 600px)': { 
                                            width:'80%'
                                        },
                                        '@media (max-width: 1440px)': { 
                                            width:'60%'
                                        }, backgroundColor: '#5daa60', color: '#ffffff', '&:hover': { backgroundColor: '#fff', color: '#5daa60', outline: '2px solid #5daa60' } }}>
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
