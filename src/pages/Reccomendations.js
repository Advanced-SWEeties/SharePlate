import React, { useState, useEffect } from 'react';
import { TextField, Stack, Typography, Chip, Card, CardContent, Fab, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SearchLocationInput from '../components/SearchLocationInput';
import { useUser } from '../context/UserContext';
import { apiGetRequest } from '../functions/api';
import { useNavigate } from 'react-router-dom';

const Reccomendations = () => {
  const [location, setLocation] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [time, setTime] = useState(dayjs());
  const [answer, setAnswer] = useState(null);
  const { loggedIn, token } = useUser(); // Get logged-in status and token
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();

  const disabilityStatuses = [
    'Wheelchair User',
    'Visually Impaired',
    'Hearing Impaired',
    'None',
  ];

  const handleChipClick = (status) => {
    setSelectedStatus(status === selectedStatus ? null : status); // Toggle selection
  };

  const handleSubmit = async () => {
    if (!location || !time || !selectedStatus) {
      return;
    }
    const params = {
      location: location.address,
      disabilityStatus: selectedStatus,
      mealHours: time,
    };

    const result = await apiGetRequest('kitchens/recommendation', params, token);
    console.log(result);
    if (result) {
      setAnswer(result.answer);
      setLocation(null);
      setTime(dayjs());
      setSelectedStatus(null);
    }
  };

  useEffect(() => {
    if (answer) {
      setIsDialogOpen(true);
    }
  }, [answer]);

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setAnswer(null); // Reset answer after dialog close
  };

  const handleLoginClick = () => {
    // Navigate to login page if the user is not logged in
    navigate('/login');
  };

  return (
    <Stack direction="row" spacing={3} sx={{ p: 3 }}>
      {/* Check if the user is logged in */}
      {!loggedIn || !token ? (
        // Display login prompt if not logged in
        <Card sx={{ flex: 1, borderRadius: 3, boxShadow: 3 }}>
          <CardContent sx={{ textAlign: 'center', padding: 4 }}>
            <Typography variant="h5" fontWeight="bold">
              Please log in to get personalized AI Recommendations
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              sx={{ mt: 2 }} 
              onClick={handleLoginClick}
            >
              Log In
            </Button>
          </CardContent>
        </Card>
      ) : (
        // Render the form if logged in
        <>
          <Card sx={{ flex: 1, borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
              <Stack spacing={3} sx={{ p: 2 }}>
                <Typography variant="h4" fontWeight="bold" textAlign="center" color="primary">
                  AI Recommendations
                </Typography>
                <Typography variant="body1" textAlign="center" color="textSecondary">
                  Fill out the details below to receive personalized AI-powered recommendations!
                </Typography>

                <SearchLocationInput setSelectedLocation={setLocation} label="Enter Location" />

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

          <Card sx={{ flex: 0.5, backgroundColor: '#212121', borderRadius: 3, boxShadow: 3, color: '#ffffff', position: 'relative' }}>
            <CardContent>
              <Stack spacing={3} sx={{ p: 2 }}>
                <Typography variant="h4" fontWeight="bold">
                  Your AI Request
                </Typography>
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
        </>
      )}

      {/* Dialog for displaying the AI answer */}
      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>AI Recommendation</DialogTitle>
        <DialogContent>
          <Typography variant="body1" color="textPrimary">
            {answer}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};

export default Reccomendations;
