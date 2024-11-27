import React, { useState } from 'react';
import { Box, Stack, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import KitchenCard from '../components/KitchenCard';
import SearchLocationInput from '../components/SearchLocationInput';
import { apiGetRequest } from '../functions/api';
import { useUser } from '../context/UserContext';

const Nearby = () => {
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [kitchens, setKitchens] = useState([]);
  const { loggedIn, token } = useUser();

  const handleLocationChange = (locationData) => {
    setSelectedLocation(locationData);
  };

  const handleCardClick = (kitchen) => {
    navigate(`/kitchen/${kitchen.kitchenId}`, { state: { kitchen } });
  };

  const handleSubmit = async () => {
    if (!selectedLocation) {
      console.error("Invalid address");
      return;
    }
    const params = {
      address: selectedLocation.address,
      count: 3,
    };

    try {
      const result = await apiGetRequest('kitchens/nearest', params, token);
      if (result) {
        setKitchens(result);
        setSelectedLocation(null);
      }
    } catch (error) {
      console.error("Error fetching kitchens:", error);
    }
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <Stack spacing={6} sx={{ p: 3 }}>
      <Stack spacing={2}>
        <Typography variant="h4" fontWeight="bold" sx={{ marginRight: 2 }}>
          Let's find a kitchen near you!
        </Typography>

        {/* Check if the user is logged in */}
        {!loggedIn || !token ? (
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleLoginClick} 
            sx={{ padding: '10px 20px', fontSize: '16px' }}
          >
            Please log in to find nearby kitchens
          </Button>
        ) : (
          <>
            {/* Location Input and Search Button */}
            <SearchLocationInput setSelectedLocation={handleLocationChange} handleSubmit={handleSubmit} label="Enter location" />
          </>
        )}
      </Stack>

      {/* Display kitchens if any are found */}
      {kitchens.length > 0 && (
        <Box 
          sx={{
            display: 'flex',
            textAlign: 'center',
            flexWrap: 'wrap',
            justifyContent: 'left',
            gap: 3,
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
      )}
    </Stack>
  );
};

export default Nearby;
