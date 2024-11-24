import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

// Functional component with the prop (kitchen)
const KitchenCard = ({ kitchen }) => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {kitchen.name}
        </Typography>


        <Typography variant="body2">
          {kitchen.address}
        </Typography>

        {/* Display kitchen contact info */}
        <Typography sx={{ color: 'text.secondary', mt: 2 }}>
          Contact Info
        </Typography>
        <Typography variant="body2">
          {kitchen.contactPhone}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default KitchenCard;
