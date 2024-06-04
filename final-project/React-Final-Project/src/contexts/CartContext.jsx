import React, { createContext, useEffect, useState, useContext } from 'react';
import axios from 'axios';
import UserContext from './UserContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const  token  = localStorage.getItem('token')

    useEffect(() => {
        if (token) {
            getCart();
        }
        
    }, []);

    const getCart = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:3000/api/v1/auth/cart', {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'jwt': token
                }
            });
            setCartItems(response.data.cart);
   
        } catch (err) {
            console.error(err);
           alert('Failed to fetch cart items');
        }
    };

    const addToCart = (item) => {
        setCartItems(prevItems => [...prevItems, item]);
    };

    const updateCartItemQuantity = (id, quantity) => {
        setCartItems(prevItems =>
            prevItems.map(item => (item.id === id ? { ...item, quantity } : item))
        );
    };

    const totalItems = 0

    return (
        <CartContext.Provider value={{ cartItems, addToCart, updateCartItemQuantity, totalItems, setCartItems , getCart }}>
            {children}
        </CartContext.Provider>
    );
};
