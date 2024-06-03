import React, { useState } from 'react';
import { Card, CardActions, CardContent, Box, CardMedia } from '@mui/material';

const AboutCard = ({ children }) => {

  const [showOverlay, setShowOverlay] = useState(false);

  const handleCardFlip = () => {
    if (!showOverlay) {
      setTimeout(() => {
        setShowOverlay(true);
      }, 100);
    } else {
      setShowOverlay(false);
    }
  };

  return (
    <div
      onMouseEnter={handleCardFlip}
      onMouseLeave={handleCardFlip}
      style={{
        perspective: '1000px',
        margin: '10px',
        zIndex: '3'
      }}
    >
      <Card
        sx={{
          zIndex: '3',
          width: '300px',
          height: '400px',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.6s',
        }}
      >
        <CardContent>
          <CardMedia
            sx={{
              height: 140,
              zIndex: '3',
              opacity: showOverlay ? 0.3 : 1,
            }}
            image="../public/PlaceholderGlossary.svg"
            title="green iguana"
          />
        </CardContent>
        <CardActions>
        </CardActions>
        {showOverlay && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '1.5rem',
              fontWeight: 'bold',
            }}
          >
            {children}
          </Box>
        )}
      </Card>
    </div>
  );
};

export default AboutCard;
