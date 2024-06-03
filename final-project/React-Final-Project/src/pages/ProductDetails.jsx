import * as React from 'react'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Grid from '@mui/material/Grid';
import { Rating, Typography } from '@mui/material';
import SimilarItems from '../components/SimilarItems';

export default function ProductDetails() {
  const [value, setValue] = React.useState(4);
  const items = [
    { title: 'MacBook Pro MNEH3', image: '../public/villa2.jpg' },
    { title: 'MacBook Pro MNEH3', image: '../public/villa3.jpg' },
    { title: 'MacBook Pro MNEH3', image: '../public/vila.jpg' },
    { title: 'MacBook Pro MNEH3', image: '../public/laptop.jpg' },
  ];
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ratione ut consequuntur ipsam adipisci excepturi perspiciatis atque quidem tempora itaque tenetur? Ipsum, delectus culpa sequi aut quibusdam dolores. Consectetur, obcaecati possimus?
    </Box>
  );


  return (
    <>

      <Box sx={{ width: '90%', margin: '50px auto' }}>
        <Grid container spacing={2}>
          <Grid item xs={3} sx={{ width: '100%' }}>
            <Grid container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} spacing={2}>
              <Grid item xs={6} sx={{ height: '50%', width: '100%' }}>
                <img
                  src="Asset 2.svg"
                  alt="Photo 1"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </Grid>
              <Grid item xs={6} sx={{ height: '50%' }}>
                <img
                  src="Asset 2.svg"
                  alt="Photo 2"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={3} sx={{ height: '100%' }}>
            <img
              src="Asset 2.svg"
              alt="Photo 3"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Grid>
          <Grid item xs={6} sx={{ height: '100%', width: '100%' }}>
            <Typography sx={{ width: '100%', marginBottom: '10px' }} variant='h4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, aperiam.</Typography>
            <Box sx={{ display: 'flex' }} my={2}>
              <Rating name="read-only" value={value} readOnly sx={{ color: '#76a85f', marginRight: '35px' }} />
              <Typography>4 Stars</Typography>
            </Box>

            <div className='d-flex'>

              <Typography margin={1} sx={{ display: 'flex' }}>lorem ipsum</Typography>
              <Typography margin={1} sx={{ display: 'flex' }}>lorem ipsum</Typography>
            </div>

            <ul>
              <li>Lorem, ipsum dolor.</li>
              <li>Lorem, ipsum dolor.</li>
              <li>Lorem, ipsum dolor.</li>
              <li>Lorem, ipsum dolor.</li>
            </ul>

            <Button variant="contained" sx={{ backgroundColor: '#76a85f' }}>Contained</Button>
            {['right'].map((anchor) => (
              <React.Fragment key={anchor}>
                <Button variant='outlined' sx={{ padding: '7px 25px', borderColor: '#76a85f', color: '#76a85f' }} onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
                <Drawer
                  anchor={anchor}
                  open={state[anchor]}
                  onClose={toggleDrawer(anchor, false)}
                >
                  {list(anchor)}
                </Drawer>
              </React.Fragment>
            ))}

          </Grid>
        </Grid>
        <Typography variant="h4" mb={7} mt={15}>
          You May Also Like:
        </Typography>
        <SimilarItems items={items} />
      </Box>
    </>
  );
}