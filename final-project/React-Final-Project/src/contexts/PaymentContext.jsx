import React, { createContext, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const PaymentContext = createContext();

const PaymentProvider = ({ children }) => {

    const handlePaymentClick = async (Pname, price) => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('You must log in first');
            return;
        }
    
        try {
            const data = { name: Pname, totalPrice: price };
    
            console.log('Sending request with data:', data);
    
            const response = await axios.post(
                "http://localhost:3000/api/v1/auth/payment",
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "jwt": token,
                    },
                }
            );
    
            console.log('Response:', response);
    
            if (response.data && response.data.result) {
                // Redirecting to the Stripe checkout URL
                window.location.href = response.data.result;
            } else {
                toast.error('Payment failed. Please try again.');
            }
        } catch (error) {
            console.error("Error updating Payment:", error);
            toast.error('An error occurred while processing the payment.');
        }
    };
    
    return (
        <PaymentContext.Provider value={{ handlePaymentClick }}>
            {children}
        </PaymentContext.Provider>
    );
};

export default PaymentProvider;
