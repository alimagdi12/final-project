import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const PaymentContext = createContext();

const PaymentProvider = ({ children }) => {
    const handlePaymentClick = async (name, price) => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const data = { productName: name, totalPrice: price };

                // Logging data to verify it's correct and has no circular references
                console.log('Data to be sent:', data);

                const response = await axios.post(
                    "http://localhost:3000/api/v1/auth/payment",
                    data,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            jwt: token,
                        },
                    }
                );

                console.log('Payment response:', response.data);

                if (response.data && response.data.result) {
                    // Redirecting to the Stripe checkout URL
                    window.location.href = response.data.result;
                } else {
                    toast.error('Payment failed. Please try again.');
                }
            } catch (error) {
                console.error("Error updating Payment:", error);
                if (error.response) {
                    console.error('Response data:', error.response.data);
                    console.error('Response status:', error.response.status);
                    console.error('Response headers:', error.response.headers);
                } else if (error.request) {
                    console.error('Request data:', error.request);
                } else {
                    console.error('Error message:', error.message);
                }
                toast.error('An error occurred while processing the payment.');
            }
        } else {
            toast.error('You must login first');
        }
    };

    return (
        <PaymentContext.Provider value={{ handlePaymentClick }}>
            {children}
        </PaymentContext.Provider>
    );
};

export default PaymentProvider;
