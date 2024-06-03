import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function MainCard() {
  return (
    <Card sx={{ width: '23%', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <CardMedia
        sx={{ height: 140 }}
        image="../public/PlaceholderGlossary.svg"
        title="green iguana"
      />
      <CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2" color="text.secondary">Lizard</Typography>
          <Typography variant="body2" color="text.secondary">Lizard</Typography>
        </CardActions>

        <Typography gutterBottom variant="h5" component="div">Lizard</Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards 
        </Typography>

        <Typography variant="body2" color="text.secondary">Lizard</Typography>
        <Typography variant="body2" color="text.secondary">Lizard</Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
