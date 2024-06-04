import React, { useContext, useEffect, useState } from 'react'
import ProductCard from '../../components/ProductCard'
import { Box, Container, FormControlLabel, RadioGroup, FormControl, FormLabel, Radio, Pagination, Grid } from '@mui/material'
import ProductsContext from '../../contexts/ProductsContext'
import CategoryContext from '../../contexts/CategoriesContext'
import axios from 'axios'

export default function AllProducts() {
  const { products } = useContext(ProductsContext)
  const { categories } = useContext(CategoryContext)

  const [displayedProducts, setDisplayedProducts] = useState([])
  const [searchLocation, setSearchLocation] = useState([])
  const [searchCategory, setSearchCategory] = useState([])
  const [currentPage, setCurrentPage] = useState(1)

  const productsPerPage = 3
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = displayedProducts?.slice(indexOfFirstProduct, indexOfLastProduct)

  const handlePageChange = (event, value) => {
    setCurrentPage(value)
  }

  useEffect(() => {
    setDisplayedProducts(products?.products)
  }, [products])

  function filterByCategory(event) {
    setSearchCategory(event.target.value)
    setCurrentPage(1)

    if (event.target.value === 'All') {
      if (searchLocation === '' || searchLocation === 'All') {
        setDisplayedProducts(products?.products)
        return
      } else {
        const dp = products.products.filter((product) => product?.location === searchLocation)
        setDisplayedProducts(dp)
        return
      }
    } else if (searchLocation === '' || searchLocation === 'All') {
      const dp = products.products.filter((product) => product?.categoryId?.title === event.target.value)
      setDisplayedProducts(dp)
      return
    } else {
      const dp = products.products.filter(
        (product) => product?.categoryId?.title === event.target.value && product?.location === searchLocation
      )
      setDisplayedProducts(dp)
    }
    setCurrentPage(1)
  }

  function filterByLocation(event) {
    setSearchLocation(event.target.value)
    if (event.target.value === 'All') {
      setDisplayedProducts(products?.products)
    } else if (!searchCategory || searchCategory === 'All' || searchCategory === '') {
      const dp = products.products.filter((product) => product?.location === event.target.value)
      setDisplayedProducts(dp)
    } else {
      const dp = products.products.filter(
        (product) => product?.location === event.target.value && product?.categoryId?.title === searchCategory
      )
      setDisplayedProducts(dp)
    }
    setCurrentPage(1)
  }

  async function addToCart(productId) {
    const productForm = new FormData()
    productForm.append('productId', productId)

    try {
      const token = localStorage.getItem('token')
      const resp = await axios.post('http://localhost:3000/api/v1/auth/add-to-cart', productForm, {
        headers: {
          'Content-Type': 'application/json',
          jwt: token
        }
      })
      console.log(resp)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <Container sx={{ marginTop: '20px' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Box sx={{ border: '3px solid #76a85f', borderRadius: '10px', padding: '10px', color: '#76a85f' }}>
              <Box sx={{ margin: 'auto', marginTop: 2 }}>
                <FormControl>
                  <FormLabel id="category-radio-buttons-group-label">Categories</FormLabel>
                  <RadioGroup
                    aria-labelledby="category-radio-buttons-group-label"
                    defaultValue="All"
                    name="category-radio-buttons-group"
                    onChange={filterByCategory}
                  >
                    <FormControlLabel value="All" control={<Radio />} label="All" />
                    {categories?.categories?.map((category) => (
                      <FormControlLabel key={category?.title} value={category?.title} control={<Radio />} label={category?.title} />
                    ))}
                  </RadioGroup>
                </FormControl>
              </Box>
              <Box sx={{ margin: 'auto', marginTop: 2 }}>
                <FormControl>
                  <FormLabel id="location-radio-buttons-group-label">Location</FormLabel>
                  <RadioGroup
                    aria-labelledby="location-radio-buttons-group-label"
                    defaultValue="All"
                    name="location-radio-buttons-group"
                    onChange={filterByLocation}
                  >
                    <FormControlLabel value="All" control={<Radio />} label="All" />
                    <FormControlLabel value="portsaid" control={<Radio />} label="portsaid" />
                    <FormControlLabel value="Ismailia" control={<Radio />} label="Ismailia" />
                    <FormControlLabel value="Alex" control={<Radio />} label="Alex" />
                  </RadioGroup>
                </FormControl>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={9}>
            <Grid container spacing={3}>
              {currentProducts?.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product._id}>
                  <ProductCard
                    title={product?.title}
                    price={product?.price}
                    category={product?.categoryId?.title}
                    location={product?.location}
                    addToCart={() => {
                      addToCart(product._id)
                    }}
                    productId={product._id}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Container sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Pagination
          count={Math.ceil(displayedProducts?.length / productsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Container>
    </>
  )
}
