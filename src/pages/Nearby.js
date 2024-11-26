import React, {useState, useEffect} from 'react'
import { Typography, Stack} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { mockKitchens } from '../functions/mock'
import KitchenCard from '../components/KitchenCard';

const Nearby = (props) => {
  const [kitchens, setKitchens] = useState(mockKitchens);

  // IMPLEMENT THE FETCH WHICH SHOULD CHANGE
  const navigate = useNavigate()
  const handleCardClick = (kitchen) => {
    navigate(`/kitchen/${kitchen.kitchenId}`, { state: { kitchen } }); // Pass the kitchen object in state
  };

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{textAlign: 'center' }}
    >
      <Typography variant="h3" style={{ fontWeight: 600 }} sx={{mb: 2}}>Check out these kitchens near you!</Typography>
      <Stack direction="row" flexWrap="wrap" justifyContent="center" gap={3}>
        {kitchens.map((kitchen) => (
          <div
            key={kitchen.kitchenId}
            style={{cursor: 'pointer'}}
            onClick={() => handleCardClick(kitchen)}
          >
          <KitchenCard kitchen={kitchen} key={kitchen.kitchenId} />
          </div>
        ))}
      </Stack>


    </Stack>
  )
}

export default Nearby
