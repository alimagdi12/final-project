import React, { useContext, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Badge, Switch } from '@mui/material';
import FlipCard from '../components/FlipCard';
import CategoryContext from '../contexts/CategoriesContext';
import { Link, useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { CartContext } from '../contexts/CartContext';
import ColorContext from '../contexts/ColorContext';

const pages = ['Products', 'Categories', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];


export default function Navbar({ darkMode, toggleDarkMode }) {
  const { categories } = useContext(CategoryContext);
  const { totalItems, cartItems } = useContext(CartContext);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [hoveredPage, setHoveredPage] = useState(null);
  const navigate = useNavigate();
const {color} = useContext(ColorContext)

  const handleSettingClick = (event) => {
    if (event.currentTarget.textContent === 'Profile') {
      navigate('/profile');
    }
    if (event.currentTarget.textContent === 'Logout') {
      localStorage.setItem('token', '')
      navigate('/login');
    }
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
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


  return (
    <AppBar position="static" sx={{ background: color, zIndex: 9 }} >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} color="gray" />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: "#ccc",
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />

          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/products"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, textAlign: 'center' }}>
            <Box sx={{ my: 2, textAlign: 'center', position: 'relative' }} >
              <Link to="/products" className='text-decoration-none h5 mx-2' >Products</Link>
            </Box>

            <Box sx={{ my: 2, textAlign: 'center', position: 'relative' }} >
              <Link to="/about" className='text-decoration-none h5 mx-2' >About Us</Link>
            </Box>

            <Box
              onMouseEnter={handlePageHover}
              onMouseLeave={handlePageHoverOut}
              sx={{ my: 2, textAlign: 'center', position: 'relative' }}
            >
              <Typography
                component={Link}
                to="/categories"
                className='text-decoration-none h5 mx-2'
              >
                Categories
              </Typography>
              {hoveredPage && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: '100%',
                    left: '50%',
                    width: '1000px',
                    background: 'white',
                    boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.3)',
                    borderRadius: '5px',
                    py: 1,
                    px: 2,
                    zIndex: 3
                  }}
                >
                  <Box className='d-flex flex-wrap' sx={{ zIndex: '999', height: '100%' }}  >
                    {categories?.categories?.map(category => (
                  <Link  to={`/products/${category._id}`} >
                    <FlipCard category={category} key={category._id}>
                        {category.title}
                      </FlipCard>
                      </Link>
                    ))}
                  </Box>
                </Box>
              )}
            </Box>
          </Box>

          <Box sx={{ my: 2, textAlign: 'center', position: 'relative' }} >
            <Link to="/sell" className='text-decoration-none h4 mx-2'>
              <Button sx={{ backgroundColor: 'gray' }} variant="contained">List</Button>
            </Link>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, fontSize: 40 }} />
                </IconButton>
                <IconButton color="inherit">
                  <Badge badgeContent={totalItems} color="secondary">
                    <Link to="/cart" className='text-decoration-none h5 mx-2' > 
                      <ShoppingCartIcon /> {cartItems?.length || 0}
                    </Link>
                  </Badge>
                </IconButton>
              </>
            </Tooltip>

            <Switch checked={darkMode} onChange={toggleDarkMode} />

            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography onClick={handleSettingClick} textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
    
      </Container>
    </AppBar>
  );
}
