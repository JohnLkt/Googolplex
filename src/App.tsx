import { Route, Routes } from 'react-router'
import Landing from './components/pages/LandingPage'
import Login from './components/pages/LoginPage'
import Register from './components/pages/RegisterPage'
import ProtectedRoutes from './utils/AuthProtectedRoutes'
import Dashboard from './components/pages/Dashboard'

function App() {
  // implement Routing Here
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected by Auth */}
      <Route element={<ProtectedRoutes isAuthenticated={true} />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  )
}

export default App
