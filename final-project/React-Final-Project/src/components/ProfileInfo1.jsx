import React, { useContext, useState } from 'react';
import { Box, Grid, TextField, Typography } from '@mui/material';
import GreenButton from './StyedButton';
import ManIcon from '@mui/icons-material/Man';
import Woman2Icon from '@mui/icons-material/Woman2';
import UserContext from '../contexts/UserContext';
import UpdateProfilePopup from './UpdateProfilePopup';
import axios from 'axios';

const ProfileInfo1 = () => {
    const { userData, setUserData } = useContext(UserContext);
    const [updatedProfile, setUpdatedProfile] = useState({
        email: userData.result?.email || '',
        firstName: userData.result?.firstName || '',
        lastName: userData?.result?.lastName || '',
        phoneNumber: userData?.result?.phoneNumber || '',
        birthDay: userData?.result?.birthDay || '',
    });
    const [openPopup, setOpenPopup] = useState(false);
    const handleOpen = () => {
        setOpenPopup(true);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log('handleChange triggered:', name, value);
        setUpdatedProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value,
        }));
        console.log('Updated Profile:', updatedProfile);
    };



    const handleProfileUpdate = async () => {
        const userForm = new FormData();
        userForm.append('birthDay', updatedProfile.birthDay);
        userForm.append('phoneNumber', updatedProfile.phoneNumber);
        userForm.append('lastName', updatedProfile.lastName);
        userForm.append('firstName', updatedProfile.firstName);
        userForm.append('email', updatedProfile.email);
       
        try {
            const response = await axios.put('http://127.0.0.1:3000/api/v1/auth/edit-user',userForm, { 
                headers: {
                    'Content-Type': 'application/json',
                    'jwt': localStorage.getItem('token')
                }
            });
            console.log(response);
         console.log(updatedProfile.firstName);
// toast.success('added sucessfully')
        } catch (err) {
            console.error(err);
            
// toast.error('failed to add auction')
        }
    };





    return (
        <Box component="main" sx={{ marginTop: '30px' }}>
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
                            value={updatedProfile.email}
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
                            value={updatedProfile.firstName}
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
                            value={updatedProfile.lastName}
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
                            value={updatedProfile.phoneNumber}
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
                            value={updatedProfile.birthDay}
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
                        <button onClick={handleOpen} >
                            Update Profile
                        </button>
                    </Grid>
                </Grid>
            </Box>

            {/* Update Profile Popup */}
            {
                openPopup &&
                <UpdateProfilePopup
                    handleProfileUpdate={handleProfileUpdate}
                    updatedProfile={updatedProfile}
                    setUpdatedProfile={setUpdatedProfile}
                    handleChange={handleChange}
                    setOpen={setOpenPopup}
                    open={openPopup}
                />}
        </Box>
    );
};

export default ProfileInfo1;
