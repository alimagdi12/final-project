import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import BuildIcon from '@mui/icons-material/Build';
import { FaHammer } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import ColorContext from '../contexts/ColorContext';
import { useContext } from 'react';

export default function ProductCard({ product, addToCart }) {
 
  const navigate = useNavigate();
const {color}= useContext(ColorContext)
  const navigateToDetails = (id) => {
    if (!product.expirationDate) {
      navigate(`/product-details/${id}`);
    }
  };

  const navigateToBidDetail = (id) => {
    navigate(`/bid/${id}`);
  };

  return (
    <Grid item xs={12} sm={4} md={4} lg={3} sx={{display:'flex'}}>
      <Card
        sx={{
          width: '100%',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
          margin: 1,
          height: 330,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
        }}
        
      >
        <CardMedia onClick={() => {
          navigateToDetails(product._id);
        }} sx={{ height: 140 }} image={`/public/${product?.folderName?.replace(/\s+/g, '-') +'/'+product?.imagesUrl?.images[0] }`}
            />

        {product?.expirationDate && (
          <FaHammer
            sx={{ position: 'absolute', top: '10px', right: '5px' }}
            style={{ position: 'absolute', top: '10px', right: '5px' }}
          />
        )}
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
            {product?.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
            {product?.categoryId?.title}
          </Typography>
          <Typography gutterBottom variant="h5" component="div" sx={{ marginBottom: 1 }}>
            {product?.price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product?.addingDate}
          </Typography>
        </CardContent>
        <CardActions>
          {!product?.expirationDate && (
            <Button sx={{ width: '100%', backgroundColor: color , color:'#fff', "&:hover": {
              backgroundColor: "#fff",
              color: color,
              outline: "`2px solid ${color}`",
            }, }} onClick={addToCart}>
              Add to Cart
            </Button>
          )}

          {product?.expirationDate && (
            <Button
              sx={{ width: '100%', backgroundColor: color ,color:'#FFF', "&:hover": {
              backgroundColor: "#fff",
              color: color,
              outline: "`2px solid ${color}`",
            }}}
              onClick={() => {
                navigateToBidDetail(product._id);
              }}
            >
              Place Bid
            </Button>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
}
