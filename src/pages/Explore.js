import React from 'react'
import { Typography, Stack} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { mockKitchens } from '../functions/mock'
import KitchenCard from '../components/KitchenCard';

const Explore = (props) => {
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{textAlign: 'center' }}
    >
      <Typography variant="h5" style={{ fontWeight: 600 }} padding={10}>Check out these kitchens near you!</Typography>
      <Stack direction="row" flexWrap="wrap" justifyContent="center" gap={3}>
        {mockKitchens.map((kitchen) => (
          <KitchenCard kitchen={kitchen} key={kitchen.id} />
        ))}
      </Stack>


    </Stack>
  )
}

export default Explore
