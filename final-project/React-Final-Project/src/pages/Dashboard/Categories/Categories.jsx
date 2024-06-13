import React, { useContext, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Fab,
  TextField,
  Button,
  styled,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Delete, Add as AddIcon } from "@mui/icons-material";
import AutoDeleteIcon from "@mui/icons-material/AutoDelete";
import EditIcon from "@mui/icons-material/Edit";
import CategoryContext from "../../../contexts/CategoriesContext";
import axios from "axios";
import ColorContext from "../../../contexts/ColorContext";

const initialCategories = [
  { id: "1", name: "Electronics", image: "../../../../public/electronics.jpg" },
  { id: "2", name: "Clothing", image: "../../../../public/clothing.jpg" },
  {
    id: "3",
    name: "Home & Kitchen",
    image: "../../../../public/home-kitchen.jpg",
  },
];

const GradientButton = styled(Button)({
  background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  border: 0,
  borderRadius: 3,
  boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  color: "white",
  height: 48,
  padding: "0 30px",
  "&:hover": {
    background: "linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)",
  },
});

const Categories = () => {
  const { categories, fetchCategories } = useContext(CategoryContext);
    const {color , lightColor} = useContext(ColorContext)
  const [dialogOpen, setDialogOpen] = useState(false);
  const [updatedCategory, setUpdatedCategory] = useState({});
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryImage, setNewCategoryImage] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const handleDelete = async (id) => {
    // const updatedCategories = categories.filter(category => category.id !== id);
    console.log(id);
    try {
      const response = await axios.delete(
        `http://127.0.0.1:3000/api/v1/admin//delete-category/${id}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            jwt: localStorage.getItem("token"),
          },
        }
      );
      console.log(response);
      fetchCategories();
    } catch (err) {
      console.error(
        "Error adding product:",
        err.response ? err.response.data : err
      );
    }
  };

  const handleEditClick = (category) => {
    setUpdatedCategory(category);
    setDialogOpen(true);
  };

  const handleClose = () => {
    // console.log(updatedCategory);
    setDialogOpen(false);
    setIsAdding(false)
    // setUpdatedCategory(null);
    setNewCategoryName("");
    setNewCategoryImage("");
  };

  const handleUpdate = async (id) => {
    setIsAdding(false)
    console.log(newCategoryImage);
    const updateForm = new FormData();
    updateForm.append("id", updatedCategory._id);
    updateForm.append("title", newCategoryName);
    updateForm.append("images", newCategoryImage);
    try {
      const response = await axios.post(
        "http://127.0.0.1:3000/api/v1/admin/edit-category",
        updateForm,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            jwt: localStorage.getItem("token"),
          },
        }
      );
      console.log(response);
    } catch (err) {
      console.error(
        "Error adding product:",
        err.response ? err.response.data : err
      );
    }
  };

  const handleAdd = () => {
    setIsAdding(true);
    setDialogOpen(true);
  };

  const handleAddCategory = async() => {
    // setIsAdding(false)
    const addForm = new FormData();
    // addForm.append("id", updatedCategory._id);
    addForm.append("title", newCategoryName);
    addForm.append("images", newCategoryImage);

    console.log(addForm);
    try {
      const response = await axios.post(
        "http://127.0.0.1:3000/api/v1/admin/add-category",
        addForm,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            jwt: localStorage.getItem("token"),
          },
        }
      );
      console.log(response);
    } catch (err) {
      console.error(
        "Error adding product:",
        err.response ? err.response.data : err
      );
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
  
    };
    if (file) {
      reader.readAsDataURL(file);
    }
    setNewCategoryImage(file);
  };

  return (
    <Box
      sx={{
        height: "auto",
        flexGrow: 1,
        padding: "16px",
        backgroundColor: "#fff",
        color: "#fff",
      }}
    >
      <Typography variant="h5" gutterBottom sx={{ color: "#fff" }}>
        Top Categories
      </Typography>
      <Grid container spacing={2}>
        {categories.categories.map((category) => (
          <Grid item xs={12} sm={6} md={4} key={category.id}>
            <Card sx={{ backgroundColor: "#fff",padding:'5px' ,border:`1px solid ${color}`, color: color }}>
              <CardMedia
                component="img"
                height="140"
                image={category.imageUrl.images[0]}
                alt={category.title}
              />
              <CardContent>
                <Typography variant="h6">{category.title}</Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "8px",
                  }}
                >
                  <IconButton
                    onClick={() => handleDelete(category._id)}
                    color="error"
                  >
                    <AutoDeleteIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleEditClick(category)}
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={dialogOpen}
        onClose={handleClose}
        PaperProps={{ sx: { backgroundColor: "#333340", color: "#fff" } }}
      >
        <DialogTitle>
          {isAdding ? "Add New Category" : "Edit Category"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Category Name"
            value={
              isAdding
                ? newCategoryName
                : updatedCategory
                ? updatedCategory.name
                : ""
            }
            onChange={(e) => setNewCategoryName(e.target.value)}
            variant="outlined"
            fullWidth
            sx={{ marginY: "8px", input: { color: "#fff" } }}
            InputLabelProps={{ style: { color: "#fff" } }}
          />
          <TextField
            type="file"
            onChange={handleFileChange}
            variant="outlined"
            fullWidth
            sx={{ marginBottom: "8px", input: { color: "#fff" } }}
            InputLabelProps={{ style: { color: "#fff" } }}
          />
        </DialogContent>
        <DialogActions>
          <GradientButton
            variant="contained"
            onClick={isAdding ? handleAddCategory : handleUpdate}
          >
            {isAdding ? "Add" : "Save"}
          </GradientButton>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {!isAdding && (
        <Fab
          color="primary"
          aria-label="add"
          sx={{
            height: "6%",
            width: "3%",
            position: "fixed",
            top: 139,
            right: 16,
            background: `linear-gradient(45deg, ${color} 30%, ${lightColor} 70%)`,
          }}
          onClick={handleAdd}
        >
          <AddIcon />
        </Fab>
      )}
    </Box>
  );
};

export default Categories;
