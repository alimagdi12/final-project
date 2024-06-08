import React, { useState, useEffect, useContext } from 'react';
import { Container, Typography, TextField, Button, Paper } from '@mui/material';
import ColorContext from '../../../../../contexts/ColorContext';

const EditAddressForm = ({ open, handleClose, address, handleSaveEdit }) => {
    const {color} = useContext(ColorContext)
    const [formData, setFormData] = useState({
        name: '',
        street: '',
        city: '',
        zone: '',
        country: '',
    });

    useEffect(() => {
        if (address) {
            setFormData(address);
        }
    }, [address]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSaveEdit(formData);
        handleClose();
    };

    if (!open) return null;

    return (
        <Container component="main">
            <Paper style={{ padding: 20 }}>
                <Typography variant="h5" gutterBottom>
                    Edit Address
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
                    <Button sx={{backgroundColor:color , "&:hover":{color:color, backgroundColor:'white', outline:`2px solid ${color}`}}} type="submit" fullWidth variant="contained" color="primary">
                        Save Address
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default EditAddressForm;
