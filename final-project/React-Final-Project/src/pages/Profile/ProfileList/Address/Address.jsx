import React, { useState } from 'react';
import { Container, Typography, Box, Button, Card, CardContent, CardActions, IconButton, Grid } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import AddAddressForm from '../../../../components/AddAddressForm';
import EditAddressForm from '../../../../components/EditAddressForm';

const Address = () => {
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [addresses, setAddresses] = useState([
        {
            id: 1,
            name: 'Mohamed Ayman Mostafa',
            street: 'Shbeen street',
            city: 'Jasmine Tower',
            zone: 'Ismailia Free zone',
            country: 'Egypt',
        },
    ]);
    const [editingAddress, setEditingAddress] = useState(null);

    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseAdd = () => setOpenAdd(false);

    const handleOpenEdit = (address) => {
        setEditingAddress(address);
        setOpenEdit(true);
    };

    const handleCloseEdit = () => {
        setEditingAddress(null);
        setOpenEdit(false);
    };

    const handleAddAddress = (newAddress) => {
        newAddress.id = addresses.length ? addresses[addresses.length - 1].id + 1 : 1;
        setAddresses([...addresses, newAddress]);
        setOpenAdd(false);
    };

    const handleEditAddress = (editedAddress) => {
        setAddresses(addresses.map((address) => (address.id === editedAddress.id ? editedAddress : address)));
        setEditingAddress(null);
        setOpenEdit(false);
    };

    const handleDelete = (id) => {
        setAddresses(addresses.filter((address) => address.id !== id));
    };

    return (
        <Container sx={{ width: '100%'}}>
            <Typography sx={{ padding: '10px' }} variant="h5" gutterBottom>
                Your Addresses
            </Typography>
            {
                !editingAddress && !openAdd &&
                <Grid container spacing={2} sx={{ padding: '10px' }}>
                    <Grid item xs={12} sm={6} md={4} lg={3} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button
                            variant="outlined"
                            onClick={handleOpenAdd}
                            sx={{
                                color: '#5DAA60',
                                fontWeight: 'bold',
                                fontSize: '20px',
                                border: '2px solid #5DAA60',
                                borderStyle: 'dashed',
                                width: '100%',
                                height: '150px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Typography variant="h1" component="span">+</Typography>
                            <Typography component="span">Add Address</Typography>
                        </Button>
                    </Grid>
                    {addresses.map((address) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={address.id} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Card sx={{ width: '100%', border: '1px solid #5DAA60', borderRadius: '10px' }}>
                                <CardContent>
                                    <Typography variant="subtitle1" color="#5DAA60" gutterBottom>
                                        Address name
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {address.name}
                                    </Typography>
                                    <Typography variant="subtitle1" color="#5DAA60" gutterBottom>
                                        Governorate
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {address.city}
                                    </Typography>
                                    <Typography variant="subtitle1" color="#5DAA60" gutterBottom>
                                        Street
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {address.street}
                                    </Typography>
                                    <Typography variant="subtitle1" color="#5DAA60" gutterBottom>
                                        Building
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {address.zone}
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{ display: 'flex', justifyContent: 'space-between', padding: '16px' }}>
                                    <Button variant="contained" color="primary" size="small" onClick={() => handleOpenEdit(address)}>
                                        Edit
                                    </Button>
                                    <Button variant="text" color="error" size="small" onClick={() => handleDelete(address.id)}>
                                        remove
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            }
            {/* Add Address Component */}
            {openAdd && <AddAddressForm open={openAdd} handleClose={handleCloseAdd} handleAddAddress={handleAddAddress} />}
            {/* Edit Address Component */}
            {editingAddress && <EditAddressForm open={handleOpenEdit} handleClose={handleCloseEdit} address={editingAddress} handleSaveEdit={handleEditAddress} />}
        </Container>
    );
};

export default Address;
