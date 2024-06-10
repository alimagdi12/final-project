import React from 'react';
import { AppBar, Toolbar, Avatar, Box, Typography, InputBase, alpha, styled } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

// Custom styles for gradient text
const GradientTypography = styled(Typography)(({ theme }) => ({
    background: 'linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
}));

const Topbar = () => {
    return (
        <AppBar position="static" sx={{ backgroundColor: '#1F1B24', boxShadow: 'none' }}>
            <Toolbar>
                <Avatar alt="Sara" src="../../../../public/Omar.jpg" sx={{ marginRight: 2 }} />
                <GradientTypography variant="h6" sx={{ flexGrow: 1 }}>
                    Hello, <span style={{color:'#AC51CC'}}>Omar</span> 
                </GradientTypography>
                <Box sx={{ display: 'flex', alignItems: 'center', borderRadius: '4px', padding: '0 10px', background: 'linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)' }}>
                    <SearchIcon sx={{ color: '#fff' }} />
                    <InputBase placeholder="Search…" sx={{ color: '#fff', marginLeft: 1 }} />
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Topbar;
