import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

    useEffect(() => {
      setToken(localStorage.getItem('token'))
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token'); // Ensure the token is stored in localStorage

                if (!token) {
                    throw new Error('JWT token not found');
                }

                const response = await axios.get('http://localhost:3000/api/v1/auth/get-user', {
                    headers: {
                      'Content-Type': 'multipart/form-data',
                      'jwt': localStorage.getItem('token') // Use Bearer token format
                    }
                });
                setUserData(response.data);
                console.log(response);
            } catch (err) {
                console.error('Error fetching user data:', err);
            }
        };

        fetchUserData();
    }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }


  return (
    <UserContext.Provider value={{ token, setToken, userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
