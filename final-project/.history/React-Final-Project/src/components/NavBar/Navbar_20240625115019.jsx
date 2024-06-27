/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
import React, { useContext, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Badge, Grid, Switch } from "@mui/material";
import FlipCard from "../FlibCard/FlipCard";
import CategoryContext from "../../contexts/CategoriesContext";
import { Link, useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { CartContext } from "../../contexts/CartContext";
import ColorContext from "../../contexts/ColorContext";
import UserContext from "../../contexts/UserContext";
import { toast } from "react-toastify";
import { LoveContext } from '../../contexts/LoveContext';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { NotificationContext } from '../../contexts/NotificationContext';

const pages = ["Products", "Categories", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

export default function Navbar({ darkMode, toggleDarkMode }) {
  const { love, getFavorite } = useContext(LoveContext);
  const { userData, token, fetchUserData, setToken } = useContext(UserContext);
  const { categories } = useContext(CategoryContext);
  const { totalItems, cartItems, getCart } = useContext(CartContext);
  const { notifications, fetchNotifications } = useContext(NotificationContext);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [hoveredPage, setHoveredPage] = useState(null);
  const [anchorElNotifications, setAnchorElNotifications] = useState(null);
  const navigate = useNavigate();
  const { color } = useContext(ColorContext);

  const handleProfileClick = () => {
    if (token !== "" || token) {
      console.log(token);
      navigate("/profile");
    } else {
      toast.error("You must login first");
    }
  };

  const handleDashboardClick = () => {
    if (token !== "" || token) {
      console.log(token);
      navigate("/dashboard");
    } else {
      toast.error("You Are Not Admin ");
    }
  };

  const handleLogOutClick = () => {
    localStorage.setItem('token', '');
    setToken('')
    navigate("/login");
  };

  useEffect(() => {
    fetchUserData();
    console.log(userData);
    getFavorite();
    getCart();
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [token]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
    console.log(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handlePageHover = () => {
    setHoveredPage(true);
  };

  const handlePageHoverOut = () => {
    setHoveredPage(null);
  };

  const handleOpenNotificationsMenu = (event) => {
    setAnchorElNotifications(event.currentTarget);
  };

  const handleCloseNotificationsMenu = () => {
    setAnchorElNotifications(null);
  };

  return (
    <AppBar position="static" sx={{ background: color, zIndex: 9 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex", width: '15%' },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "#ccc",
              textDecoration: "none",
            }}
          >
            <img
              src="/logo.png"
              alt="Logo"
              width="100%"
              style={{ cursor: "pointer" }}
            />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">Categories</Typography>
              </MenuItem>
              {categories && categories.categories && categories.categories.map((category) => (
                <MenuItem key={category._id} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" component={Link} to={`/products/${category._id}`}>
                    {category.title}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              textAlign: "center",
            }}
          >
            <Box sx={{ my: 2, textAlign: "center", position: "relative" }}>
              <Link to="/products" className="text-decoration-none h5 mx-2">
                Products
              </Link>
            </Box>

            <Box sx={{ my: 2, textAlign: "center", position: "relative" }}>
              <Link to="/about" className="text-decoration-none h5 mx-2">
                About Us
              </Link>
            </Box>

            <Box sx={{ my: 2, textAlign: "center", position: "relative" }}>
              <Link to="/post" className="text-decoration-none h5 mx-2">
                Posts
              </Link>
            </Box>

            <Box
              onMouseEnter={handlePageHover}
              onMouseLeave={handlePageHoverOut}
              sx={{ my: 2, textAlign: "center", position: "relative" }}
            >
              <Typography
                sx={{ fontWeight: 'bold' }}
                component={Link}
                className="text-decoration-none h5 mx-2"
              >
                Categories
              </Typography>
              {hoveredPage && (
                <Grid
                md={12}
                  sx={{
                    position: "absolute",
                    top: "100%",
                    // left: "50%",
                    width: "700px",
                    background: "white",
                    boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.3)",
                    borderRadius: "5px",
                    display:'flex',
                    py: 1,
                    px: 2,
                    zIndex: 3,
                    justifyContent:'flex-start',
                  }}
                >
                  <Grid
                    className="d-flex flex-wrap"
                    md={6}
                    sx={{ zIndex: "999", height: "100%", maxWidth: '100%' }}
                  >
                    {categories && categories.categories && categories.categories.map((category) => (
                      <Link to={`/products/${category._id}`} key={category._id}>
                        <FlipCard category={category} key={category._id}>
                          {category.title}
                        </FlipCard>
                      </Link>
                    ))}
                  </Grid>
                </Grid>
              )}
            </Box>
          </Box>
          {!token && (
            <Box sx={{ my: 2, textAlign: "center", position: "relative" }}>
              <Link to="/login" className="text-decoration-none h4 mx-2">
                <Button sx={{ backgroundColor: "#fff", color: color, "&:hover": { backgroundColor: color, color: '#fff', outline: '3px solid #fff' } }} variant="contained">
                  Log In
                </Button>
              </Link>
            </Box>
          )}

          {token && (
            <>
              <IconButton
                color="inherit"
                onClick={handleOpenNotificationsMenu}
              >
                <Badge badgeContent={notifications?.length} color="secondary">
                  <NotificationsIcon sx={{ cursor: 'pointer', color: 'white' }} />
                </Badge>
              </IconButton>

              <IconButton color="inherit">
                <Badge badgeContent={love} color="secondary">
                  <Link to={'/favorite'}> <FavoriteIcon sx={{ cursor: 'pointer', color: 'white' }} /></Link>
                </Badge>
              </IconButton>
              <Box sx={{ my: 2, textAlign: "center", position: "relative" }}>
                <Link to="/sell" className="text-decoration-none h4 mx-2">
                  <Button sx={{ backgroundColor: "white", color: color, '&:hover': { color: 'white', backgroundColor: color, outline: '2px solid white' } }} variant="contained">
                    List
                  </Button>
                </Link>
              </Box>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <>
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <img
                        src={userData?.imageUrl?.images[0]}
                        alt="User Photo"
                        style={{ cursor: 'pointer', width: '40px', height: '40px', borderRadius: '50%' }}
                      />
                    </IconButton>
                    <IconButton color="inherit">
                      <Badge badgeContent={cartItems?.length || 0} color="secondary">
                        <Link
                          style={{ margin: '0' }}
                          to="/cart"
                          className="text-decoration-none h5"
                        >
                          <ShoppingCartIcon />
                        </Link>
                      </Badge>
                    </IconButton>
                  </>
                </Tooltip>

                <Switch checked={darkMode} onChange={toggleDarkMode} />

                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem key={"3"} onClick={handleCloseUserMenu}>
                    <Typography onClick={handleDashboardClick} textAlign="center">
                      Dashboard
                    </Typography>
                  </MenuItem>

                  <MenuItem key={"1"} onClick={handleCloseUserMenu}>
                    <Typography onClick={handleProfileClick} textAlign="center">
                      Profile
                    </Typography>
                  </MenuItem>

                  <MenuItem key={"2"} onClick={handleCloseUserMenu}>
                    <Typography onClick={handleLogOutClick} textAlign="center">
                      Logout
                    </Typography>
                  </MenuItem>
                </Menu>
              </Box>
            </>
          )}

          <Menu
            id="notifications-menu"
            anchorEl={anchorElNotifications}
            open={Boolean(anchorElNotifications)}
            onClose={handleCloseNotificationsMenu}
            PaperProps={{
              style: {
                width: '50%',
                maxHeight: '80vh',
                overflowY: 'auto'
              },
            }}
          >
            {notifications?.map((notification, index) => (
              <MenuItem key={index}>
                {notification}
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
