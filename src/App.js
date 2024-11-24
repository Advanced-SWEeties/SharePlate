import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Explore from './pages/Explore'
import './App.css'
import { useEffect, useState } from 'react'
import Layout from './Layout'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={<Home/>}
          />
          <Route path="/login" element={<Login/>}> </Route>
          <Route path="/explore" element={<Explore/>}> </Route>
        </Routes>
      </Layout>
      </BrowserRouter>
    </div>
  )
}

export default App