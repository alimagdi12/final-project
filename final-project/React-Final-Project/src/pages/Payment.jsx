import React, { useState } from 'react';
import {
    Box,
    Card,
    Typography,
    Modal,
    TextField,
    Button,
    IconButton,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { styled } from '@mui/system';
import PaymentCard from '../components/PaymentCard';

const PaymentMethodsContainer = styled(Box)({
    display: 'flex',
    gap: '20px',
    justifyContent: 'center',
    marginTop: '20px',
});

const AddMethodCard = styled(Card)({
    border: '2px dashed #66BB6A    ',
    padding: '20px',
    width: '200px',
    height: '150px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    textAlign: 'center',
});

const ModalContent = styled(Box)({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '400px',
    backgroundColor: 'white',
    padding: '20px',
    boxShadow: 24,
    borderRadius: '8px',
});

function Payment() {
    const [open, setOpen] = useState(false);
    const [cardDetails, setCardDetails] = useState({
        name: '',
        number: '',
    });

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCardDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setOpen(false);
    };

    return (
        <Box sx={{display:'flex' , flexDirection:'column' , alignItems:'flex-start'}}>
            <Typography sx={{ marginTop: '10%', padding: '10px', textAlign: 'left' }} variant="h4" component="h1" align="center">
                Your Payment Methods
            </Typography>
            <PaymentMethodsContainer sx={{ padding: '10px' }}>
                <AddMethodCard onClick={handleOpen} sx={{ width: '40%', display:'flex' }}>
                    <Box sx={{color:'#66BB6A', fontWeight:'bold' , fontSize:'80px'}}>+</Box>
                    <Typography sx={{color:"#66BB6A"}}>Add Method</Typography>
                </AddMethodCard>
                {
                    <PaymentCard name={cardDetails.name} number={cardDetails.number} />
                }
            </PaymentMethodsContainer>
            <Modal open={open} onClose={handleClose}>
                <ModalContent>
                    <IconButton
                        style={{ position: 'absolute', right: 10, top: 10 }}
                        onClick={handleClose}
                    >
                        <Close />
                    </IconButton>
                    <Typography variant="h6" component="h2">
                        Add New Payment Method
                    </Typography>
                    <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
                        <TextField
                            fullWidth
                            label="Name on Card"
                            name="name"
                            margin="normal"
                            required
                            onChange={handleChange}
                        />
                        <TextField
                            fullWidth
                            label="Card Number"
                            name="number"
                            margin="normal"
                            required
                            onChange={handleChange}
                        />
                        <Button type="submit" variant="contained" color="primary" sx={{ marginTop: '20px' }}>
                            Add Card
                        </Button>
                    </form>
                </ModalContent>
            </Modal>
        </Box>
    );
}

export default Payment;