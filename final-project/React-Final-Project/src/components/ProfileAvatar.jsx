import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import GreenButton from './StyedButton'

const ProfileAvatar = () => {
    return (
        <Box sx={{ textAlign: 'center', backgroundColor: '#F4F4F4', boxShadow: '2', padding: '20px' }}>
            <Grid container spacing={2} alignItems="center" justifyContent="center">
                <Grid item xs={12}>
                    <img style={{ cursor: 'pointer', maxWidth: '100%' }} src="../../public/profile3.png" alt="" />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6" sx={{ color: '#959191', fontWeight: 'bold' }}>Omar Hassan</Typography>
                    <Typography variant="h6" sx={{ color: '#959191', fontWeight: 'bold' }}>Ismailia, EG</Typography>
                </Grid>
                <Grid item xs={12}>
                    <GreenButton>Change Avatar</GreenButton>
                </Grid>
            </Grid>
        </Box>
    )
}

export default ProfileAvatar
