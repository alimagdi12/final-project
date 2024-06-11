import React, { createContext, useEffect, useState, useContext } from 'react';
import axios from 'axios';
import UserContext from './UserContext';
import { toast } from 'react-toastify';

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);
   
const {token} = useContext(UserContext)
    useEffect(() => {
        
            getOrder();
       

    }, []);

    const getOrder = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:3000/api/v1/auth/user-orders', {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'jwt': localStorage.getItem('token')
                }
            });
            setOrders(response.data.orders);
            // console.log(Orders);

        } catch (err) {
            console.error(err);
            alert('Failed to fetch Order items');
        }
    };

   

    return (
        <OrderContext.Provider value={{ setOrders,orders }}>
            {children}
        </OrderContext.Provider>
    );
};
