import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import ColorContext from '../contexts/ColorContext';
import { FaCog } from 'react-icons/fa';
const colors = ['#5daa60', '#ff5722', '#2196f3', '#9c27b0', '#ffeb3b' , '#ccc'];

const ColorPicker = () => {
 const {color,setColor} = useContext(ColorContext)
const [show,setShow] = useState(false)


 
    const handleColorChange = (color) => {
       setColor(color)
      };
    return (
        <>
  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 ,position:'fixed' , flexWrap:'wrap' , paddingY:'50px',right: show ? '0' : '-150px', zIndex:9 }}  >
    <Box sx={{display:'flex', backgroundColor:'gray' , padding:1, height:30 , marginTop:2 }} onClick={()=>{setShow(!show)}}> <FaCog /></Box>
  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 , flexWrap:'wrap' , paddingY:'10px', width:150 , backgroundColor:'#ccc'  }}>
  
      {colors.map((color) => (
          <Box 
          display={'flex'}
          key={color}
          sx={{
            display:'flex',
            width: 30,
            height: 30,
            backgroundColor: color,
            cursor: 'pointer',
            borderRadius: '50%',
            mx: .5,
            mt:.5,
            border: color ? '3px solid black' : 'none',
        }}
        onClick={() => handleColorChange(color)}
        />
      ))}
    </Box>
    </Box>
        </>
  );
};

export default ColorPicker;
