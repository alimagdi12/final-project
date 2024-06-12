import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
  const [token, setToken] = useState('');
  const [PostsData, setPostsData] = useState(null);
  const [error, setError] = useState(null);
  const fetchPostsData = async () => {
    try {
        const token = localStorage.getItem('token'); // Ensure the token is stored in localStorage

        if (!token) {
            throw new Error('JWT token not found');
        }

        const response = await axios.get('http://localhost:3000/api/v1/auth/blogs', {
            headers: {
              'Content-Type': 'multipart/form-data',
              'jwt': localStorage.getItem('token') // Use Bearer token format
            }
        });
        setPostsData(response.data);
        console.log(response.data);
      } catch (err) {
        console.error('Error fetching Posts data:', err);
    }
};

    useEffect(() => {
      setToken(localStorage.getItem('token'))
       
         fetchPostsData();
        
    }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }


  return (
    <PostsContext.Provider value={{ token, setToken, PostsData, setPostsData , fetchPostsData }}>
      {children}
    </PostsContext.Provider>
  );
};

export default PostsContext;
