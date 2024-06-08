import React, { useContext, useState } from 'react';
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
    Avatar,
    Card,
    CardContent,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import PaymentIcon from '@mui/icons-material/Payment';
import HomeIcon from '@mui/icons-material/Home';
import { CartContext } from '../../contexts/CartContext';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PaymentCard from './Components/PaymentCard';
import { Check, CheckBox } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {

    const [addresses, setAddresses] = useState([
        { id: 1, name: 'Mohamed Ayman Mostafa', address: 'Shbein town, Jasmine Tower, Ismailia Free Zone, Egypt' },
    ]);

    const [cards, setCards] = useState([
        { id: 1, name: 'Mohamed Ayman Mostafa', number: '4556 - 5642 - 0695 - 5168', cvv: '123' },
    ]);

    const { cartItems, setCartItems } = useContext(CartContext)
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState(null);
    const [openAddressDialog, setOpenAddressDialog] = useState(false);
    const [newAddress, setNewAddress] = useState('');
    const [openCardDialog, setOpenCardDialog] = useState(false);
    const [newCard, setNewCard] = useState({ name: '', number: '', cvv: '' });
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');
    const [name, setName] = useState('');
    const [selectedAddress, setSelectedAddress] = useState(null)
    const [selectedCard, setSelectedCard] = useState(null)

    const navigate = useNavigate();

    const handleCardClick = (cardId) => {
        if (+selectedCard === +cardId) {
            setSelectedCard(null)
        } else {
            setSelectedCard(cardId)
        }
    }

    const confirmDelete = () => {
        setCartItems(cartItems.filter(item => item.id !== deleteItemId));
        setOpenDeleteDialog(false);
        setDeleteItemId(null);
    };

    const handleDeleteDialogClose = () => {
        setOpenDeleteDialog(false);
        setDeleteItemId(null);
    };

    const handleAddAddress = () => {
        setAddresses([...addresses, { id: addresses.length + 1, name: name, address: newAddress }]);
        setNewAddress('');
        setOpenAddressDialog(false);
    };

    const handleAddressDialogClose = () => {
        setNewAddress('');
        setOpenAddressDialog(false);
    };

    const handleAddCard = () => {
        setCards([...cards, { id: cards.length + 1, ...newCard }]);
        setNewCard({ name: '', number: '', cvv: '' });
        setOpenCardDialog(false);
    };

    const handleCardDialogClose = () => {
        setNewCard({ name: '', number: '', cvv: '' });
        setOpenCardDialog(false);
    };

    const handlePaymentMethodChange = (event) => {
        setSelectedPaymentMethod(event.target.value);
    };

    const handleAddressClick = (addressId) => {
        if (+selectedAddress === +addressId) {
            setSelectedAddress(null);
        } else {
            setSelectedAddress(addressId);
        }
    }

    const handlePlaceOrder = () => {
        navigate('/orderDone')
    }

    const totalPrice = cartItems?.reduce((sum, item) => sum + item.productId.price * item.quantity, 0);
    const COD = 70;
    const Tax = 50;
    const total = totalPrice + COD
    const totalCash = totalPrice + COD + Tax
    return (
        <Container>
            <Box mt={4}>
            <Typography 
    variant={{
        xs: 'h6',
        sm: 'h5',
        md: 'h4',
    }}
    sx={{ 
        marginLeft: '16px', 
        borderBottom: '2px solid #66BB6A', 
        lineHeight: '50px', 
        width: '100%', 
        color: '#66BB6A', 
        fontWeight: 'bold', 
        display: 'flex', 
        alignItems: 'center' 
    }} 
    mb={2}
>
    <HomeIcon /> Shipping Address
</Typography>
<Grid container spacing={2}>
    {addresses.map(address => (
        <Grid item xs={12} sm={6} md={4} key={address.id}>
            <Card
                sx={{
                    position: 'relative',
                    minHeight: '250px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    alignContent: 'center',
                    cursor: 'pointer',
                    '&:hover .circle1': {
                        left: '60%',
                        transition: 'left 0.4s ease-in-out',
                    },
                    '&:hover .circle2': {
                        left: '-5%',
                        transition: 'left 0.4s ease-in-out, top 0.3s ease-in-out',
                    },
                    '&:hover .circle3': {
                        left: '60%',
                        transition: 'left 0.4s ease-in-out, top 0.3s ease-in-out',
                    },
                }}
                onClick={() => handleAddressClick(address.id)}
            >
                <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', alignContent: 'center' }}>
                    {
                        selectedAddress === address.id ?
                            <CheckCircleIcon sx={{ color: "#5CA95F" }} />
                            :
                            <>
                                <Typography sx={{ fontWeight: 'bold', marginBottom: '10px', marginTop: '5px' }} variant="body1">{address.name}</Typography>
                                <Typography sx={{ marginBottom: '10px' }} variant="body2">{address.address}</Typography>
                            </>
                    }
                </CardContent>
                <Box className='circle1' sx={{ width: '50%', height: '100%', borderRadius: '50%', backgroundColor: '#5DAA60', position: 'absolute', left: '-10px', top: '-45%', opacity: '15%', transition: 'left 0.5s ease-in-out, top 0.3s ease-in-out', filter: 'blur(20px)' }}>
                </Box>
                <Box className='circle2 ' sx={{ width: '50%', height: '140%', borderRadius: '50%', backgroundColor: '#5DAA60', position: 'absolute', left: '55%', top: '-10%', opacity: '15%', transition: 'left 0.5s ease-in-out, top 0.3s ease-in-out', filter: 'blur(20px)' }}>
                </Box>
                <Box className='circle3' sx={{ width: '50%', height: '100%', borderRadius: '50%', backgroundColor: '#5DAA60', position: 'absolute', left: '-10px', top: '40%', opacity: '15%', transition: 'left 0.5s ease-in-out, top 0.3s ease-in-out', filter: 'blur(20px)' }}>
                </Box>
            </Card>
        </Grid>
    ))}
    <Grid item xs={12} sm={6} md={4}>
        <Card
            sx={{
                position: 'relative',
                minHeight: '250px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                alignContent: 'center',
                cursor: 'pointer',
                '&:hover .circle1': {
                    left: '60%',
                    transition: 'left 0.4s ease-in-out',
                },
                '&:hover .circle2': {
                    left: '-5%',
                    transition: 'left 0.4s ease-in-out, top 0.3s ease-in-out',
                },
                '&:hover .circle3': {
                    left: '60%',
                    transition: 'left 0.4s ease-in-out, top 0.3s ease-in-out',
                },
            }}
            onClick={() => setOpenAddressDialog(true)}
        >
            <CardContent sx={{ fontSize: '20px', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', alignContent: 'center' }}>
                Add another
            </CardContent>
            <Box className='circle1' sx={{ width: '50%', height: '100%', borderRadius: '50%', backgroundColor: '#5DAA60', position: 'absolute', left: '-10px', top: '-45%', opacity: '15%', transition: 'left 0.5s ease-in-out, top 0.3s ease-in-out', filter: 'blur(20px)' }}>
            </Box>
            <Box className='circle2 ' sx={{ width: '50%', height: '140%', borderRadius: '50%', backgroundColor: '#5DAA60', position: 'absolute', left: '55%', top: '-10%', opacity: '15%', transition: 'left 0.5s ease-in-out, top 0.3s ease-in-out', filter: 'blur(20px)' }}>
            </Box>
            <Box className='circle3' sx={{ width: '50%', height: '100%', borderRadius: '50%', backgroundColor: '#5DAA60', position: 'absolute', left: '-10px', top: '40%', opacity: '15%', transition: 'left 0.5s ease-in-out, top 0.3s ease-in-out', filter: 'blur(20px)' }}>
            </Box>
        </Card>
    </Grid>
</Grid>

                <Box mt={4}>
    <Typography variant="h5" mb={2} display={'flex'} justifyContent={'space-between'} flexDirection={'column'}>
        <Typography variant="h5" sx={{ borderBottom: '2px solid #66BB6A', lineHeight: '50px', color: '#66BB6A', fontWeight: 'bold', fontSize: '22px', display: 'flex', alignItems: 'center' }} width={'100%'} ml={2}><ShoppingCartIcon /> Your Order</Typography>
        <Typography variant="h5" sx={{ display: 'flex', marginTop: '15px' }}>
            <Typography variant="h5" sx={{ backgroundColor: '#66BB6A', padding: '0px 8px', borderRadius: '8px', fontWeight: 'bold', color: 'white', fontSize: '17px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} ml={2}>{cartItems?.length}</Typography>
            <Typography sx={{ color: '#66BB6A', fontWeight: 'bold' }} variant="h6" ml={2}>Items</Typography>
        </Typography>
    </Typography>
    {cartItems?.map(item => (
        <Grid key={item.productId._id} container spacing={2} alignItems="center" sx={{ display: 'flex', alignItems: 'flex-start', height: 'auto' }}>
            <Grid item xs={12} md={4} sx={{ width: '100%', height: '280px' }}>
                <Avatar variant="square" src={`../../public/${item.productId.folderName}/${item.productId.imagesUrl.images[0]}`} sx={{ width: '100%', height: '80%', borderRadius: '7px' }} />
            </Grid>
            <Grid item xs={12} md={6}>
                <Typography variant="h6" sx={{ marginBottom: { xs: '5px', md: '10px' }, fontWeight: 'bold' }}>{item.productId.title}</Typography>
                <Typography variant="h6" sx={{ marginBottom: { xs: '5px', md: '10px' }, fontWeight: 'bold' }}>{item.productId.price} EGP</Typography>
                <Typography variant="h6" sx={{ marginBottom: { xs: '5px', md: '10px' }, fontWeight: 'bold' }}>Quantity:{item.quantity}</Typography>
                <Typography variant="h6" sx={{ marginBottom: { xs: '5px', md: '10px' }, fontWeight: 'bold' }}>Total:{item.productId.price * item.quantity}</Typography>
            </Grid>
        </Grid>
    ))}
    <Box mt={4}>
        <Typography sx={{ fontWeight: 'bold' }} variant="h5">Total: {totalPrice} EGP</Typography>
    </Box>
</Box>
<Box mt={4}>
    <Typography 
        variant={{
            xs: 'h6',
            sm: 'h5',
            md: 'h4',
        }}
        sx={{ 
            borderBottom: '2px solid #66BB6A', 
            lineHeight: '50px', 
            color: '#66BB6A', 
            fontWeight: 'bold', 
            display: 'flex', 
            alignItems: 'center' 
        }} 
        mb={2}
    >
        <PaymentIcon /> Payment
    </Typography>
    <FormControl component="fieldset">
        <FormLabel 
            sx={{ 
                borderBottom: '2px solid #66BB6A', 
                lineHeight: '50px', 
                color: '#66BB6A', 
                fontWeight: 'bold', 
                fontSize: '17px', 
                display: 'flex', 
                alignItems: 'center' 
            }} 
            component="legend"
        >
            Select Payment Method
        </FormLabel>
        <RadioGroup 
            sx={{ display: 'flex' }} 
            aria-label="payment-method" 
            name="payment-method" 
            value={selectedPaymentMethod} 
            onChange={handlePaymentMethodChange}
        >
            <FormControlLabel 
                sx={{ 
                    backgroundColor: selectedPaymentMethod === 'card' ? '#66BB6A' : '', 
                    color: selectedPaymentMethod === 'card' ? '#fff' : '' 
                }} 
                value="card" 
                control={<Radio sx={{ color: '#66BB6A', '&.Mui-checked': { color: '#66BB6A' } }} />} 
                label="Credit Card" 
            />
            <FormControlLabel 
                sx={{ 
                    backgroundColor: selectedPaymentMethod === 'cash' ? '#66BB6A' : '', 
                    color: selectedPaymentMethod === 'cash' ? '#fff' : '' 
                }} 
                value="cash" 
                control={<Radio sx={{ color: '#66BB6A', '&.Mui-checked': { color: '#66BB6A' } }} />} 
                label="COD" 
            />
            <FormControlLabel 
                sx={{ 
                    backgroundColor: selectedPaymentMethod === 'paypal' ? '#66BB6A' : '', 
                    color: selectedPaymentMethod === 'paypal' ? '#fff' : '' 
                }} 
                value="paypal" 
                control={<Radio sx={{ color: '#66BB6A', '&.Mui-checked': { color: '#66BB6A' } }} />} 
                label="Paypal" 
            />
        </RadioGroup>
    </FormControl>

    <Grid container spacing={2} mt={{ xs: 2, md: 0 }}>
        {selectedPaymentMethod === 'card' && (
            cards.map(card => (
                <Grid key={card.id} item xs={12} sm={6} md={4}>
                    <PaymentCard cardId={card.id} cardName={card.name} cardNumber={card.number} selectedCard={selectedCard} setSelectedCard={setSelectedCard} handleCardClick={handleCardClick} />
                </Grid>
            ))
        )}
        {selectedPaymentMethod === 'card' && (
            <Grid item xs={12} sm={6} md={4}>
                <Button variant="outlined" color="primary" startIcon={<AddIcon />} onClick={() => setOpenCardDialog(true)}>
                    Add new card
                </Button>
            </Grid>
        )}
    </Grid>

    {selectedPaymentMethod === 'paypal' && (
        <Grid container spacing={2} sx={{display:'flex', flexDirection:'column' ,marginTop:'1%'}}>
            <Grid item xs={12} md={6} sx={{  display:'flex', justifyContent:'flex-start', marginLeft:'-1%'}}>
                <Box >
                    <img style={{ cursor: 'pointer',width:'35%'}} src="paypal.png" alt="" />
                </Box>
            </Grid>
            <Grid item xs={12} md={6} sx={{marginTop:'-2%'}}>
                <Box mt={4}>
                    <Box sx={{ borderLeft: '2px solid #5DAA60', borderBottom: '25px solid #5DAA60', borderTop: '25px solid #5DAA60', borderRight: '2px solid #5DAA60', marginBottom: '40px', padding: '8px 60px', fontWeight: 'bold', width: '100%' }} variant="contained" color="primary">
                        <Typography sx={{ display: 'flex', justifyContent: 'center', fontSize: '20px', color: '#5DAA60', borderBottom: '2px solid #5DAA60' }}>
                            Order Summary
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '20px', color: '#5DAA60', borderBottom: '2px solid #5DAA60' }}>
                            <Typography>Total</Typography>
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
                            <Typography>COD</Typography>
                            <Typography>
                                {COD} EGP
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '20px', color: '#5DAA60', borderBottom: '2px solid #5DAA60' }}>
                            <Typography>Total</Typography>
                            <Typography>
                                {totalCash}
                            </Typography>
                        </Box>
                    </Box>
                    <Box mt={4} sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', margin: '0' }}>
                        <Button onClick={handlePlaceOrder} sx={{ backgroundColor: '#5DAA60', marginBottom: '40px', fontWeight: 'bold', width: '100%', '&:hover': { backgroundColor: '#66BB6A' } }} variant="contained" >
                            Place order
                        </Button>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    )}

    {selectedPaymentMethod === 'cash' && (
        <Grid container spacing={2} sx={{display:'flex', flexDirection:'column'}}>
        <Grid item xs={12} md={6}>
            <Box mt={4}>
                <Box sx={{ borderLeft: '2px solid #5DAA60', borderBottom: '25px solid #5DAA60', borderTop: '25px solid #5DAA60', borderRight: '2px solid #5DAA60', marginBottom: '40px', padding: '8px 60px', fontWeight: 'bold', width: '100%' }} variant="contained" color="primary">
                    <Typography sx={{ display: 'flex', justifyContent: 'center', fontSize: '20px', color: '#5DAA60', borderBottom: '2px solid #5DAA60' }}>
                        Order Summary
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '20px', color: '#5DAA60', borderBottom: '2px solid #5DAA60' }}>
                        <Typography>Total</Typography>
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
                        <Typography>COD</Typography>
                        <Typography>
                            {COD} EGP
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '20px', color: '#5DAA60', borderBottom: '2px solid #5DAA60' }}>
                        <Typography>Total</Typography>
                        <Typography>
                            {totalCash}
                        </Typography>
                    </Box>
                </Box>
                <Box mt={4} sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', margin: '0' }}>
                    <Button onClick={handlePlaceOrder} sx={{ backgroundColor: '#5DAA60', marginBottom: '40px', fontWeight: 'bold', width: '100%', '&:hover': { backgroundColor: '#66BB6A' } }} variant="contained" >
                        Place order
                    </Button>
                </Box>
            </Box>
        </Grid>
    </Grid>
    )}

    {selectedPaymentMethod === 'card' && (
        <Grid container spacing={2} sx={{display:'flex', flexDirection:'column', marginTop:'2%'}}>
            <Grid item xs={12} md={6} >
                <Box sx={{ borderLeft: '2px solid #5DAA60', borderBottom: '25px solid #5DAA60', borderTop: '25px solid #5DAA60', borderRight: '2px solid #5DAA60', padding: '8px 60px', fontWeight: 'bold', width: '100%' }} variant="contained" color="primary">
                    <Typography sx={{ display: 'flex', justifyContent: 'center', fontSize: '20px', color: '#5DAA60', borderBottom: '2px solid #5DAA60' }}>
                        Order Summary
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '20px', color: '#5DAA60', borderBottom: '2px solid #5DAA60' }}>
                        <Typography>Total</Typography>
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
                            {total}
                        </Typography>
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={12} md={6}>
                <Box mt={4}>
                    <Button onClick={handlePlaceOrder} sx={{ backgroundColor: '#5DAA60', fontWeight: 'bold', width: '100%', '&:hover': { backgroundColor: '#66BB6A' } }} variant="contained" >
                        Place order
                    </Button>
                </Box>
            </Grid>
        </Grid>
    )}
</Box>

            </Box>

            {/* Delete Confirmation Dialog */}
<Dialog open={openDeleteDialog} onClose={handleDeleteDialogClose} maxWidth="xs" fullWidth>
    <DialogTitle>Confirm Delete</DialogTitle>
    <DialogContent>
        <DialogContentText>
            Are you sure you want to delete this item from the cart?
        </DialogContentText>
    </DialogContent>
    <DialogActions>
        <Button onClick={handleDeleteDialogClose} color="primary">
            Cancel
        </Button>
        <Button onClick={confirmDelete} color="secondary">
            Delete
        </Button>
    </DialogActions>
</Dialog>

{/* Add Address Dialog */}
<Dialog open={openAddressDialog} onClose={handleAddressDialogClose} maxWidth="xs" fullWidth>
    <DialogTitle>Add New Address</DialogTitle>
    <DialogContent>
        <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
        />
        <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
        />
        <TextField
            autoFocus
            margin="dense"
            label="New Address"
            type="text"
            fullWidth
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
        />
    </DialogContent>
    <DialogActions>
        <Button onClick={handleAddressDialogClose} color="primary">
            Cancel
        </Button>
        <Button onClick={handleAddAddress} color="primary">
            Add
        </Button>
    </DialogActions>
</Dialog>

{/* Add Card Dialog */}
<Dialog open={openCardDialog} onClose={handleCardDialogClose} maxWidth="xs" fullWidth>
    <DialogTitle>Add New Card</DialogTitle>
    <DialogContent>
        <TextField
            autoFocus
            margin="dense"
            label="Name on Card"
            type="text"
            fullWidth
            value={newCard.name}
            onChange={(e) => setNewCard({ ...newCard, name: e.target.value })}
        />
        <TextField
            margin="dense"
            label="Card Number"
            type="text"
            fullWidth
            value={newCard.number}
            onChange={(e) => setNewCard({ ...newCard, number: e.target.value })}
        />
        <TextField
            margin="dense"
            label="CVV"
            type="text"
            fullWidth
            value={newCard.cvv}
            onChange={(e) => setNewCard({ ...newCard, cvv: e.target.value })}
        />
    </DialogContent>
    <DialogActions>
        <Button onClick={handleCardDialogClose} color="primary">
            Cancel
        </Button>
        <Button onClick={handleAddCard} color="primary">
            Add
        </Button>
    </DialogActions>
</Dialog>

        </Container>
    );
};

export default PlaceOrder;
