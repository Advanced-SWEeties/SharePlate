import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
// import Login from './pages/Login'
import Explore from './pages/Explore'
import './App.css'
import Layout from './Layout'
import Kitchen from './pages/Kitchen'
import AiComponent from './components/AiComponent'
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
          {/* <Route path="/login" element={<Login/>}> </Route> */}
          <Route path="/explore" element={<Explore/>}> </Route>
          <Route path="/kitchen/:kitchenId" element={<Kitchen/>}/>
          <Route path="/reccomendations" element={<AiComponent/>}/>
        </Routes>
      </Layout>
      </BrowserRouter>
    </div>
  )
}

export default App