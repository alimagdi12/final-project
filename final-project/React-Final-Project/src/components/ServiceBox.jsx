import { Box, Typography } from '@mui/material'
import React from 'react'
export default function ServiceBox({ children, title, text }) {
  return (
    <Box width={'50%'}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: 50, height: 50, backgroundColor: '#ccc', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {children}
        </Box>
        <Typography margin={1} variant='h4'>{title}</Typography>
      </Box>
      <Typography>{text}</Typography>
    </Box>
  )
}
