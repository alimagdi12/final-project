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
            (orders.orders);
            setOrders(orders.orders.filter(order => order._id !== orderId));
            getOrder();
            toast.success('Order deleted successfully');
        } catch (err) {
            console.error(err);
            toast.error('Failed to delete order');
        }
    };

    const handleStatusChange = async (event) => {
        const newStatus = event.target.value;
        setStatus(newStatus);
    
        const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
        try {
            const response = await fetch(`/api/orders/${order._id}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
                body: JSON.stringify({ status: newStatus }),
            });
            const updatedOrder = await response.json();
    
            if (response.ok) {
                // Update the order status in the local state or context if needed
                ('Order status updated', updatedOrder);
            } else {
                console.error('Failed to update order status', updatedOrder);
            }
        } catch (error) {
            console.error('Error updating order status', error);
        }
    };

    return (
        <OrderContext.Provider value={{ orders, userOrders, createOrder, deleteOrder, updateOrderStatus, getOrder, getUserOrders, setOrders }}>
            {children}
        </OrderContext.Provider>
    );
};
