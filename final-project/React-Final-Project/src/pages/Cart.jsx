import { useContext, useEffect, useState } from 'react';
import {
    Container,
    Typography,
    IconButton,
    Badge,
    Box,
    Paper,
    Grid,
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Avatar
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import { CartContext } from '../contexts/CartContext';
import axios from 'axios';

const Cart = () => {
    const { cartItems, updateCartItemQuantity, setCartItems, totalItems ,getCart } = useContext(CartContext);

    const safeTotalItems = isNaN(totalItems) ? 0 : totalItems;

    const [openDialog, setOpenDialog] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState(null);

    const handleQuantityChange = (id, quantity) => {
        updateCartItemQuantity(id, quantity);
    };

    const handleDelete = async (id) => {
         try {
            const response = await axios.post(
                'http://127.0.0.1:3000/api/v1/auth/remove-from-cart',
                { cartId: id },
                {
                  headers: {
                    'Content-Type': 'application/json', 
                    jwt: localStorage.getItem('token'),
                  },
                }
              );
          getCart()
            if (response.status === 200) {
                setCartItems((prevItems) => prevItems.filter(item => item.id !== id));
            }
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };

    const confirmDelete = () => {
        handleDelete(deleteItemId);
        setOpenDialog(false);
        setDeleteItemId(null);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
        setDeleteItemId(null);
    };

    useEffect(() => {
        setCartItems(cartItems);
    }, []);

   
    const navigate = useNavigate();
    const totalPrice = 100;
    const Tax = 50;
    const totalCash = totalPrice + Tax;

    return (
        <Container sx={{ marginTop: '3%' }}>
            <Box sx={{ color: '#5DAA60' }}>
                <Box display="flex" alignItems="center" mb={2} justifyContent={'space-between'} borderBottom={'2px solid #5DAA60'}>
                    <Box sx={{ display: 'flex' }}>
                        <ShoppingCartIcon fontSize="large" />
                        <Typography variant="h4" ml={1}>Shopping Cart</Typography>
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                        <Box sx={{ width: "26px", height: '35px', backgroundColor: '#5DAA60', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '5px' }}>
                            {safeTotalItems}
                        </Box>
                        <Typography variant="h4" ml={1}>Items</Typography>
                    </Box>
                </Box>

                <Grid container spacing={2}>
                    <Grid item xs={12} md={8}>
                        {cartItems&&cartItems.map(item => (
                            <Paper key={item.id} sx={{ p: 2, marginBottom: '25px', border: '2px solid #5DAA60' }}>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs={12} md={2}>
                                        <Avatar variant="square" src={item.image} sx={{ width: '100%', height: 'auto', borderRadius: '5px' }} />
                                    </Grid>
                                    <Grid item xs={12} md={8}>
                                        <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                                            <Grid item xs={12} md={4}>
                                                <Typography variant="p" sx={{ fontWeight: 'bold', fontSize: '17px', color: '#5DAA60' }}>{item.name}</Typography>
                                                <Typography>Color - <Typography variant="p" sx={{ fontWeight: 'bold', fontSize: '17px', color: '#5DAA60' }}>{item.color}</Typography></Typography>
                                                <Typography>Size - <Typography variant="p" sx={{ fontWeight: 'bold', fontSize: '17px', color: '#5DAA60' }}>{item.size}</Typography></Typography>
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '17px', color: '#5DAA60' }}>{item.price} EGP</Typography>
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <TextField
                                                    type="number"
                                                    value={item.quantity}
                                                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value, 10))}
                                                    inputProps={{ min: 1 }}
                                                    fullWidth
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={6} md={2} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start' }}>
                                        <IconButton sx={{ fontWeight: 'bold', fontSize: '17px', color: '#F14247' }} color="secondary" onClick={() => { setDeleteItemId(item._id); setOpenDialog(true); }}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Paper>
                        ))}
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box sx={{ borderLeft: '2px solid #5DAA60', borderBottom: '25px solid #5DAA60', borderTop: '25px solid #5DAA60', borderRight: '2px solid #5DAA60', marginBottom: '40px', padding: '8px 60px', fontWeight: 'bold', width: '100%' }} variant="contained" color="primary">
                            <Typography sx={{ display: 'flex', justifyContent: 'center', fontSize: '20px', color: '#5DAA60', borderBottom: '2px solid #5DAA60' }}>
                                Order Summary
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '20px', color: '#5DAA60', borderBottom: '2px solid #5DAA60' }}>
                                <Typography>Items Price</Typography>
                                <Typography>
                                    {totalPrice} EGP
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '20px', color: '#5DAA60', borderBottom: '2px solid #5DAA60' }}>
                                <Typography>Added Tax</Typography>
                                <Typography>
                                    {Tax} EGP
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '20px', color: '#5DAA60', borderBottom: '2px solid #5DAA60' }}>
                                <Typography>Total</Typography>
                                <Typography>
                                    {totalCash} EGP
                                </Typography>
                            </Box>
                        </Box>
                        <Button onClick={() => navigate('/placeOrder')} sx={{ backgroundColor: '#5DAA60', marginBottom: '40px', fontWeight: 'bold', width: '100%', '&:hover': { backgroundColor: '#66BB6A' } }} variant="contained">
                            Checkout
                        </Button>
                    </Grid>
                </Grid>

                <Dialog open={openDialog} onClose={handleDialogClose}>
                    <DialogTitle>Confirm Delete</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to delete this item from the cart?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDialogClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={confirmDelete} color="primary">
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Container>
    );
};

export default Cart;
