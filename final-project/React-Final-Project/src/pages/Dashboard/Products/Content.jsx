import React, { useContext, useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, CardMedia, IconButton, Fab } from '@mui/material';
import { Edit, Delete, Add as AddIcon } from '@mui/icons-material';
import EditNoteIcon from '@mui/icons-material/EditNote';
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';

import ProductsContext from '../../../contexts/ProductsContext'
import axios from 'axios';

const Content = () => {
    // const {token} = useContext(usee)
const {products,fetchProducts} = useContext(ProductsContext)
console.log(products);
    const handleDelete =async (id) => {
        try {
            const response = await axios.delete(
                `http://127.0.0.1:3000/api/v1/products/delete-product/${id}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        jwt: localStorage.getItem("token"),
                    },
                }
            );
            console.log(response);
            fetchProducts()
        } catch (error) {
            console.error("Error fetching chat history:", error);
        }
    };

    return (
        <Box sx={{ flexGrow: 1, padding: '16px', backgroundColor: '#333340', color: '#fff' }}>
            <Typography variant="h5" gutterBottom sx={{ color: '#fff' }}>
                Top Selling of The Day
            </Typography>
            <Grid container spacing={2}>
                {products?.products?.map((product, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card sx={{ backgroundColor: '#1F1B24', color: '#fff' }}>
                            <CardMedia
                                component="img"
                                height="140"
                                image={product?.imagesUrl?.images[0]}
                                alt={product.title}
                            />
                            <CardContent>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="h6">{product.title}</Typography>
                                    <Typography variant="h6" color="#fff">
                                        {product.price}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '8px' }}>
                                    <IconButton onClick={() => handleDelete(product._id)} color="error"><AutoDeleteIcon /></IconButton>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            {/* Repeat for other categories */}
            <Fab color="primary" aria-label="add" sx={{ height: '6%', width: '3%', position: 'fixed', top: 139, right: 16, background: 'linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)' }}>
                <AddIcon />
            </Fab>
        </Box>
    );
};

export default Content;
