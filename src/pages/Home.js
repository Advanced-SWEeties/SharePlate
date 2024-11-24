import React from 'react'
import { Typography, Stack} from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Home = (props) => {

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ minHeight: '80vh', textAlign: 'center' }}
    >
      <Typography variant="h2" style={{ fontWeight: 600 }}>Welcome!</Typography>
      <Typography variant="h6">This is a service which allows you to look for Charity Kitchens in your area!</Typography>
    </Stack>
  )
}

export default Home
