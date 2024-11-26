import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Rating from './Rating'
import Chip from '@mui/material/Chip'
const KitchenCard = ({ kitchen }) => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Stack alignItems="center" >
          {/* Align the entire content to the center */}
          <Typography variant="h5" component="div">
            {kitchen.name}
          </Typography>
          <Typography variant="body2">{kitchen.address}</Typography>
          <Rating rating={kitchen.rating} sx={{mt:1}}/>
          <Chip label={kitchen.contactPhone} sx={{mt:1}}/>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default KitchenCard;
