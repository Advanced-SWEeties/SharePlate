import React from 'react'
import Navbar from './Navbar'
import Container from '@mui/material/Container'
import { useNavigate } from 'react-router-dom'

const Layout = ({ children }) => {
  const navigate = useNavigate()

  return (
    <>
      {/* Navbar */}
      <Navbar></Navbar>
      <Container>
        {children}
      </Container>
    </>
  )
}

export default Layout
