import { Box, Grid, TextField, Typography } from '@mui/material'
import React from 'react'
import GreenButton from './StyedButton'
import ManIcon from '@mui/icons-material/Man';
import Woman2Icon from '@mui/icons-material/Woman2';

const ProfileInfo1 = ({ handleOpen, userData }) => {
    return (
        <Box
            component="main"
            sx={{
                marginTop: '30px'
            }}
        >
            <Box bgcolor={'#F4F4F4'} sx={{ boxShadow: '2', padding: '20px' }}>
                <Typography
                    variant="h4"
                    gutterBottom
                    color={"#5daa60"}
                    display={"flex"}
                    justifyContent={"flex-start"}
                    fontWeight={"bold"}
                    margin={0}
                    marginBottom={4}
                >
                    Profile info
                </Typography>

                {/* Section 1 */}
                <Grid container spacing={2} marginBottom={5}>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            id="email"
                            label="Email"
                            placeholder='oh.22697@gmail.com'
                            value={userData.email}
                            variant="outlined"
                            InputLabelProps={{ style: { color: "#5daa60" } }}
                            sx={{
                                width: "100%",
                                textAlign: "center",
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            id="firstName"
                            label="First Name"
                            placeholder='Omar'
                            value={userData.firstName}
                            variant="outlined"
                            InputLabelProps={{ style: { color: "#5daa60" } }}
                            sx={{
                                width: "100%",
                                textAlign: "center",
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            id="lastName"
                            label="Last Name"
                            placeholder='Hassan'
                            variant="outlined"
                            InputLabelProps={{ style: { color: "#5daa60" } }}
                            sx={{
                                width: "100%",
                                textAlign: "center",
                            }}
                        />
                    </Grid>
                </Grid>

                {/* Section 2 */}
                <Grid container spacing={2} marginBottom={5}>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            id="phoneNumber"
                            label="Phone Number"
                            placeholder='+201066035716'
                            variant="outlined"
                            InputLabelProps={{ style: { color: "#5daa60" } }}
                            sx={{
                                width: "100%",
                                textAlign: "center",
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            id="birthday"
                            label="Birthday"
                            placeholder='06|22|1997'
                            variant="outlined"
                            InputLabelProps={{ style: { color: "#5daa60" } }}
                            sx={{
                                width: "100%",
                                textAlign: "center",
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <GreenButton variant="contained" sx={{ backgroundColor: '#606060', textAlign: 'center', width: '80%' }}>
                            <ManIcon color='black' />
                            Male
                        </GreenButton>
                        <GreenButton variant="contained" sx={{ backgroundColor: '#606060', textAlign: 'center', width: '80%', marginLeft: '5%' }}>
                            <Woman2Icon color='black' />
                            Female
                        </GreenButton>
                    </Grid>
                </Grid>

                {/* Update Profile */}
                <Grid container spacing={2} marginBottom={5}>
                    <Grid item xs={12}>
                        <GreenButton onClick={handleOpen} variant="contained" sx={{ backgroundColor: '#5daa60', color: '#fff', '&:hover': { color: '#5daa60', backgroundColor: '#fff', border: '2px solid #5daa60' }, width: '100%', height: '45px' }}>
                            Update Profile
                        </GreenButton>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default ProfileInfo1
