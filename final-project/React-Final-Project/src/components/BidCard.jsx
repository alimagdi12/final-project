import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Button, TextField, Container } from '@mui/material';
import CircularWithValueLabel from './CircleProgress';

const AuctionCard = () => {

    return (
        <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', marginTop: '15px' }}>
            <img src="../../public/villa.jpg" alt="Villa" style={{ maxWidth: '450px', height: '620px' }} />

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'space-between', justifyContent: 'flex-end', width: '50%' }}>
                <Typography variant="h5" sx={{ marginBottom: '18px', width: '100%' }}>Villa for sale in Badya</Typography>
                <Card sx={{ marginRight: '20px', display: 'flex', width: '100%', justifyContent: 'center', flexDirection: 'column', backgroundColor: '#fff', height: '550px', boxShadow: "0px 0px 15px 5px rgba(0, 0, 0, 0.2)" }}>
                    <CardContent sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                        <CircularWithValueLabel />
                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
};

export default AuctionCard;
