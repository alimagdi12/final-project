import React, { useContext, useEffect } from 'react';
import { LoveContext } from '../contexts/LoveContext';
import { Grid, Card, CardContent, CardMedia, Typography } from '@mui/material';

const FavoritePage = () => {
    const { favorites, getFavorite } = useContext(LoveContext);

    useEffect(() => {
        getFavorite();
    }, []);

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Welcome To Your Wishlist
            </Typography>
            <Grid container spacing={2}>
                {favorites?.length > 0 ? (
                    favorites?.map(product => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="270"
                                    image={`/public/${product.folderName}/${product.imagesUrl.images[0]}`}
                                    alt={product.title}
                                />
                                <CardContent>
                                    <Typography variant="subtitle1">{product.title}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Typography variant="h6" color="textSecondary">
                        No favorite items found.
                    </Typography>
                )}
            </Grid>
        </div>
    );
};

export default FavoritePage;
