import React, { useState } from 'react';
import { Container, Typography, Box, Button, Card, CardContent, CardActions, IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import AddAddressForm from '../components/AddAddressForm';
import EditAddressForm from '../components/EditAddressForm';

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
        <Container sx={{ width: '100%', marginTop: '10%' }}>
            <Typography sx={{ padding: '10px' }} variant="h5" gutterBottom>
                Your Addresses
            </Typography>
            {
                !editingAddress && !openAdd &&
                <Box sx={{ display: 'flex', p: 3, gap: '20px', flexWrap: 'wrap', padding: '10px' }}>
                    <Button
                        variant="outlined"
                        onClick={handleOpenAdd}
                        sx={{ color: '#5DAA60', fontWeight: 'bold', fontSize: '45px', border: '2px solid #5DAA60', borderStyle: 'dashed', width: '15%' }}
                    >
                        +
                    </Button>
                    {addresses.map((address) => (
                        <Card key={address.id} sx={{ width: '30%' }}>
                            <CardContent>
                                <Typography gutterBottom variant="h6" component="div">
                                    {address.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {address.street}
                                    <br />
                                    {address.city}
                                    <br />
                                    {address.zone}
                                    <br />
                                    {address.country}
                                </Typography>
                            </CardContent>
                            <CardActions sx={{display:'flex', justifyContent:'space-around'}}>
                                <IconButton size="small" onClick={() => handleOpenEdit(address)} color="primary">
                                    <Edit />
                                </IconButton>
                                <IconButton color="error" onClick={() => handleDelete(address.id)}>
                                    <Delete />
                                </IconButton>
                            </CardActions>
                        </Card>
                    ))}
                </Box>
            }
            {/* Add Address Component */}
            {openAdd && <AddAddressForm open={openAdd} handleClose={handleCloseAdd} handleAddAddress={handleAddAddress} />}
            {/* Edit Address Component */}
            {editingAddress && <EditAddressForm open={openEdit} handleClose={handleCloseEdit} address={editingAddress} handleSaveEdit={handleEditAddress} />}
        </Container>
    );
};

export default Address;
