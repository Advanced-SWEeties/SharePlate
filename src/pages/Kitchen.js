import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, Stack, Chip, Divider } from '@mui/material';
import { generateGoogleMapsIframe } from '../functions/map';
import Rating from '../components/Rating';
import { commaParse } from '../functions/string';
const Kitchen = () => {
  const location = useLocation();
  const kitchen = location.state?.kitchen;
  const [rating, setRating] = useState(0);

  const handleSetRating = async (newRating) => {
    setRating(newRating);
    try {
      console.log('Do nothing for now');
    } catch (error) {
      console.error(error);
    }
  };

  if (!kitchen) {
    console.log("in here")
    return (
      <Typography variant="h6">
        No kitchen data found. Please return to the Explore page.
      </Typography>
    );
  }

  const embedding = generateGoogleMapsIframe(kitchen.address, 550, 350);
  const tokens = commaParse(kitchen.accessibilityFeatures)

  return (
    <Stack direction="row" alignItems="top" spacing={4}>
      <Stack spacing={1} sx={{ p: 2 }}>
        <Typography variant="h3" gutterBottom>{kitchen.name}</Typography>
        <Stack direction="row" spacing={2}>
          <Typography variant="h6">{kitchen.address}</Typography>
          <Chip label={kitchen.contactPhone} size="large" />
        </Stack>
        <Divider />
        <Stack direction="row" spacing={1} flexWrap="wrap">
          <Chip label={kitchen.operationalStatus} size="large" color = {kitchen.operationalStatus === 'CLOSED' ? "error" : "success"}/>
          <Chip label={kitchen.operatingHours} size="large" />
        </Stack>
        <Divider />
          <Rating rating={rating} size={'30px'} setRating={handleSetRating} />
        <Divider />
        <Typography variant='h6'>Accessibility Features</Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {tokens.map((token, index) => (
            <Chip 
              key={index} 
              label={token} 
              size="large" 
              sx={{ backgroundColor: '#e0f7fa', color: '#00796b' }} 
            />
          ))}
        </Stack>

      </Stack>
      <Stack alignItems="center">{embedding}</Stack>
    </Stack>
  );
};

export default Kitchen;
