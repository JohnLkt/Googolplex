import { Route, Routes } from 'react-router'
import Landing from './components/pages/LandingPage'
import ProtectedRoutes from './utils/AuthProtectedRoutes'
import Dashboard from './components/pages/Dashboard'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from './contexts/AuthContext'
import { SidebarProvider } from './contexts/SidebarContext'
import CreateArticle from './components/pages/CreateArticle'

function App() {
  const queryClient = new QueryClient()
  // implement Routing Here
  return (
    <AuthProvider>
      <SidebarProvider>
        <QueryClientProvider client={queryClient}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />

            {/* Protected by Auth */}
            <Route element={<ProtectedRoutes />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/add/article/:classId" element={<CreateArticle />} />
            </Route>
          </Routes>
        </QueryClientProvider>
      </SidebarProvider>
    </AuthProvider>
  )
}

export default App
