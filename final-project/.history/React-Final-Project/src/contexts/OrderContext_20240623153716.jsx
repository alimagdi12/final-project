import React, { createContext, useEffect, useState, useContext } from 'react';
import axios from 'axios';
import UserContext from './UserContext';
import { toast } from 'react-toastify';
import { CartContext } from './CartContext';

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);
    const [userOrders, setUserOrders] = useState([]);
    const { token, userData } = useContext(UserContext);
    const {cartItems, totalPrice} = useContext(CartContext)

    useEffect(() => {
        getOrder();
        getUserOrders();
    }, []);

    const getOrder = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:3000/api/v1/auth/all-orders', {
                headers: {
                    'jwt': localStorage.getItem('token')
                }
            });
            setOrders(response.data);
        } catch (err) {
            console.error(err);
            toast.error('Failed to fetch all orders');
        }
    };

    const getUserOrders = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:3000/api/v1/auth/user-orders', {
                headers: {
                    'jwt': localStorage.getItem('token')
                }
            });
            setUserOrders(response.data);
        } catch (err) {
            console.error(err);
            toast.error('Failed to fetch user orders');
        }
    };

    const createOrder = async () => {
        try {

            const items = cartItems.map(item => ({
                productId: item.productId, // Assuming item.productId is a string
                quantity: item.quantity
            }));

            const payload = {
                userId: userData._id,
                items:items,
                totalAmount: totalPrice
            };

            const response = await axios.post('http://127.0.0.1:3000/api/v1/orders/create-order', payload, {
                headers: {
                    'Content-Type': 'application/json',
                    'jwt': localStorage.getItem('token')
                }
            });

            getOrder(); // Refresh orders after creating a new one
            toast.success('Order created successfully');
        } catch (err) {
            console.error(err);
            toast.error('Failed to create order');
        }
    };


    return (
        <OrderContext.Provider value={{ orders, userOrders, createOrder, getOrder, getUserOrders }}>
            {children}
        </OrderContext.Provider>
    );
};
