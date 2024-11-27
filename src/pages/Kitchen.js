import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, Stack, Chip, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { generateGoogleMapsIframe } from '../functions/map';
import Rating from '../components/Rating';
import { commaParse, parseSchedule} from '../functions/string';

const Kitchen = () => {
  const location = useLocation();
  const kitchen = location.state?.kitchen;
  const [rating, setRating] = useState(0);
  const [schedule, setSchedule] = useState(null);

  const handleSetRating = async (newRating) => {
    setRating(newRating);
    try {
      console.log('Do nothing for now');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!kitchen){
      return
    }
    const parsed = parseSchedule(kitchen.operatingHours);
    setSchedule(parsed);
  }, [kitchen]);

  if (!kitchen) {
    console.log("in here")
    return (
      <Typography variant="h6">
        No kitchen data found. Please return to the Explore page.
      </Typography>
    );
  }

  const embedding = generateGoogleMapsIframe(kitchen.address, 550, 350);
  const tokens = commaParse(kitchen.accessibilityFeatures);
  // const schedule = parseSchedule(kitchen.operatingHours)
  console.log(schedule);
  return (
    <Stack direction="row" alignItems="flex-start" spacing={4}>
      <Stack spacing={1} sx={{ p: 2 }}>
        <Typography variant="h3" gutterBottom>{kitchen.name}</Typography>
        <Stack direction="row" spacing={2}>
          <Typography variant="h6">{kitchen.address}</Typography>
          <Chip label={kitchen.contactPhone} size="large" />
        </Stack>
        <Divider />
        
        <Stack direction="row" spacing={1} flexWrap="wrap">
          <Chip label={kitchen.operationalStatus} size="large" color={kitchen.operationalStatus === 'CLOSED' ? "error" : "success"} />
        </Stack>
        
        <Divider />
        <Rating value={rating} onChange={handleSetRating} size="large" sx={{ mt: 2 }} />
        <Divider />
        
        <Typography variant="h6" sx={{ mt: 2 }}>Accessibility Features</Typography>
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
      <Stack alignItems="center">
        {embedding}
        {schedule && (
          <TableContainer component={Paper} sx={{ marginTop: 2, boxShadow: 3 }}>
            <Table sx={{ minWidth: 350 }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Day</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Operating Hours</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(schedule).map((day) => (
                  <TableRow key={day}>
                    <TableCell>
                      <Chip label={day} size="small" color="primary" />
                    </TableCell>
                    <TableCell>
                      {schedule[day] === 'Closed' ? (
                        <Typography sx={{ color: 'error.main' }}>Closed</Typography>
                      ) : (
                        schedule[day].map((time, index) => (
                          <Typography key={index}>{time}</Typography>
                        ))
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

      </Stack>
    </Stack>
  );
};

export default Kitchen;
