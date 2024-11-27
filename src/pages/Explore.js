import React, { useState, useEffect } from 'react';
import { Typography, Stack, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { apiGetRequest } from '../functions/api';
import KitchenCard from '../components/KitchenCard';
import { useUser } from '../context/UserContext';

const Explore = (props) => {
  const [kitchens, setKitchens] = useState([]);
  const navigate = useNavigate();
  const { loggedIn, token } = useUser();

  useEffect(() => {
    const fetchKitchens = async () => {
      if (loggedIn && token) {
        const params = { count: 10 };

        try {
          const results = await apiGetRequest('kitchens/top-rated', params, token);
          setKitchens(results);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchKitchens();

    return () => {};
  }, [loggedIn, token]);

  const handleCardClick = (kitchen) => {
    navigate(`/kitchen/${kitchen.kitchenId}`, { state: { kitchen } });
  };

  const column1 = kitchens.slice(0, 4); 
  const column2 = kitchens.slice(4, 7);  
  const column3 = kitchens.slice(7, 10);

  const handleLoginClick = () => {
    // Redirect to the login page
    navigate('/login');
  };

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ textAlign: 'center' }}
    >
      <Typography variant="h3" style={{ fontWeight: 600 }} sx={{ mb: 3 }}>
        Here are the top 10 kitchens!
      </Typography>

      {/* If not logged in, show the login prompt */}
      {!loggedIn || !token ? (
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleLoginClick} 
          sx={{ padding: '10px 20px', fontSize: '16px', mt: 10}}
        >
          Please log in to view kitchens
        </Button>
      ) : (
        // If logged in, show the kitchen cards
        <div style={{ display: 'flex', maxWidth: '1200px' }}>
          {/* Column 1 */}
          <div style={{ marginRight: '20px' }}>
            {column1.map((kitchen) => (
              <div
                key={kitchen.kitchenId}
                style={{ cursor: 'pointer', marginBottom: '20px' }}
                onClick={() => handleCardClick(kitchen)}
              >
                <KitchenCard kitchen={kitchen} />
              </div>
            ))}
          </div>

          {/* Column 2 */}
          <div style={{ marginRight: '20px' }}>
            {column2.map((kitchen) => (
              <div
                key={kitchen.kitchenId}
                style={{ cursor: 'pointer', marginBottom: '20px' }}
                onClick={() => handleCardClick(kitchen)}
              >
                <KitchenCard kitchen={kitchen} />
              </div>
            ))}
          </div>

          {/* Column 3 */}
          <div style={{ width: '33.33%' }}>
            {column3.map((kitchen) => (
              <div
                key={kitchen.kitchenId}
                style={{ cursor: 'pointer', marginBottom: '20px' }}
                onClick={() => handleCardClick(kitchen)}
              >
                <KitchenCard kitchen={kitchen} />
              </div>
            ))}
          </div>
        </div>
      )}
    </Stack>
  );
};

export default Explore;
