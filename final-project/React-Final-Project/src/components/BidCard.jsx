import React from 'react';
import { Card, CardContent, Typography, Box, Container, Grid } from '@mui/material';
import CircularWithValueLabel from './CircleProgress';

const AuctionCard = () => {
    return (
        <Container sx={{ marginTop: '15px' }}>
            <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                        <img src="../../public/villa.jpg" alt="Villa" style={{ maxWidth: '100%', height:'100vh' }} />
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <Typography variant="h5" sx={{ marginBottom: '18px' }}>
                            Villa for sale in Badya
                        </Typography>
                        <Card sx={{ display: 'flex', flexDirection: 'column', backgroundColor: '#fff', height: '100%', boxShadow: "0px 0px 15px 5px rgba(0, 0, 0, 0.2)" }}>
                            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <CircularWithValueLabel />
                            </CardContent>
                        </Card>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default AuctionCard;
