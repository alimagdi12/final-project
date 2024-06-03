import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from "@mui/material"
import Shape from "./Shape"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import PaymentsIcon from '@mui/icons-material/Payments';

function Sidebar({ drawerWidth, handleListItemClick, selectedIndex }) {
    return (
        <div style={{ display: 'flex', marginTop: '5%', zIndex: '' }}>
            <Box sx={{ display: 'flex' }}>

                {/* Shape beside the sidebar */}
                <Shape />
                
                {/* Sidebar-Section */}
                <Drawer
                    variant="permanent"
                    sx={{
                        width: drawerWidth,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth, bgcolor: '#5daa60', border: 'none', color: '#FFFFFF', height: '600px', borderRadius: '10px', position: 'unset'
                        },
                    }}
                >
                    <Toolbar sx={{
                        color: '#FFFFFF', fontWeight: '700', lineHeight: '44.98px'
                    }}>Hello Mohamed!
                    </Toolbar>

                    <Box>
                        <List>
                            {['Profile Info', 'Orders', 'Addresses', 'Payments'].map((text, index) => (
                                <ListItem
                                    key={text}
                                    disablePadding
                                    selected={selectedIndex === index}
                                    onClick={() => handleListItemClick(index)}
                                    sx={{ '&.Mui-selected': { bgcolor: '#FFFFFF', color: '#5daa60', borderLeft: '4px solid #5daa60', '& .MuiListItemIcon-root': { color: '#5daa60' } } }}
                                >
                                    <ListItemButton >
                                        <ListItemIcon sx={{ color: '#FFFFFF' }}>
                                            {index === 0 ? <AccountCircleIcon /> : ""}
                                            {index === 1 ? <FactCheckIcon /> : ""}
                                            {index === 2 ? <MapsHomeWorkIcon /> : ""}
                                            {index === 3 ? <PaymentsIcon /> : ""}
                                        </ListItemIcon>
                                        <ListItemText primary={text} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Drawer >
            </Box>
        </div>
    )
}

export default Sidebar
