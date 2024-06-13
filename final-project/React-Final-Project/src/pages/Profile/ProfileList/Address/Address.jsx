import React, { useState, useEffect, useContext } from 'react';
import { Container, Typography, Grid, Button, Card, CardContent, CardActions } from '@mui/material';
import AddAddressForm from './Components/AddAddressForm';
import EditAddressForm from './Components/EditAddressForm';
import { AddressContext } from '../../../../contexts/AddressContext';

const Address = () => {
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);

    const {deleteAddress, fetchAddresses, addresses, setAddresses } = useContext(AddressContext);



    useEffect(() => {

        // fetchAddresses();
    }, []);

    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseAdd = () => setOpenAdd(false);

    const handleOpenEdit = async(address) => {
       setEditingAddress(address);
        setOpenEdit(true);
    };

    const handleCloseEdit = () => {
        setEditingAddress(null);
        setOpenEdit(false);
    };

    return (
        <Container sx={{ width: '100%' }}>
            <Typography sx={{ padding: '10px' }} variant="h5" gutterBottom>
                Your Addresses
            </Typography>
            {!editingAddress && !openAdd && (
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
                    {addresses?.map((address) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={address.id} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Card sx={{ width: '100%', border: '1px solid #5DAA60', borderRadius: '10px' }}>
                                <CardContent>
                                    <Typography variant="subtitle1" color="#5DAA60" gutterBottom>
                                        Country
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {address.country}
                                    </Typography>
                                    <Typography variant="subtitle1" color="#5DAA60" gutterBottom>
                                        City
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
                                        ZIP
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {address.zip}
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{ display: 'flex', justifyContent: 'space-between', padding: '16px' }}>
                                    <Button variant="contained" color="primary" size="small" onClick={() => handleOpenEdit(address)}>
                                        Edit
                                    </Button>
                                    <Button variant="text" color="error" size="small" onClick={async() => {await deleteAddress(address._id); await fetchAddresses()}}>
                                        Remove
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
            {openAdd && <AddAddressForm open={openAdd} handleClose={handleCloseAdd} />}
            {editingAddress && <EditAddressForm open={openEdit} handleClose={handleCloseEdit} address={editingAddress} />}
        </Container>
    );
};

export default Address;

