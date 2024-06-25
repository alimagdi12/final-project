import { useState } from 'react';
import ProfileInfo from '../Profile/ProfileList/ProfileInfo/ProfileInfo';
import Sidebar from './Components/Sidebar';
// import Orders from '../Profile/ProfileList/Orders/Orders';
import { Box, Grid } from '@mui/material';
import Address from '../Profile/ProfileList/Address/Address';
import Orders1 from './ProfileList/Orders/OrderDetails';


const drawerWidth = 300;

export default function Profile() {

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [open, setOpen] = useState(false);
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        gender: 'male'
    });

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserData((prevData) => ({
            ...prevData, [name]: value
        }));
    };

    const handleConfirm = (event) => {
        const { name, value } = event.target;
        setUserData((prevData) => ({
            ...prevData, [name]: value
        }));
        handleClose();
    };

    const handleListItemClick = (index) => {
        setSelectedIndex(index);
    };


    return (
        <Grid container xs={12} md={12}  sm={12}>
            {/* Sidebar */}
            <Grid item xs={12} md={3}>
                <Sidebar drawerWidth={drawerWidth} handleListItemClick={handleListItemClick} selectedIndex={selectedIndex} />
            </Grid>

            {/* Main Content */}
            <Grid item xs={12} md={9}>
                {selectedIndex === 0 && (
                    <ProfileInfo
                        handleOpen={handleOpen}
                        handleClose={handleClose}
                        handleChange={handleChange}
                        handleConfirm={handleConfirm}
                        userData={userData}
                        selectedIndex={selectedIndex}
                    />
                )}
                {selectedIndex === 1 && <Orders1 />}
                {selectedIndex === 2 && <Address />}
                {/* {selectedIndex === 3 && <Payment />} */}
            </Grid>
        </Grid>
    );
}
