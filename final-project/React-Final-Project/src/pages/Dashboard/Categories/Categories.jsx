import React, { useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, CardMedia, IconButton, Fab, TextField, Button, styled, Popover } from '@mui/material';
import { Delete, Add as AddIcon } from '@mui/icons-material';
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';
import EditIcon from '@mui/icons-material/Edit';

const initialCategories = [
    { id: '1', name: 'Electronics', image: '../../../../public/electronics.jpg' },
    { id: '2', name: 'Clothing', image: '../../../../public/clothing.jpg' },
    { id: '3', name: 'Home & Kitchen', image: '../../../../public/home-kitchen.jpg' },
];

const GradientButton = styled(Button)({
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
    '&:hover': {
        background: 'linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)',
    },
});

const Categories = () => {
    const [categories, setCategories] = useState(initialCategories);
    const [anchorEl, setAnchorEl] = useState(null);
    const [updatedCategory, setUpdatedCategory] = useState(null);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [newCategoryImage, setNewCategoryImage] = useState('');
    const [isAdding, setIsAdding] = useState(false);

    const handleDelete = (id) => {
        const updatedCategories = categories.filter(category => category.id !== id);
        setCategories(updatedCategories);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleUpdate = (id, newName) => {
        const updatedCategories = categories.map(category => {
            if (category.id === id) {
                return { ...category, name: newName };
            }
            return category;
        });
        setCategories(updatedCategories);
        setUpdatedCategory(null);
    };

    const handleEditClick = (id) => {
        const categoryToUpdate = categories.find(category => category.id === id);
        setUpdatedCategory(categoryToUpdate);
    };

    const handleAdd = () => {
        setIsAdding(true);
    };

    const handleAddCategory = () => {
        const newId = (Math.random() * 1000).toString(); 
        const newCategory = {
            id: newId,
            name: newCategoryName,
            image: newCategoryImage,
        };
        setCategories([...categories, newCategory]);
        setNewCategoryName('');
        setNewCategoryImage('');
        setIsAdding(false);
    };

    return (
        <Box sx={{height:'auto', flexGrow: 1, padding: '16px', backgroundColor: '#333340', color: '#fff' }}>
            <Typography variant="h5" gutterBottom sx={{ color: '#fff' }}>
                Top Categories
            </Typography>
            <Grid container spacing={2}>
                {categories.map((category, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card sx={{ backgroundColor: '#1F1B24', color: '#fff' }}>
                            <CardMedia
                                component="img"
                                height="140"
                                image={category.image}
                                alt={category.name}
                            />
                            <CardContent>
                                {updatedCategory && updatedCategory.id === category.id ? (
                                    <Box>
                                        <TextField
                                            label="New Name"
                                            defaultValue={category.name}
                                            fullWidth
                                            sx={{ marginBottom: '16px' }}
                                            onChange={(e) => setUpdatedCategory({ ...updatedCategory, name: e.target.value })}
                                        />
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleUpdate(updatedCategory.id, updatedCategory.name)}
                                            sx={{ marginRight: '8px' }}
                                        >
                                            Save
                                        </Button>
                                        <Button
                                            variant="contained"
                                            onClick={() => setUpdatedCategory(null)}
                                        >
                                            Cancel
                                        </Button>
                                    </Box>
                                ) : (
                                    <Box>
                                        <Typography variant="h6">{category.name}</Typography>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                                            <IconButton onClick={() => handleDelete(category.id)} color="error"><AutoDeleteIcon /></IconButton>
                                            <IconButton onClick={() => handleEditClick(category.id)} color="primary"><EditIcon /></IconButton>
                                        </Box>
                                    </Box>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            {isAdding ? (
                <div>
                    <Fab sx={{ height: '6%', width: '3%', position: 'fixed', top: 139, right: 16, background: 'linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)' }} color="primary" aria-label="add" onClick={handleClick}>
                        <AddIcon />
                    </Fab>
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                    >
                        <Box sx={{ padding: '16px', minWidth: '200px' }}>
                            <TextField
                                label="Category Name"
                                value={newCategoryName}
                                onChange={(e) => setNewCategoryName(e.target.value)}
                                variant="outlined"
                                sx={{ marginBottom: '8px' }}
                            />
                            <TextField
                                label="Category Image URL"
                                value={newCategoryImage}
                                onChange={(e) => setNewCategoryImage(e.target.value)}
                                variant="outlined"
                                sx={{ marginBottom: '8px' }}
                            />
                            <GradientButton variant="contained" onClick={handleAddCategory}>
                                Add
                            </GradientButton>
                        </Box>
                    </Popover>
                </div>
            ) : (
                <Fab color="primary" aria-label="add" sx={{ height: '6%', width: '3%', position: 'fixed', top: 139, right: 16, background: 'linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)' }} onClick={handleAdd}>
                    <AddIcon />
                </Fab>
            )}
        </Box>
    );
};

export default Categories;
