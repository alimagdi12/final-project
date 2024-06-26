import React from 'react';
import { AppBar, Toolbar, Avatar, Box, Typography, InputBase, alpha, styled } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import ColorContext from '../../../contexts/ColorContext';
import { useContext } from 'react';
import UserContext from '../../../contexts/UserContext';

// Custom styles for gradient text
const GradientTypography = styled(Typography)(({ theme }) => ({
    background: 'linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
}));

const Topbar = () => {
    const {color,lightColor} = useContext(ColorContext) 
    const {userData} = useContext(UserContext)
    (userData);
    return (
        <AppBar position="static" sx={{ background:  `linear-gradient(270deg, ${color} 30%,${lightColor} 110%)`,margin:'auto',width:'90%', borderRadius:' 0 0 20px 20px ',boxShadow: 'none' }}>
            <Toolbar>
                <Avatar alt="Sara" src="../../../../public/Omar.jpg" sx={{ marginRight: 2 }} />
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Hello, <span style={{color:'#fff'}}>{userData.firstName}</span> 
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', borderRadius: '4px', padding: '0 10px', backgroundColor:'#fff' }}>
                    <SearchIcon sx={{ color: color }} />
                    <InputBase placeholder="Search…" sx={{ color: color, marginLeft: 1 }} />
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Topbar;
