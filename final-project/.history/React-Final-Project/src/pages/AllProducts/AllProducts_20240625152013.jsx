import React, { useContext, useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import ProductsContext from "../../contexts/ProductsContext";
import CategoryContext from "../../contexts/CategoriesContext";
import AuctionContext from "../../contexts/AuctionContext";
import Loader from './../../components/loader/Loader.jsx';
import axios from "axios";
import cart2Image from '../../../public/cart8.jpg';
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
import ColorContext from "../../contexts/ColorContext";
import LoaderContext from "../../contexts/LoaderContext";

export default function AllProducts() {
  const { color } = useContext(ColorContext);
  const [toggle, setToggle] = useState(false);
  const { products,fetchProducts } = useContext(ProductsContext);
  const { categories } = useContext(CategoryContext);
  const { auction } = useContext(AuctionContext);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [searchLocation, setSearchLocation] = useState(null);
  const [searchCategory, setSearchCategory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [auctionPage, setAuctionPage] = useState(1);
  const productsPerPage = 6;
  const auctionsPerPage = 6;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = displayedProducts?.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const indexOfLastAuction = auctionPage * auctionsPerPage;
  const indexOfFirstAuction = indexOfLastAuction - auctionsPerPage;
  const currentAuctions = auction?.slice(
    indexOfFirstAuction,
    indexOfLastAuction
  );

  console.log(currentAuctions);

  const { getCart, addToCart } = useContext(CartContext);
const {loader ,setLoader} = useContext(LoaderContext)
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleAuctionPageChange = (event, value) => {
    setAuctionPage(value);
  };


  useEffect(() => {
    fetchProducts()
    setDisplayedProducts(products?.products);
  }, []);


  function filterByCategory(event) {
    setSearchCategory(event.target.value);
    setCurrentPage(1);

    if (event.target.value === "All") {
      if (!searchLocation || searchLocation === "All") {
        setDisplayedProducts(products?.products);
        return;
      } else {
        const dp = products.products.filter(
          (product) => product?.location === searchLocation
        );
        setDisplayedProducts(dp);
        return;
      }
    } else if (!searchLocation || searchLocation === "All") {
      const dp = products.products.filter(
        (product) => product?.categoryId?.title === event.target.value
      );
      setDisplayedProducts(dp);
      return;
    } else if (searchLocation) {
      const dp = products.products.filter(
        (product) =>
          product?.categoryId?.title === event.target.value &&
          product?.location === searchLocation
      );
      setDisplayedProducts(dp);
    }
    setCurrentPage(1);
  }

  function filterByLocation(event) {
    setSearchLocation(event.target.value);
    if (event.target.value === "All") {
      setDisplayedProducts(products?.products);
    } else if (
      !searchCategory ||
      searchCategory === "All" ||
      searchCategory === ""
    ) {
      const dp = products.products.filter(
        (product) => product?.location === event.target.value
      );
      setDisplayedProducts(dp);
    } else {
      const dp = products.products.filter(
        (product) =>
          product?.location === event.target.value &&
          product?.categoryId?.title === searchCategory
      );
      setDisplayedProducts(dp);
    }
    setCurrentPage(1);
  }

  return (
    <>
     <div style={{
        backgroundImage: `url(${cart2Image})`,
        paddingTop: '20px',
        backgroundSize: 'cover', // Ensure the background image covers the container
        backgroundPosition: 'center'
      }}>

        <Container
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" }, // Flex direction changes based on screen size
            justifyContent: "space-between",
            alignItems:'center'
          }}
        >
          <Box
            sx={{
              width: { xs: "100%", md: "25%" }, // Adjust width for smaller screens
              height: "auto",
              border: `3px solid ${color}`,
              borderRadius: "10px",
              paddingX: "50px",
              color: "white",
              marginBottom: { xs: "20px", md: 0 }, // Add bottom margin for smaller screens
            }}
          >
            {/* Categories and City filters */}
            <Box sx={{ width: "100%", margin: "auto", marginTop: 2 }}>
              {/* Categories filter */}
              <FormControl>
                <FormLabel
                  sx={{
                    color: 'white',
                    borderBottom: `2px solid ${color}`,
                    width: "100%",
                  }}
                  id="demo-radio-buttons-group-label"
                >
                  Categories
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="All"
                  name="radio-buttons-group"
                  onChange={filterByCategory}
                >
                  <FormControlLabel
                    value="All"
                    control={
                      <Radio
                        sx={{
                          color: 'white',
                          "&.Mui-checked": {
                            color: "white",
                          },
                        }}
                      />
                    }
                    label="All"
                  />
                  {categories?.categories?.map((category) => (
                    <FormControlLabel
                      key={category?.title}
                      value={category?.title}
                      control={
                        <Radio
                          sx={{
                            color: "white",
                            "&.Mui-checked": {
                              color: "white",
                            },
                          }}
                        />
                      }
                      label={category?.title}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Box>
            <Box sx={{ width: "100%", margin: "auto", marginTop: 2 }}>
              {/* City filter */}
              <FormControl>
                <FormLabel
                  sx={{ color: 'white', borderBottom: `2px solid ${color}` }}
                  id="demo-radio-buttons-group-label"
                >
                  City
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="All"
                  name="radio-buttons-group"
                  onChange={filterByLocation}
                >
                  <FormControlLabel
                    value="All"
                    control={
                      <Radio
                        sx={{
                          color: "white",
                          "&.Mui-checked": {
                            color: "white",
                          },
                        }}
                      />
                    }
                    label="All"
                  />
                  <FormControlLabel
                    value="portsaid"
                    control={
                      <Radio
                        sx={{
                          color: "white",
                          "&.Mui-checked": {
                            color: "white",
                          },
                        }}
                      />
                    }
                    label="portsaid"
                  />
                  <FormControlLabel
                    value="Ismailia"
                    control={
                      <Radio
                        sx={{
                          color: "white",
                          "&.Mui-checked": {
                            color: "white",
                          },
                        }}
                      />
                    }
                    label="Ismailia"
                  />
                  <FormControlLabel
                    value="Alex"
                    control={
                      <Radio
                        sx={{
                          color: "white",
                          "&.Mui-checked": {
                            color: "white",
                          },
                        }}
                      />
                    }
                    label="Alex"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
          </Box>

          <Box
            sx={{
              width: { xs: "100%", md: "70%" },
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Buttons and Product Cards */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 2,
                marginTop: { xs: 2, md: 0 },
                width:'81%'
              }}
            >
              {/* Show Products and Show Auction buttons */}
              <Button
                variant="contained"
                onClick={() => setToggle(false)}
                sx={{
                  backgroundColor: color,
                  color: "#FFF",
                  "&:hover": {
                    color: color,
                    backgroundColor: "white",
                    outline: `2px solid ${color}`,
                  },
                }}
              >
                Show Products
              </Button>
              <Button
                variant="contained"
                onClick={() => setToggle(true)}
                sx={{
                  backgroundColor: color,
                  color: "#FFF",
                  "&:hover": {
                    color: color,
                    backgroundColor: "white",
                    outline: `2px solid ${color}`,
                  },
                }}
              >
                Show Auction
              </Button>
            </Box>
            {/* Product Cards */}
            <Box
              sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
            >
              {/* Product Cards */}
              {toggle
                ? currentAuctions?.map((product) => (
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
        { !toggle && currentProducts &&
          <Container
            sx={{ display: "flex", justifyContent: "center", paddingTop: "20px", paddingBottom: '20px' }}
          >
            <Pagination
              count={Math.ceil(displayedProducts?.length / productsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              sx={{
                "& .MuiPaginationItem-root": {
                  color: '#fff'
                },
                "& .Mui-selected": {
                  backgroundColor: color,
                  color: "white",
                },
              }}
            />
          </Container>
        }
        { toggle && currentAuctions &&
          <Container
            sx={{ display: "flex", justifyContent: "center", paddingTop: "20px", paddingBottom: '20px' }}
          >
            <Pagination
              count={Math.ceil(auction?.length / auctionsPerPage)}
              page={auctionPage}
              onChange={handleAuctionPageChange}
              sx={{
                "& .MuiPaginationItem-root": {
                  color: '#fff'
                },
                "& .Mui-selected": {
                  backgroundColor: color,
                  color: "white",
                },
              }}
            />
          </Container>
        }
      </div>

    </>
  );
}
