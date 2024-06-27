import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Login from './Authentication/Auth.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/NavBar/Navbar.jsx';
import { Box, CssBaseline } from '@mui/material';
import AddProduct from './pages/AddProducts/AddProduct.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AllProducts from './pages/AllProducts/AllProducts.jsx';
import Home from './pages/Home/Home.jsx';
import AboutUs from './pages/About/AboutUs.jsx';
import Profile from './pages/Profile/Profile.jsx';
import Cart from './pages/Cart/Cart.jsx';
import PlaceOrder from './pages/Shipping/PlaceOrder.jsx';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import BidPage from './pages/Bid/BidPage.jsx';
import Footer from './components/Footer/Footer.jsx';
import OrderDone from './pages/OrderCompleted/OrderDone.jsx';
import ProductDetails from './pages/ProductDetails/ProductDetails.jsx';
import List from './pages/ListItems/List.jsx';
import AddAuction from './pages/AddAuction/AddAuction.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ColorPicker from './components/Color/ColorPicker.jsx';
import CategoryProducts from './pages/ProductCategory/CategoryProducts.jsx';
import FavoritePage from './pages/Favorite/FavoritePage.jsx';
import Chat from './components/Chat/Chat.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import OrderDetails from './pages/Profile/ProfileList/Orders/OrderDetails.jsx';
import Orders1 from './pages/Profile/ProfileList/Orders/Orders1.jsx';
import PostsPage from './pages/Posts/PostsPage.jsx';

function App() {
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(false);
  const [isAuthRoute, setIsAuthRoute] = useState(false);
  const [isChatRoute, setIsChatRoute] = useState(false);

  useEffect(() => {
    const authRoutes = ['/login'];
    const chatRoutes = ['/chat', '/post'];
    setIsAuthRoute(authRoutes.includes(location.pathname));
    setIsChatRoute(chatRoutes.some(route => location.pathname.startsWith(route)));
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
      <ToastContainer />
      <ThemeProvider theme={theme}>
        <ColorPicker />
        <CssBaseline />
        {!isAuthRoute && <Navbar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />}
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="/post" element={<PostsPage />} />
          <Route path="/chat/:id" element={<Chat />} />
          <Route path="/bid/:id" element={<BidPage />} />
          <Route path="/orderDone" element={<OrderDone />} />
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/placeOrder" element={<PlaceOrder />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/products/:id" element={<CategoryProducts />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/product-details/:id" element={<ProductDetails />} />
          <Route path="/sell" element={<List />} />
          <Route path="/add-auction" element={<AddAuction />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/favorite" element={<FavoritePage />} />
          <Route path="/order" element={<Orders1 />} />
          <Route path="/order/:id" element={<OrderDetails />} />
        </Routes>
        {!isAuthRoute && <Footer toggleDarkMode={toggleDarkMode} darkMode={darkMode} />}
      </ThemeProvider>
    </div>
  );
}

export default App;