import React, { useContext, useState } from 'react';
import { Box, Container, TextField, Typography } from '@mui/material';
import CustomSelect from '../../components/CustomSelect';
import ScheduleListing from '../../components/ScheduleListing';
import CategoryContext from '../../contexts/CategoriesContext';
import UserContext from '../../contexts/UserContext';
import axios from 'axios';

export default function AddProduct() {
    const { categories } = useContext(CategoryContext);
    const { token } = useContext(UserContext);
    const catgs = categories?.categories?.map(({ _id, title }) => ({ value: _id, label: title })) || [];
    
    
    const [formData, setFormData] = useState({
        title: '',
        name: '',
        location: '',
        images: [],
        quantity: '',
        productStatus: '',
        categoryId: '',
        price: '',
        userId: '6643d585dd8c6b0c1065f2b5',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setFormData({
            ...formData,
            images: files
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const productForm = new FormData();
        productForm.append('title', formData.title);
        productForm.append('categoryId', formData.categoryId);
        productForm.append('quantity', '33');
        productForm.append('location', formData.location);
        productForm.append('price', formData.price);
        productForm.append('productStatus', formData.productStatus);
        formData.images.forEach((image) => {
            productForm.append('images', image); 
        });

        try {
            await axios.post('http://127.0.0.1:3000/api/v1/products/add-product', productForm, { 
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'jwt': localStorage.getItem('token')
                }
            });

            setFormData({
                title: '',
                name: '',
                location: '',
                images: [],
                quantity: '',
                productStatus: '',
                categoryId: '',
                price: '',
                userId: '6643d585dd8c6b0c1065f2b5',
            });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Container>
            <input type="file" name="images" multiple onChange={handleImageChange} required />

            <form onSubmit={handleSubmit}>
                <Typography variant="h6">Title</Typography>
                <Box>
                    <Typography>Item Title 1</Typography>
                    <TextField
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                    />
                </Box>
                <Box>
                    <Typography>price</Typography>
                    <TextField
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                    />
                </Box>
                <Box>
                    <Typography>Location</Typography>
                    <TextField
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        multiline
                        rows={6}
                    />
                </Box>
                <Box>
                    <Typography>Status</Typography>
                    <CustomSelect
                        name="productStatus"
                        value={formData.productStatus}
                        onChange={handleChange}
                        options={[
                            { value: 'used', label: 'used' },
                            { value: 'new', label: 'new' },
                        ]}
                    />
                </Box>
                <Box>
                    <Typography>Category</Typography>
                    <Box>
                        <CustomSelect
                            name="categoryId"
                            value={formData.categoryId}
                            onChange={handleChange}
                            options={catgs}
                        />
                    </Box>
                </Box>
                <Box>
                    <Typography>Name</Typography>
                    <TextField
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                    />
                </Box>
                <ScheduleListing />
                <button type="submit">Submit</button>
            </form>
        </Container>
    );
}










































// import React, { useContext, useState } from 'react';
// import { Box, Container, TextField, Typography } from '@mui/material';
// import CustomSelect from '../../components/CustomSelect';
// import ScheduleListing from '../../components/ScheduleListing';
// import CategoryContext from '../../contexts/CategoriesContext';
// import UserContext from '../../contexts/UserContext';
// import axios from 'axios';

// export default function AddProduct() {
//      const { categories } = useContext(CategoryContext);
     
//      const { token } = useContext(UserContext);
//      const catgs = categories?.categories?.map(({ _id, title }) => ({value: _id,label: title })) || []

   
   
//      const [formData, setFormData] = useState({
//         title:'',
//         name:'',
//         location:'',
//         images: [] ,
//         quantity:'',
//         productStatus:'',
//         categoryId:'',
//         price:'',
//         userId:'6651bfd8015aaa6d38869c9a',
//     });
   
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value
//         });
//     };

//     const handleImageChange = (e) => {
//         const files = Array.from(e.target.files);
//         setFormData({
//             ...formData,
//             images: files
//         });
//     };





//     const handleSubmit = async (e) => {
   
   
//         e.preventDefault();
   
//         console.log(formData);
    
//         const productForm = new FormData();
//         productForm.append('title', formData.title);
//         productForm.append('categoryId', formData.categoryId);
//         // productForm.append('subCategoryName', formData.subCategoryName);
//         productForm.append('quantity', formData.quantity);
//         productForm.append('location', formData.location);
//         productForm.append('price', formData.price);
//         formData.images.forEach((image) => {
//             productForm.append('images', image);
//         });

//         try {
//             await axios.post('http://127.0.0.1:3000/api/v1/products/add-product', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                     'jwt': localStorage.getItem('token')
//                 }
//             });
//             alert('Product added successfully');
//             // Reset form after successful submission
//             setFormData({
//                 title: '',
//                 categoryId: '',
//                 quantity: '',
//                 location: '',
//                 price: '',
//                 images: []
//             });
//         } catch (err) {
//             console.error(err);
//             alert('Failed to add product');
//         }
//     };
//     return (
//         <Container>
//      <input type="file" name="images" multiple onChange={handleImageChange} required />

// <Box display={'flex'} width={'100%'} sx={{ alignItems: 'start', padding: '30px', justifyContent: 'center', borderBottom: '2px solid #ccc' }} >
//                     <Box width={'45%'}>
//                         <img src="../public/PlaceholderGlossary.svg" alt="" width={'100%'} />
//                     </Box>
//                     <Box display={'flex'} width={'50%'} >
//                         <img src="../public/PlaceholderGlossary.svg" alt="" width={'50%'} />
//                         <img src="../public/PlaceholderGlossary.svg" alt="" width={'50%'} />
//                     </Box>
//                 </Box>

//             <form onSubmit={handleSubmit}>
//                 <Typography variant="h6">Title</Typography>
//                 <Box>
//                     <Typography>Item Title 1</Typography>
//                     <TextField
//                         name="title"
//                         value={formData.title}
//                         onChange={handleChange}
//                         fullWidth
//                         variant="outlined"
//                     />
//                 </Box>
//                 <Box>
//                     <Typography>price</Typography>
//                     <TextField
//                         name="price"
//                         value={formData.price}
//                         onChange={handleChange}
//                         fullWidth
//                         variant="outlined"
//                     />
//                 </Box>
//                 <Box>
//                     <Typography>Location</Typography>
//                     <TextField
//                         name="location"
//                         value={formData.location}
//                         onChange={handleChange}
//                         fullWidth
//                         variant="outlined"
//                         multiline
//                         rows={6}
//                     />
//                 </Box>
//                 <Box>
//                     <Typography>status</Typography>
//                     <CustomSelect
//                         name="productStatus"
//                         value={formData.productStatus}
//                         onChange={handleChange}
//                         options={[
//                             { value: 'used', label: 'used' },
//                             { value: 'new', label: 'new' },
//                         ]}
//                     />
//                 </Box>
//                 <Box>
//                     <Typography>categoryId</Typography>
//                     <Box>
//                         <CustomSelect
//                             name="categoryId"
//                             value={formData.categoryId}
//                             onChange={handleChange}
//                             options={catgs}
//                         />
//                         <CustomSelect
//                             name={"quantity"}
//                             value={formData.quantity}
//                             onChange={handleChange}
//                             options={[
//                                 { value: '', label: 'None' },
//                                 { value: 1, label: 'Option 1' },
//                                 { value: 2, label: 'Option 2' },
//                                 { value: 3, label: 'Option 3' },
//                                 { value: 4, label: 'Option 4' },
//                             ]}
//                         />
//                     </Box>
//                 </Box>
//                 <Box>
//                     <Typography>name</Typography>
//                     <TextField
//                         name="name"
//                         value={formData.name}
//                         onChange={handleChange}
//                         fullWidth
//                         variant="outlined"
//                     />
//                 </Box>
//                 <ScheduleListing />
//                 <button type="submit">Submit</button>
//             </form>
//         </Container>
//     );
// }