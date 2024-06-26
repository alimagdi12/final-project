import React, { useContext, useState } from 'react';
import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ColorContext from '../../contexts/ColorContext';

export default function AddProduct() {
    const { color } = useContext(ColorContext);
    const navigate = useNavigate();

    const initialFormData = {
        title: '',
        location: '',
        images: [],
        quantity: '',
        productStatus: '',
        categoryId: '',
        price: '',
        folderName: '',
        userId: '6643d585dd8c6b0c1065f2b5',
    };

    const [formData, setFormData] = useState(initialFormData);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        validateField(name, value);
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setFormData({
            ...formData,
            images: files,
        });
    };

    // const validateField = (name, value) => {
    //     let error = '';
    //     switch (name) {
    //         case 'title':
    //             error = value.trim() ? '' : 'Title is required';
    //             break;
    //         case 'location':
    //             error = value.trim() ? '' : 'Location is required';
    //             break;
    //         case 'quantity':
    //             error = value.trim() ? '' : 'Quantity is required';
    //             break;
    //         case 'productStatus':
    //             error = value.trim() ? '' : 'Product Status is required';
    //             break;
    //         case 'categoryId':
    //             error = value.trim() ? '' : 'Category is required';
    //             break;
    //         case 'price':
    //             error = value.trim() ? '' : 'Price is required';
    //             break;
    //         case 'folderName':
    //             error = value.trim() ? '' : 'Folder Name is required';
    //             break;
    //         default:
    //             break;
    //     }
    //     setFormErrors({
    //         ...formErrors,
    //         [name]: error,
    //     });
    // };

    // const validateForm = () => {
    //     const newErrors = {};
    //     let valid = true;

    //     Object.keys(formData).forEach((key) => {
    //         validateField(key, formData[key]);
    //         if (formErrors[key]) {
    //             valid = false;
    //             newErrors[key] = formErrors[key];
    //         }
    //     });

    //     setFormErrors(newErrors);
    //     return valid;
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (validateForm()) {
            const productForm = new FormData();
            productForm.append('title', formData.title);
            productForm.append('categoryId', formData.categoryId);
            productForm.append('quantity', formData.quantity);
            productForm.append('location', formData.location);
            productForm.append('price', formData.price);
            productForm.append('productStatus', formData.productStatus);
            productForm.append('folderName', formData.folderName);
            productForm.append('userId', formData.userId);
            formData.images.forEach((image) => {
                productForm.append('images', image);
            });

            try {
                const response = await axios.post('http://127.0.0.1:3000/api/v1/products/add-product', productForm, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'jwt': localStorage.getItem('token'),
                    },
                });
                (response);
                setFormData(initialFormData);
                navigate('/products');
                window.location.reload();
            } catch (err) {
                console.error('Error adding product:', err.response ? err.response.data : err);
            } finally {
                setIsSubmitting(false);
            }
        } else {
            setIsSubmitting(false);
        }
    };

    const errorStyle = {
        color: "red",
        fontSize: "12px",
        marginTop: "-10px",
        marginBottom: "10px",
    };

    const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let errorMsg = "";
    switch (name) {
      case "firstName":
        if (!value) errorMsg = "First Name is required";
        break;
      case "lastName":
        if (!value) errorMsg = "Last Name is required";
        break;
      case "email":
        if (!value) {
          errorMsg = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          errorMsg = "Email is invalid";
        }
        break;
      case "phoneNumber":
        if (!value) {
          errorMsg = "Phone Number is required";
        } else if (!/^\d{11}$/.test(value)) {
          errorMsg = "Phone Number is invalid";
        }
        break;
      case "password":
        if (!value) errorMsg = "Password is required";
        break;
      case "confirmPassword":
        if (!value) {
          errorMsg = "Confirm Password is required";
        } else if (value !== productForm.password) {
          errorMsg = "Passwords do not match";
        }
        break;
      case "birthDay":
        if (!value) {
          errorMsg = "Birthday is required";
        }  else {
          const selectedDate = new Date(value);
          const maxDate = new Date("2018-12-31");
          if (selectedDate > maxDate) {
            errorMsg = "Birthday cannot be later than 2018";
          }
        }
        break;
      default:
        break;
    }
    return errorMsg;
  };

    return (
        <Container style={{ marginBottom: '5%' }}>
            <form onSubmit={handleSubmit}>
                <label style={{ display: "flex", justifyContent: 'flex-start', alignItems: 'center' }}>
                    <img
                        src={'../../public/otp_icon_upload.gif'}
                        alt="Upload Photo"
                        style={{ cursor: 'pointer', width: '30%' }}
                    />
                    <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>Upload Images</Typography>
                    <input
                        type="file"
                        name="images"
                        multiple
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                        required
                    />
                </label>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6">Title</Typography>
                        <TextField
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                            error={!!formErrors.title}
                            helperText={formErrors.title}
                            disabled={isSubmitting}
                            sx={{ mt: 1 }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6">Price</Typography>
                        <TextField
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                            error={!!formErrors.price}
                            helperText={formErrors.price}
                            disabled={isSubmitting}
                            sx={{ mt: 1 }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6">Quantity</Typography>
                        <TextField
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                            multiline
                            error={!!formErrors.quantity}
                            helperText={formErrors.quantity}
                            disabled={isSubmitting}
                            sx={{ mt: 1 }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6">Folder Name</Typography>
                        <TextField
                            name="folderName"
                            value={formData.folderName}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                            error={!!formErrors.folderName}
                            helperText={formErrors.folderName}
                            disabled={isSubmitting}
                            sx={{ mt: 1 }}
                        />
                    </Grid>
                    <Grid sx={{ display: 'flex', paddingTop: '16px', '@media(max-width:600px)':{
                        flexDirection: 'column',
                    } }} xs={12} sm={12}>
                        <Grid item xs={12} sm={6} sx={{ paddingLeft: '16px' }}>
                            <Typography variant="h6">Location</Typography>
                            <TextField
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                fullWidth
                                variant="outlined"
                                multiline
                                rows={6}
                                error={!!formErrors.location}
                                helperText={formErrors.location}
                                disabled={isSubmitting}
                                sx={{ mt: 1 }}
                            />
                        </Grid>
                        <Grid sx={{ display: 'flex', flexDirection: 'column', width: '50%' , '@media(max-width:600px)':{
                            width: '100%',
                        }}}>
                            <Grid xs={12} md={12} sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                <Grid item xs={12} sm={2} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                                    <Typography variant="h6">Status</Typography>
                                    <TextField
                                        width={130}
                                        name="productStatus"
                                        value={formData.productStatus}
                                        onChange={handleChange}
                                        error={!!formErrors.productStatus}
                                        helperText={formErrors.productStatus}
                                        disabled={isSubmitting}
                                        sx={{ mt: 1 }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={2} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <Typography variant="h6">Category</Typography>
                                    <TextField
                                        width={130}
                                        name="categoryId"
                                        value={formData.categoryId}
                                        onChange={handleChange}
                                        error={!!formErrors.categoryId}
                                        helperText={formErrors.categoryId}
                                        disabled={isSubmitting}
                                        sx={{ mt: 1 }}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{
                                        width:'60%',
                                        backgroundColor: color,
                                        color: '#ffffff',
                                        '&:hover': {
                                            backgroundColor: '#fff',
                                            color: color,
                                            outline: `2px solid ${color}`,
                                        },
                                        '@media (max-width: 600px)': { 
                                            width:'80%'
                                        },
                                        '@media (max-width: 1440px)': { 
                                            width:'60%'
                                        },
                                    }}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Submitting...' : 'Add Auction Product'}
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}
