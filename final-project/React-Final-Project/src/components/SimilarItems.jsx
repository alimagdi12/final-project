import React from 'react';
import { Badge, Box, Card, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const SimilarItems = ({ items }) => {
    return (
        <Box display="flex" justifyContent="space-between" mt={4}>
            {items.map((item, index) => (
                <Card key={index} style={{ width: '23%' }}>

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
            ))}
        </Box>
    );
};

export default SimilarItems;