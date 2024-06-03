import { useState } from 'react';
import ProfileInfo from './ProfileInfo';
import Sidebar from '../components/Sidebar';
import Orders from './Orders';
import Payment from './Payment';
import { Box } from '@mui/material';
import Address from './Address';


const drawerWidth = 300;

export default function Profile() {

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [open, setOpen] = useState(false);
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        gender:'male'
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
        console.log('Confirmed:', userData);
        setUserData((prevData) => ({
            ...prevData, [name]: value
        }));
        handleClose();
    };

    const handleListItemClick = (index) => {
        setSelectedIndex(index);
    };


    return (
        <Box sx={{ width: selectedIndex === 1 ? '72%' : 'auto', display: 'flex' }}>
            <Sidebar drawerWidth={drawerWidth} handleListItemClick={handleListItemClick} selectedIndex={selectedIndex} />
            {
                selectedIndex === 0 && (
                    <div style={{width:'100%'}}>
                        <ProfileInfo
                            handleOpen={handleOpen}
                            handleClose={handleClose}
                            handleChange={handleChange}
                            handleConfirm={handleConfirm}
                            userData={userData}
                            open={open}
                            selectedIndex={selectedIndex}
                        />
                    </div>
                )
            }
            
            {/* Order-Section */}
            {
                selectedIndex === 1 && (
                    <div style={{width:'100%'}}>
                        <Orders />
                    </div>
                )
            }

            {/* Address-Section */}
            {
                selectedIndex === 2 && (
                    <Box sx={{width:'100%' }}>
                        <Address />
                    </Box>
                )
            }

            {/* Payment-Section */}
            {
                selectedIndex === 3 && (
                    <Box sx={{ marginLeft:'2%', width:'50%'}}>
                        <Payment />
                    </Box>
                )
            }
        </Box>
    );
}
