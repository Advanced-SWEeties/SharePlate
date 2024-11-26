import React, { useState, useEffect } from 'react';
import { Typography, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { mockKitchens } from '../functions/mock';
import KitchenCard from '../components/KitchenCard';

const Explore = (props) => {
  const [kitchens, setKitchens] = useState([]);
  const navigate = useNavigate();

  // Use useEffect to set the kitchens state on component mount
  useEffect(() => {
    setKitchens(mockKitchens);
  }, [mockKitchens]); // Empty dependency array ensures this runs only once

  const handleCardClick = (kitchen) => {
    navigate(`/kitchen/${kitchen.kitchenId}`, { state: { kitchen } }); // Pass the kitchen object in state
  };

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ textAlign: 'center' }}
    >
      <Typography variant="h3" style={{ fontWeight: 600 }} sx={{ mb: 1 }}>
        Check out all the kitchens!
      </Typography>
      <Stack direction="row" flexWrap="wrap" justifyContent="center" gap={3}>
        {kitchens.map((kitchen) => (
          <div
            key={kitchen.kitchenId}
            style={{ cursor: 'pointer' }}
            onClick={() => handleCardClick(kitchen)}
          >
            <KitchenCard kitchen={kitchen} key={kitchen.kitchenId} />
          </div>
        ))}
      </Stack>
    </Stack>
  );
};

export default Explore;
