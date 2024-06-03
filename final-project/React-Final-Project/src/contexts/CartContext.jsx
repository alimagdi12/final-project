import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([
        { id: 1, name: 'Smart watch', color: 'White', size: 'L', price: 300, quantity: 1, image: '../../public/watch.jpg',tax:'50',cod:'70' },
        { id: 2, name: 'Shoes', color: 'Black', size: 'L', price: 600, quantity: 2, image: '../../public/shoes.jpg',tax:'50',cod:'70' }
    ]);

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const addToCart = (item) => {
        setCartItems(prevItems => [...prevItems, item]);
    };

    const updateCartItemQuantity = (id, quantity) => {
        setCartItems(prevItems =>
            prevItems.map(item => (item.id === id ? { ...item, quantity } : item))
        );
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, updateCartItemQuantity, totalItems, setCartItems }}>
            {children}
        </CartContext.Provider>
    );
};