// src/PostsPage.jsx
import React, { useContext, useState } from 'react';
import Post from './components/post';
import AddPost from './components/AddPost';
import PostsContext from '../../contexts/PostsContext';
import { Box, Container } from '@mui/material';

import ColorContext from "../../contexts/ColorContext";
const initialPostsData = [
    {
        id: 1,
        content: "This is the first post",
        imageUrl: "https://example.com/image1.jpg",
        comments: [
            { id: 1, text: "First comment on the first post" },
            { id: 2, text: "Second comment on the first post" }
        ]
    },
    {
        id: 2,
        content: "This is the second post",
        imageUrl: "https://example.com/image2.jpg",
        comments: [
            { id: 1, text: "First comment on the second post" }
        ]
    }
];

const PostsPage = () => {
    const {color} = useContext(ColorContext)
    const [posts, setPosts] = useState(initialPostsData);
const {PostsData} = useContext(PostsContext)
    const addPost = (newPost) => {
        newPost.id = posts.length + 1;
        setPosts([...posts, newPost]);
    };

    return (
        <Box sx={{backgroundColor:'#fff' , padding:0}}>
        <Box sx={{width:'99%', margin:'auto', padding:3}}>
           <Box sx={{display:'flex',width:'50%', margin:'auto', alignItems:'center' ,  justifyContent:'space-between'}}>

            <h1  style={{color:color}}>Posts</h1>
            <AddPost addPost={addPost} />
           </Box>
            {/* <Box display={'flex'} sx={{display:'flex', width:'100%'}}> */}
            {PostsData?.map(post => (

                   <Post key={post.id} post={post} />
                   ))}
                {/* </Box> */}
        </Box>
        </Box>
    );
};

export default PostsPage;
