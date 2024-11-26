import React, { useState } from 'react';
import { TextField, Stack, Typography, Chip, Card, CardContent, Fab } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SearchLocationInput from '../components/SearchLocationInput';

const Reccomendations = () => {
  const [location, setLocation] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [time, setTime] = useState(dayjs());

  const disabilityStatuses = [
    'Wheelchair User',
    'Visually Impaired',
    'Hearing Impaired',
    'None',
  ];

  const handleChipClick = (status) => {
    setSelectedStatus(status === selectedStatus ? null : status); // Toggle selection
  };

  const handleSubmit = () => {
    console.log('Location:', location.address);
    console.log('Disability Status:', selectedStatus);
    console.log('Time:', time?.format('HH:mm'));
  };

  return (
    <Stack direction="row" spacing={3} sx={{ p: 3 }}>
      {/* Input Form Card */}
      <Card sx={{ flex: 1, borderRadius: 3, boxShadow: 3 }}>
        <CardContent>
          <Stack spacing={3} sx={{ p: 2 }}>
            {/* Title */}
            <Typography variant="h4" fontWeight="bold" textAlign="center" color="primary">
              AI Recommendations
            </Typography>
            <Typography variant="body1" textAlign="center" color="textSecondary">
              Fill out the details below to receive personalized AI-powered recommendations!
            </Typography>

            {/* Location Input */}
            <SearchLocationInput setSelectedLocation={setLocation} label="Enter Location" />

            {/* Disability Status */}
            <Stack spacing={1}>
              <Typography variant="h6" color="textPrimary">
                Disability Status
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {disabilityStatuses.map((status) => (
                  <Chip
                    key={status}
                    label={status}
                    color={selectedStatus === status ? 'primary' : 'default'}
                    onClick={() => handleChipClick(status)}
                    sx={{
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      '&:hover': {
                        backgroundColor: selectedStatus === status ? 'primary.light' : 'grey.200',
                      },
                    }}
                  />
                ))}
              </Stack>
            </Stack>

            {/* Time Input */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                label="Select Time"
                value={time}
                onChange={(newValue) => setTime(newValue)}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Stack>
        </CardContent>
      </Card>

      {/* Preview Card */}
      <Card
        sx={{
          flex: 0.5,
          backgroundColor: '#212121', // Dark background
          borderRadius: 3,
          boxShadow: 3,
          color: '#ffffff', // White text
          position: 'relative', // For button positioning
        }}
      >
        <CardContent>
          <Stack spacing={3} sx={{ p: 2 }}>
            <Typography variant="h4" fontWeight="bold">
              Your AI Request
            </Typography>

            {/* Location */}
            <Stack spacing={0} direction="column">
              <Typography variant="body1">
                <strong>Location:</strong>
              </Typography>
              {location ? (
                <Chip
                  label={location.address}
                  color="primary"
                  sx={{
                    color: '#ffffff',
                    fontWeight: 'bold',
                  }}
                />
              ) : (
                <Typography variant="body2" color="textSecondary">
                  {/* None Entered */}
                </Typography>
              )}
            </Stack>

            {/* Disability Status */}
            <Stack spacing={0} direction="column">
              <Typography variant="body1">
                <strong>Disability Status:</strong>
              </Typography>
              {selectedStatus ? (
                <Chip
                  label={selectedStatus}
                  color="primary"
                  sx={{
                    color: '#ffffff',
                    fontWeight: 'bold',
                  }}
                />
              ) : (
                <Typography variant="body2" color="textSecondary">
                  {/* None Selected */}
                </Typography>
              )}
            </Stack>

            {/* Time */}
            <Stack spacing={0} direction="column">
              <Typography variant="body1">
                <strong>Time:</strong>
              </Typography>
              {time ? (
                <Chip
                  label={time.format('HH:mm')}
                  color="primary"
                  sx={{
                    color: '#ffffff',
                    fontWeight: 'bold',
                  }}
                />
              ) : (
                <Typography variant="body2" color="textSecondary">
                  {/* None Selected */}
                </Typography>
              )}
            </Stack>
          </Stack>
        </CardContent>

        {/* Circular Submit Button */}
        <Fab
          color="primary"
          onClick={handleSubmit}
          sx={{
            position: 'absolute',
            bottom: 16,
            right: 16,
          }}
        >
          <ArrowForwardIcon />
        </Fab>
      </Card>
    </Stack>
  );
};

export default Reccomendations;
