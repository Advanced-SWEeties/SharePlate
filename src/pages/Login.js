import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Button, Stack, TextField, Box } from '@mui/material';
import { useUser } from '../context/UserContext'

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  const auth = useUser()
  
  const navigate = useNavigate();

  const onButtonClick = async () => {
    // Set initial error values to empty
    setEmailError('');
    setPasswordError('');

    // Check if the user has entered both fields correctly
    if ('' === email) {
      setEmailError('Please enter your email');
      return;
    }

    if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,}$/.test(email)) {
      setEmailError('Please enter a valid email');
      return;
    }    

    if ('' === password) {
      setPasswordError('Please enter a password');
      return;
    }

    if (password.length < 7) {
      setPasswordError('The password must be 8 characters or longer');
      return;
    }
    await auth.login();


    navigate('/home'); // Redirect to home or dashboard
  };

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        mt: 15,
        textAlign: 'center',
        // backgroundColor: '#f4f6f8',
        padding: 2,
      }}
    >
      <Box sx={{ width: '100%', maxWidth: 400, padding: 4, borderRadius: 2, boxShadow: 3, backgroundColor: 'white' }}>
        <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: 600 }}>
          Sign In
        </Typography>

        <TextField
          fullWidth
          value={email}
          label="Enter your email"
          onChange={(ev) => setEmail(ev.target.value)}
          variant="outlined"
          error={!!emailError}
          helperText={emailError}
          sx={{ marginBottom: 2 }}
        />

        <TextField
          fullWidth
          value={password}
          label="Enter your password"
          type="password"
          onChange={(ev) => setPassword(ev.target.value)}
          variant="outlined"
          error={!!passwordError}
          helperText={passwordError}
          sx={{ marginBottom: 3 }}
        />

        <Button
          onClick={onButtonClick}
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            padding: '12px 0',
            fontSize: '16px',
            fontWeight: 'bold',
            textTransform: 'none',
            '&:hover': { backgroundColor: '#1976d2' },
          }}
        >
          Log in
        </Button>
        
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="body2" color="textSecondary">
            Don't have an account?{' '}
            <Button color="primary" onClick={() => navigate('/signup')}>
              Sign Up
            </Button>
          </Typography>
        </Box>
      </Box>
    </Stack>
  );
};

export default Login;
// src/utils/auth.js

