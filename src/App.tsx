import { Route, Routes } from 'react-router'
import Landing from './components/pages/LandingPage'
import ProtectedRoutes from './utils/AuthProtectedRoutes'
import Dashboard from './components/pages/Dashboard'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from './contexts/AuthContext'
import { SidebarProvider } from './contexts/SidebarContext'
import CreateArticle from './components/pages/CreateArticle'
import Post from './components/pages/Post'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import CreateAssignment from './components/pages/CreateAssignment'
import ClassDetail from './components/pages/ClassDetail'

function App() {
  const queryClient = new QueryClient()
  // implement Routing Here
  return (
    <AuthProvider>
      <SidebarProvider>
        <ToastContainer className="font-plusJakarta font-bold text-primary" />
        <QueryClientProvider client={queryClient}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />

            {/* Protected by Auth */}
            <Route element={<ProtectedRoutes />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/class-detail/:classId" element={<ClassDetail />} />
              <Route path="/add/article/:classId" element={<CreateArticle />} />
              <Route
                path="/add/assignment/:classId"
                element={<CreateAssignment />}
              />
              <Route path="/post/:postId" element={<Post />} />
            </Route>
          </Routes>
        </QueryClientProvider>
      </SidebarProvider>
    </AuthProvider>
  )
}

export default App
