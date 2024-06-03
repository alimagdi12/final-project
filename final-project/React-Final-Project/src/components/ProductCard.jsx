import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function ProductCard({ title, price, location, category }) {
  return (
    <Card sx={{ width: '30%', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', margin: 1, height: 330 }}>
      <CardMedia
        sx={{ height: 140 }}
        image="../public/PlaceholderGlossary.svg"
        title="green iguana"
      />
      <CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2" color="text.secondary">{category}</Typography>
          <Typography variant="body2" color="text.secondary">{price}</Typography>
        </CardActions>

        <Typography gutterBottom variant="h5" component="div">{title}</Typography>


        <Typography variant="body2" color="text.secondary">{location}</Typography>
      </CardContent>
      <CardActions>
        <Button sx={{ width: '100%', backgroundColor: '#ccc', padding: 0, margin: 0 }}>Add to Cart</Button>
      </CardActions>
    </Card>
  );
}
