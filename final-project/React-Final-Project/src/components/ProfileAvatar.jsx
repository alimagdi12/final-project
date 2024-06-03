import { Box, Typography } from '@mui/material'
import React from 'react'
import GreenButton from './StyedButton'

const ProfileAvatar = () => {
    return (
        <Box sx={{ textAlign: 'center', backgroundColor: '#F4F4F4', boxShadow: '2', padding: '20px' }}>
            <img style={{ cursor: 'pointer' }} src="../../public/profile3.png" alt="" />
            <Typography variant="h6" sx={{ color: '#959191', fontWeight: 'bold' }}>Omar Hassan</Typography>
            <Typography variant="h6" sx={{ color: '#959191', fontWeight: 'bold' }}>Ismailia, EG</Typography>
            <GreenButton>Change Avatar</GreenButton>
        </Box>
    )
}

export default ProfileAvatar
