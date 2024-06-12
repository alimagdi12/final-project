// src/Post.jsx
import React, { useContext, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import UserContext from '../../../contexts/UserContext';
import axios from 'axios';
import ColorContext from '../../../contexts/ColorContext';
const Post = ({ post }) => {
    const {userData} = useContext(UserContext)
    const [commentText, setCommentText] = useState("");
    const [comments, setComments] = useState([]);
    const [open, setOpen] = useState(false);
const {color} = useContext(ColorContext)
    const handleCommentChange = (e) => {
        setCommentText(e.target.value);
    };

    const handleCommentSubmit = async (e,id) => {
       console.log(post);
       
        const comment = {userId:userData._id , content:commentText}

       try {
        const response = await axios.post(`http://127.0.0.1:3000/api/v1/auth//blogs/${post._id}/comments`, comment, {
            headers: {
                'Content-Type': 'application/json',
                'jwt': localStorage.getItem('token')
            }
        });
   console.log(response);
        
    } catch (err) {
        console.error('Error adding product:', err.response ? err.response.data : err);
    }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
console.log(post);
    return (
        <div style={{ border: `2px solid ${color}`, borderRadius:'5px', width:'50%', padding: '10px', margin: '20px auto ' , backgroundColor:'#efeae2 ' }}>
            
            {post?.imagesUrl?.images[0] && (
                <div style={{ backgroundColor:'efeae2'}}>
                    <img src={post.imagesUrl.images[0]} alt="Post" style={{ maxWidth: '100%', height: 'auto' }} />
                </div>
            )}
            <p>{post?.content}</p>
            <Button sx={{backgroundColor:color , color:'white'}} onClick={handleClickOpen}>
                Show Comments
            </Button>
            <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogTitle>Comments</DialogTitle>
                <DialogContent>
                    {post?.comments?.map(comment => (
                        <p key={comment.id}>{comment.content}</p>
                    ))}
                    <form  style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <TextField
                            label="Write a comment..."
                            value={commentText}
                            onChange={handleCommentChange}
                            fullWidth
                            required
                        />
                        <Button  sx={{backgroundColor:color , color:'white'}} onClick={()=>{handleCommentSubmit(post)}}  variant="contained">Comment</Button>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}  sx={{backgroundColor:color , color:'white'}} >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Post;
