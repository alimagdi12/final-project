import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Login from './Authentication/Auth.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './NavBar/Navbar.jsx';
import {  CssBaseline } from '@mui/material';
import AddProduct from './pages/AddProduct/AddProduct.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AllProducts from './pages/AddProduct/AllProducts.jsx';
import Home from './pages/Home.jsx';
import AboutUs from './pages/AboutUs.jsx';
import Profile from './pages/Profile.jsx';
import Cart from './pages/Cart.jsx';
import PlaceOrder from './pages/PlaceOrder.jsx';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import BidPage from './pages/BidPage.jsx';
import Footer from './components/Footer.jsx';
import OrderDone from './pages/OrderDone.jsx';
import ProductDetails from './pages/ProductDetails.jsx';


function App() {
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(false);
  const [isAuthRoute, setIsAuthRoute] = useState(false);

  useEffect(() => {
    setIsAuthRoute(location.pathname === '/login');
  }, [location.pathname]);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {!isAuthRoute && <Navbar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />}
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="/bid/:id" element={<BidPage />} />
          <Route path="/orderDone" element={<OrderDone />} />
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/placeOrder" element={<PlaceOrder />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/product-details/:id" element={<ProductDetails />} />
        </Routes>
        {!isAuthRoute && <Footer toggleDarkMode={toggleDarkMode} darkMode={darkMode} />}
      </ThemeProvider>

    </div>
  );
}

export default App;
