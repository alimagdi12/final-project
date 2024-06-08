/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import ProductsContext from "../../contexts/ProductsContext";
import CategoryContext from "../../contexts/CategoriesContext";
import AuctionContext from "../../contexts/AuctionContext";
import axios from "axios";
import {
  Box,
  Container,
  FormControlLabel,
  RadioGroup,
  FormControl,
  FormLabel,
  Radio,
  Pagination,
  Button,
} from "@mui/material";
import { CartContext } from "../../contexts/CartContext";
import { useParams } from "react-router-dom";
import ColorContext from "../../contexts/ColorContext";

export default function CategoryProducts() {
    const {color} = useContext(ColorContext)
  const {id} = useParams()
  const [toggle, setToggle] = useState(false);
  const { products } = useContext(ProductsContext);
  const { auction } = useContext(AuctionContext);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [searchCategory, setSearchCategory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 3; // Number of products to display per page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = displayedProducts?.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const { getCart, addToCart } = useContext(CartContext);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    filterByCategory()
    }, [id]);

  function filterByCategory() {
    setSearchCategory(id);
    setCurrentPage(1);
      const dp = products?.products?.filter(
        (product) =>
          product?.categoryId?._id === id 
      );
      setDisplayedProducts(dp);
    setCurrentPage(1);
    console.log();
    console.log(dp);
  }


  return (
    <>
      <Container
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' }, // Flex direction changes based on screen size
          marginTop: '20px',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            width: { xs: '100%', md: '100%' }, // Adjust width for smaller screens
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Buttons and Product Cards */}
          {/* Product Cards */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {/* Product Cards */}
            {toggle
              ? auction?.map((product) => (
                  <ProductCard
                    key={product._id}
                    addToCart={() => {
                      addToCart(product._id);
                      getCart();
                    }}
                    product={product}
                  />
                ))
              : currentProducts?.map((product) => (
                  <ProductCard
                    key={product._id}
                    addToCart={() => {
                      addToCart(product._id);
                      getCart();
                    }}
                    product={product}
                  />
                ))}
          </Box>
        </Box>
      </Container>
      <Container sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      <Pagination
          count={Math.ceil(displayedProducts?.length / productsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          sx={{
            '& .MuiPaginationItem-root': {
              color: '{color}', // Change this to your desired color
            },
            '& .Mui-selected': {
              backgroundColor: color, // Change this to your desired color for selected item
              color: '#fff', // Optional: Set text color for selected item
            },
          }}
        />
      </Container>
    </>
  );
}
