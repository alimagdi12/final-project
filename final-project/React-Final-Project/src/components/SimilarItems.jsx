import React from 'react';
import { Badge, Box, Card, CardContent, CardMedia, IconButton, Typography, Grid } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const SimilarItems = ({ items }) => {
    return (
        <Box mt={4}>
            <Grid container spacing={2}>
                {items.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                        <Card>
                            <CardMedia component="img" height="270" image={item.image} alt={item.title} />
                            <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Typography variant="subtitle1">{item.title}</Typography>
                                <IconButton color="inherit">
                                    <Badge sx={{ color: 'green' }}>
                                        <FavoriteBorderIcon />
                                    </Badge>
                                </IconButton>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default SimilarItems;
