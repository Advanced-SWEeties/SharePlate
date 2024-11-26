import React, { useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { mockKitchens } from '../functions/mock'; // Replace with your actual kitchen data
import KitchenCard from '../components/KitchenCard';
import SearchLocationInput from '../components/SearchLocationInput';

const Nearby = () => {
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [kitchens, setKitchens] = useState([]);

  const handleLocationChange = (locationData) => {
    setSelectedLocation(locationData); // Store both latLng and address
  };

  const handleCardClick = (kitchen) => {
    navigate(`/kitchen/${kitchen.kitchenId}`, { state: { kitchen } });
  };

  const handleSubmit = () => {
    setKitchens(mockKitchens);
    console.log(selectedLocation);
    console.log("FAB clicked");
  };

  return (
    <Stack spacing={6}>
    <Stack spacing={2}>
      <Typography variant="h4" fontWeight="bold" sx={{ marginRight: 2 }}>
        Let's find a kitchen near you!
      </Typography>
      <SearchLocationInput setSelectedLocation={handleLocationChange} handleSubmit={handleSubmit} label="Enter location"/>
    </Stack>
    
    <Box 
      sx={{
        display: 'flex',
        textAlign: 'center',
        flexWrap: 'wrap', // Wrap cards to the next row if they overflow
        justifyContent: 'left', // Center align the cards
        gap: 3, // Adds space between cards
      }}
    >
      {kitchens.map((kitchen) => (
        <div
        key={kitchen.kitchenId}
        style={{ cursor: 'pointer' }}
        onClick={() => handleCardClick(kitchen)}
        >
          <KitchenCard kitchen={kitchen} />
        </div>
      ))}
    </Box>
    </Stack>
  );
};

export default Nearby;
