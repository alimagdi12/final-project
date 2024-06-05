import React, { useContext, useState } from 'react';
import { Box, Container, TextField, Typography } from '@mui/material';
import CustomSelect from '../components/CustomSelect';
import ScheduleListing from '../components/ScheduleListing';
import CategoryContext from '../contexts/CategoriesContext';
import UserContext from '../contexts/UserContext';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function AddAuction() {
    const { categories } = useContext(CategoryContext);
    const { token } = useContext(UserContext);
    const catgs = categories?.categories?.map(({ _id, title }) => ({ value: _id, label: title })) || [];
    
    
    const [formData, setFormData] = useState({
        title: '',
        name: '',
        location: '',
        images: [],
        quantity: '',
        productStatus: '',
        categoryId: '',
        initialValue: '',
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
            
            
            <input type="file" name="images" multiple onChange={handleImageChange} required />

            <form onSubmit={handleSubmit}>
                <Typography variant="h6">Title</Typography>
                <Box>
                    <Typography>Item Title 1</Typography>
                    <TextField
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                    />
                </Box>
                <Box>
                    <Typography>initialValue</Typography>
                    <TextField
                        name="initialValue"
                        value={formData.initialValue}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                    />
                </Box>
                <Box>
                    <Typography>Location</Typography>
                    <TextField
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        multiline
                        rows={6}
                    />
                </Box>
                <Box>
                    <Typography>Status</Typography>
                    <CustomSelect
                        name="productStatus"
                        value={formData.productStatus}
                        onChange={handleChange}
                        options={[
                            { value: 'used', label: 'used' },
                            { value: 'new', label: 'new' },
                        ]}
                    />
                </Box>
                <Box>
                    <Typography>Category</Typography>
                    <Box>
                        <CustomSelect
                            name="categoryId"
                            value={formData.categoryId}
                            onChange={handleChange}
                            options={catgs}
                        />
                    </Box>
                </Box>
                
                {/* <ScheduleListing /> */}
                <button type="submit">Submit</button>
            </form>
        </Container>
    );
}








































