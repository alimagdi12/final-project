import React, { createContext, useEffect, useState, useContext } from 'react';
import axios from 'axios';
import UserContext from './UserContext';
import { toast } from 'react-toastify';

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);
    const [userOrders, setUserOrders] = useState([]);
    const { token } = useContext(UserContext);

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

            const payload = {
                userId: "66612832b0b9ff27dc6e535e",
                productId: "66649650e96c334ae0fee36f",
                quantity: 5,
                totalAmount: 5000
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
        <OrderContext.Provider value={{ orders, userOrders, createOrder }}>
            {children}
        </OrderContext.Provider>
    );
};
