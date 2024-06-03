import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Paper } from '@mui/material';

const AddAddressForm = ({ open, handleClose, handleAddAddress }) => {
    const [formData, setFormData] = useState({
        name: '',
        street: '',
        city: '',
        zone: '',
        country: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleAddAddress(formData);
        handleClose();
    };

    if (!open) return null;

    return (
        <Container component="main">
            <Paper style={{ padding: 20 }}>
                <Typography variant="h5" gutterBottom>
                    Add Address
                </Typography>
                <form noValidate onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="name"
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="street"
                        label="Street"
                        name="street"
                        value={formData.street}
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="city"
                        label="City"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="zone"
                        label="Zone"
                        name="zone"
                        value={formData.zone}
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="country"
                        label="Country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                    />
                    <Button type="submit" fullWidth variant="contained" color="primary">
                        Add Address
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default AddAddressForm;
