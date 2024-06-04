import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function MainCard({product}) {
if(product?.imagesUrl){
  return (
    <Card sx={{ width: '100%', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <CardMedia
        sx={{ height: 140 }}
        image={`/public/${product?.folderName?.replace(/\s+/g, '-') +'/'+product?.imagesUrl?.images[0] }`}
        title="green iguana"
      />
      <CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2" color="text.secondary">{product.title}</Typography>
          <Typography variant="body2" color="text.secondary">{product.price}</Typography>
        </CardActions>

        <Typography gutterBottom variant="h5" component="div">{product.title}</Typography>
        <Typography variant="body2" color="text.secondary">
        {product.location}
        </Typography>

        <Typography variant="body2" color="text.secondary">{product.categoryId.title}</Typography>
        <Typography variant="body2" color="text.secondary">{product.addingDate}</Typography>
      </CardContent>
      <CardActions>
      </CardActions>
    </Card>
  );
}
return (
  <Card sx={{ width: '100%', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
    <CardMedia
      sx={{ height: 140 }}
      image={`/public/${product?.folderName?.replace(/\s+/g, '-') +'/'+product?.imageUrl?.images[0] }`}
      title="green iguana"
    />
    <CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="body2" color="text.secondary">title</Typography>
      </CardActions>

      <Typography gutterBottom variant="h5" component="div">{product.title}</Typography>
     

    </CardContent>
    <CardActions>
    </CardActions>
  </Card>
);
}
