import { useContext, useEffect, useState } from 'react';
import {
    Container,
    AppBar,
    Toolbar,
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

const Cart = () => {

    const { cartItems, updateCartItemQuantity, setCartItems, totalItems } = useContext(CartContext);

    const safeTotalItems = isNaN(totalItems) ? 0 : totalItems;


    const [openDialog, setOpenDialog] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState(null);



    const handleQuantityChange = (id, quantity) => {
        updateCartItemQuantity(id, quantity);
    };

    const handleDelete = id => {
        setDeleteItemId(id);
        setOpenDialog(true);
    };

    const confirmDelete = () => {
        setCartItems(cartItems.filter(item => item.id !== deleteItemId));
        setOpenDialog(false);
        setDeleteItemId(null);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
        setDeleteItemId(null);
    };

    const navigate = useNavigate();
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const Tax = 50;
    const totalCash = totalPrice + Tax

    return (
        <div>
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

                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Box sx={{ width: '65%', marginBottom: '5%' }}>
                            {cartItems.map(item => (
                                <Paper key={item.id} sx={{ p: 2, mt: 2, border: '2px solid #5DAA60' }}>
                                    <Grid container spacing={2} alignItems="center" sx={{ display: 'flex', justifyContent: 'space-around' }}>
                                        <Grid item xs={12} md={3}>
                                            <Avatar variant="square" src={item.image} sx={{ width: 150, height: 150, borderRadius: '5px' }} />
                                        </Grid>
                                        <Grid item xs={12} md={2} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                            <Typography variant="p" sx={{ fontWeight: 'bold', fontSize: '17px', color: '#5DAA60' }}>{item.name}</Typography>
                                            <Typography>Color - <Typography variant="p" sx={{ fontWeight: 'bold', fontSize: '17px', color: '#5DAA60' }}>{item.color}</Typography></Typography>
                                            <Typography>Size - <Typography variant="p" sx={{ fontWeight: 'bold', fontSize: '17px', color: '#5DAA60' }}>{item.size}</Typography></Typography>
                                        </Grid>
                                        <Grid item xs={12} md={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                                            <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '17px', color: '#5DAA60' }}>{item.price} EGP</Typography>
                                        </Grid>
                                        <Grid item xs={12} md={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                                            <TextField
                                                type="number"
                                                value={item.quantity}
                                                onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value, 10))}
                                                inputProps={{ min: 1 }}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                                            <Typography sx={{ fontWeight: 'bold', fontSize: '17px', color: '#5DAA60' }} variant="h6">{item.price * item.quantity} EGP</Typography>
                                        </Grid>
                                        <Grid item xs={12} md={1}>
                                            <IconButton sx={{ fontWeight: 'bold', fontSize: '17px', color: '#F14247' }} color="secondary" onClick={() => handleDelete(item.id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            ))}
                        </Box>
                        <Box mt={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'column', width: '30%' }}>
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
                            <Box sx={{ width: '100%', margin: '0' }}>
                                <Button onClick={() => navigate('/placeOrder')} sx={{ backgroundColor: '#5DAA60', marginBottom: '40px', fontWeight: 'bold', width: '100%', '&:hover': { backgroundColor: '#66BB6A' } }} variant="contained" >
                                    Checkout
                                </Button>
                            </Box>
                        </Box>
                    </Box>
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
        </div>
    );
};

export default Cart;
