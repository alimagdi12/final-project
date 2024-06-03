import React from 'react';
import Button from '@mui/material/Button';

const GreenButton = ({children}) => {
    return (
        <Button variant="contained" sx={{ backgroundColor: '#5daa60', color: '#ffffff', '&:hover':{backgroundColor:'#fff' , color:'#5daa60' , outline:'2px solid #5daa60'} }}>
            {children}
        </Button>
    );
};

export default GreenButton;
