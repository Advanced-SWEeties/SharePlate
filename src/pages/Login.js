import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Button, Stack, TextField, Box, InputAdornment } from '@mui/material';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();

  const onButtonClick = () => {
    // Set initial error values to empty
    setEmailError('');
    setPasswordError('');

    // Check if the user has entered both fields correctly
    if ('' === email) {
      setEmailError('Please enter your email');
      return;
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
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



    // navigate('/home'); // Redirect to home or dashboard
  };

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        minHeight: '100vh',
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

/**
 * Login function to handle user authentication.
 * @param {string} username - The username of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<object>} - Returns a promise with the login response.
 */
export const login = async (username, password) => {
  // Validate inputs before sending request
  if (!username || !password) {
    throw new Error('Username and password are required.');
  }

  const data = {
    username,
    password,
  };

  try {
    // Send POST request to login API
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    // Handle the response from the API
    const result = await response.json();

    if (response.ok) {
      // Return the response object (e.g., auth token) on success
      return result;
    } else {
      // Throw an error if the response is not OK
      throw new Error(result.message || 'Login failed');
    }
  } catch (error) {
    // Handle any errors (network issues, etc.)
    throw new Error(error.message || 'An error occurred during login.');
  }
};
