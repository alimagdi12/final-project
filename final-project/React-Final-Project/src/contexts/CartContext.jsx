import React, { createContext, useEffect, useState, useContext } from 'react';
import axios from 'axios';
import UserContext from './UserContext';
import { toast } from 'react-toastify';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
   
const {token} = useContext(UserContext)
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
            console.log(cartItems);

        } catch (err) {
            console.error(err);
            alert('Failed to fetch cart items');
        }
    };

    async function addToCart(productId) {
        const productForm = new FormData();
        productForm.append("productId", productId);
      
   if(token){
       
      
        try {
            const token = localStorage.getItem("token");
            console.log(token);
            const response = await axios.post(
                "http://localhost:3000/api/v1/auth/add-to-cart",
                productForm,
                {
                    headers: {
                        "Content-Type": "application/json",
                        jwt: token,
                    },
                }
            );
            getCart()
        } catch (err) {
            console.error(err);
        }
    
    
   }
   else{
    toast.error('you must login first')
   }
    }

    const updateCartItemQuantity = (id, quantity) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.productId._id === id ? { ...item, quantity } : item
            )
        );
    };

    const totalItems = 0

    return (
        <CartContext.Provider value={{ cartItems, addToCart, updateCartItemQuantity, totalItems, setCartItems, getCart }}>
            {children}
        </CartContext.Provider>
    );
};
