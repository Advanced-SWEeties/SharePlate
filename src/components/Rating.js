import * as React from 'react';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Star from "../components/Star";

const Rating = ({ rating, size, setRating, sx }) => {
  return (
    <Stack direction="row" alignItems="center" spacing={1} sx={sx}>
      <Star rating={rating} size={size? size: undefined} setRating={setRating? setRating : undefined} />
      <Typography variant="subtitle1">({rating})</Typography>
    </Stack>
  );
};

export default Rating;
