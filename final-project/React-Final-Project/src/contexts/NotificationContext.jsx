import React, { createContext, useState, useEffect } from 'react';

// Create the NotificationContext
const NotificationContext = createContext();

// NotificationProvider component to wrap around parts of the app that need access to the notifications
const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  // Function to fetch notifications
  // Function to fetch notifications
// Function to fetch notifications
const fetchNotifications = async () => {
    try {
      // Retrieve token from local storage  
      const response = await fetch('http://127.0.0.1:3000/api/v1/auth/get-notification', {
        headers: {
            'Content-Type': 'multipart/form-data',
            'jwt': localStorage.getItem('token')
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch notifications');
      }
  
      const data = await response.json();
      console.log('this is notification',data.result);
      setNotifications(data.result);
    } catch (error) {
      console.error(error);
    }
  };
    

  // Use useEffect to fetch notifications when the component mounts
  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications, fetchNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};

export { NotificationContext, NotificationProvider };
