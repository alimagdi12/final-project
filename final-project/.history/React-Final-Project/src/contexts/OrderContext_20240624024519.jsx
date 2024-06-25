import React, { createContext, useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { CartContext } from './CartContext';
import UserContext from './UserContext';

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);
    const [userOrders, setUserOrders] = useState([]);
    const { token, userData } = useContext(UserContext);
    const { cartItems, totalPrice } = useContext(CartContext);

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
            setOrders(response.data.orders); // Assuming the response contains orders as an array
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
            setUserOrders(response.data.orders); // Assuming the response contains orders as an array
        } catch (err) {
            console.error(err);
            toast.error('Failed to fetch user orders');
        }
    };

    const createOrder = async () => {
        try {
            const items1 = cartItems.map(item => ({
                productId: item.productId,
                quantity: item.quantity
            }));

            const payload = {
                userId: userData._id,
                items: items1,
                totalAmount: totalPrice
            };

            const response = await axios.post('http://127.0.0.1:3000/api/v1/auth/create-order', payload, {
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

    const deleteOrder = async (orderId) => {
        try {
            await axios.delete(`http://127.0.0.1:3000/api/v1/auth/order/${orderId}`, {
                headers: {
                    'jwt': localStorage.getItem('token')
                }
            });
            setOrders(orders.filter(order => order._id !== orderId)); // Update local state after deletion
            toast.success('Order deleted successfully');
        } catch (err) {
            console.error(err);
            toast.error('Failed to delete order');
        }
    };

    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            const response = await axios.put(`http://127.0.0.1:3000/api/v1/auth/order/${orderId}/status`, { status: newStatus }, {
                headers: {
                    'Content-Type': 'application/json',
                    'jwt': localStorage.getItem('token')
                }
            });
            const updatedOrder = response.data.order; // Assuming the response contains the updated order

            // Update local state or context with the updated order status
            setOrders(orders.map(order => order._id === orderId ? updatedOrder : order));

            toast.success('Order status updated successfully');
        } catch (err) {
            console.error(err);
            toast.error('Failed to update order status');
        }
    };

    return (
        <OrderContext.Provider value={{ orders, userOrders, createOrder, deleteOrder, updateOrderStatus }}>
            {children}
        </OrderContext.Provider>
    );
};
