import React from 'react'
import Navbar from './Navbar'
import Container from '@mui/material/Container'
// import { useNavigate } from 'react-router-dom'

const Layout = ({ children }) => {

  return (
    <>
      {/* Navbar */}
      <Navbar></Navbar>
      <Container
        sx={{
          padding: '2rem', // Adjust padding as needed
          marginTop: '0.01rem', // Optional: Add margin above the container
        }}
      >
          {children}
      </Container>
    </>
  )
}

export default Layout
