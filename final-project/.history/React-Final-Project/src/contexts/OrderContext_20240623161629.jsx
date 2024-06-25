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

    const createOrder = async (userId, items, totalAmount) => {
        // console.log( items);
        try {

            const items1 = cartItems.map(item => ({
                productId: item.productId,
                quantity: item.quantity
            }));
            // console.log(items1);
            const payload = {
                userId: userData._id,
                items:items1,
                totalAmount: totalPrice
            };

            console.log(payload);

            const response = await axios.post('http://127.0.0.1:3000/api/v1/auth/create-order', payload, {
                headers: {
                    'Content-Type': 'application/json',
                    'jwt': localStorage.getItem('token')
                }
            });

            const newOrder = {
                userId,
                totalAmount,
                items,
            };
            setOrders([...orders, newOrder]);

            getOrder(); // Refresh orders after creating a new one
            toast.success('Order created successfully');
        } catch (err) {
            console.error(err);
            toast.error('Failed to create order');
        }
    };


    return (
        <OrderContext.Provider value={{ orders, userOrders, createOrder, getOrder, getUserOrders, setOrders }}>
            {children}
        </OrderContext.Provider>
    );
};
