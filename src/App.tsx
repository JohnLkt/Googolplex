import { Route, Routes } from 'react-router'
import Landing from './components/pages/LandingPage'
import Login from './components/pages/LoginPage'
import Register from './components/pages/RegisterPage'

function App() {
  // implement Routing Here
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected by Auth */}
    </Routes>
  )
}

export default App
