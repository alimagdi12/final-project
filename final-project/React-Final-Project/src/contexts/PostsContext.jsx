import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
  const [token, setToken] = useState('');
  const [PostsData, setPostsData] = useState(null);
  const [error, setError] = useState(null);


  const fetchPostsData = async () => {
    try {
      const token = localStorage.getItem('token'); // Ensure the token is stored in localStorage

      // if (!token) {
      //   throw new Error('JWT token not found');
      // }

      const response = await axios.get('http://localhost:3000/api/v1/auth/blogs', {
        headers: {
          'Content-Type': 'multipart/form-data',
          'jwt': token, // Use Bearer token format
        }
      });
      setPostsData(response.data);
      (response.data);
      return await response.data;
    } catch (err) {
      console.error('Error fetching Posts data:', err);
      setError(err.message);
    }
  };

  const deletePost = async (postId) => {
    try {
      const token = localStorage.getItem('token'); // Ensure the token is stored in localStorage

      if (!token) {
        throw new Error('JWT token not found');
      }

      await axios.delete(`http://localhost:3000/api/v1/auth/blogs/${postId}`, {
        headers: {
          'Content-Type': 'application/json',
          'jwt': token, // Use Bearer token format
        }
      });

      // Remove the deleted post from the state
      setPostsData((prevPosts) => prevPosts.filter(post => post.id !== postId));
      fetchPostsData()
      // (`Post ${postId} deleted successfully`);
    } catch (err) {
      console.error('Error deleting post:', err);
      setError(err.message);
    }
  };

  useEffect(() => {
    setToken(localStorage.getItem('token'));
    fetchPostsData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <PostsContext.Provider value={{ token, setToken, PostsData, setPostsData, fetchPostsData, deletePost }}>
      {children}
    </PostsContext.Provider>
  );
};

export default PostsContext;
