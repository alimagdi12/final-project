// src/AddPost.jsx
import React, { useContext, useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import UserContext from '../../../contexts/UserContext';
import axios from 'axios';
import PostsContext from '../../../contexts/PostsContext';
import ColorContext from '../../../contexts/ColorContext';
import { FaPen } from 'react-icons/fa';
const AddPost = ({ addPost }) => {
    const {PostsData} = useContext(PostsContext)
    const {userData}= useContext(UserContext)
    const [open, setOpen] = useState(false);
    const [postContent, setPostContent] = useState('');
    const [postTitle, setPostTitle] = useState('');
    const [imageFile, setImageFile] = useState([]);
    const [imagePreview, setImagePreview] = useState('');
    const {color} = useContext(ColorContext)
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setPostContent('');
        setImageFile(null);
        setImagePreview('');
    };

    const handleImageChange = (e) => {
       
            const files = Array.from(e.target.files);
            setImageFile({
                ...imageFile,
                images: files
            });
        };
    
    

    const handleSubmit = async(e) => {
        console.log(imageFile);
        e.preventDefault();
        const productForm = new FormData();
        productForm.append('title', postTitle);
        productForm.append('content',postContent);
        productForm.append('author', userData._id);
        imageFile.images.forEach((image) => {
            productForm.append('images', image);
        }); 
        console.log(productForm);
        try {
            const response = await axios.post('http://127.0.0.1:3000/api/v1/auth/blogs', productForm, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'jwt': localStorage.getItem('token')
                }
            });
            console.log(response);
            setFormData({
                title: '',
                name: '',
                location: '',
                images: [],
                quantity: '',
                productStatus: '',
                categoryId: '',
                price: '',
                folderName: '',
                userId: '6643d585dd8c6b0c1065f2b5',
            });
            navigate('/products')
            window.location.reload();
        } catch (err) {
            console.error('Error adding product:', err.response ? err.response.data : err);
        }
    };

    return (
        <div>
            <Box  sx={{backgroundColor:color ,height:'6vh' , color:'white' , width:'100%' , padding:3 ,  display:'flex' , alignItems:'center' , borderRadius:'10px'}} onClick={handleClickOpen}>
            <FaPen className="pen-icon" style={{}} />
            </Box>
            <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogTitle>Add a New Post</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <TextField
                            label="Post Content"
                            value={postContent}
                            onChange={(e) => setPostContent(e.target.value)}
                            fullWidth
                            required
                        />
                         <TextField
                            label="Post Content"
                            value={postTitle}
                            onChange={(e) => setPostTitle(e.target.value)}
                            fullWidth
                            required
                        />
                       <input
                        type="file"
                        name="upload-file"
                        id="upload-file"
                        multiple
                        onChange={handleImageChange}
                       style={{display:'none'}}
                        required
                    />
                        <label htmlFor="upload-file">
                            <Button sx={{backgroundColor:color , color:'white'}} component="span">
                                Upload Image
                            </Button>
                        </label>
                        {imagePreview && (
                            <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', height: 'auto' }} />
                        )}
                        <Button type="submit"  sx={{backgroundColor:color , color:'white'}}>Add Post</Button>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} sx={{backgroundColor:color , color:'white'}}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AddPost;
