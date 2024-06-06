import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import ColorContext from '../contexts/ColorContext';
import { FaCog } from 'react-icons/fa';

const colors = [
  { start: '#5daa60', end: '#4caf50' },
  { start: '#ff5722', end: '#ff7043' },
  { start: '#2196f3', end: '#64b5f6' },
  { start: '#9c27b0', end: '#ba68c8' },
  { start: '#000', end: '#333' },
  { start: 'red', end: '#ff5252' },
  { start: 'blue', end: '#448aff' },
  { start: 'gray', end: '#bdbdbd' },
  { start: 'blueViolet', end: '#8a2be2' }
];

const ColorPicker = () => {
  const { color, setColor } = useContext(ColorContext);
  const [show, setShow] = useState(false);

  const handleColorChange = (color) => {
    setColor(color);
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 2,
          position: 'fixed',
          flexWrap: 'wrap',
          paddingY: '50px',
          right: show ? '0' : '-150px',
          zIndex: 9
        }}
      >
        <Box
          sx={{
            display: 'flex',
            backgroundColor: 'gray',
            padding: 1,
            height: 30,
            marginTop: 2,
            cursor: 'pointer'
          }}
          onClick={() => { setShow(!show) }}
        >
          <FaCog />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: 2,
            flexWrap: 'wrap',
            paddingY: '10px',
            width: 150,
            backgroundColor: '#ccc'
          }}
        >
          {colors.map(({ start, end }) => (
            <Box
              key={start}
              sx={{
                display: 'flex',
                width: 30,
                height: 30,
                backgroundImage: `linear-gradient(135deg, ${start} 0%, ${end} 100%)`,
                cursor: 'pointer',
                borderRadius: '50%',
                mx: 0.5,
                mt: 0.5,
                border: '3px solid black',
                transition: '0.3s ease-in-out',
                "&:hover": {
                  transform: 'scale(1.2)',
                }
              }}
              onClick={() => handleColorChange(start)}
            />
          ))}
        </Box>
      </Box>
    </>
  );
};

export default ColorPicker;
