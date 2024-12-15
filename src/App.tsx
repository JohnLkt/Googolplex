import { Route, Routes } from 'react-router'
import Landing from './components/pages/LandingPage'
import ProtectedRoutes from './utils/AuthProtectedRoutes'
import Dashboard from './components/pages/Dashboard'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from './contexts/AuthContext'
import { SidebarProvider } from './contexts/SidebarContext'
import CreateArticle from './components/pages/CreateArticle'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import CreateAssignment from './components/pages/CreateAssignment'
import ClassDetail from './components/pages/ClassDetail'
import ParticlesBackground from './components/molecules/Particles'
import ArticleDetail from './components/pages/ArticleDetail'
import AssignmentDetail from './components/pages/AssignmentDetail'
import GradeAssignment from './components/pages/GradeAssignment'

function App() {
  const queryClient = new QueryClient()
  // implement Routing Here
  return (
    <AuthProvider>
      <SidebarProvider>
        <ParticlesBackground />
        <ToastContainer className="font-plusJakarta font-bold text-primary" />
        <QueryClientProvider client={queryClient}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            {/* uncomment and comment this route later */}
            {/* <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/class-detail/:classId" element={<ClassDetail />} /> */}
            {/* Protected by Auth */}
            <Route element={<ProtectedRoutes />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/class-detail/:classId" element={<ClassDetail />} />
              <Route
                path="/class-detail/:classId/add/article/"
                element={<CreateArticle />}
              />
              <Route
                path="/class-detail/:classId/add/assignment/"
                element={<CreateAssignment />}
              />
              <Route
                path="/class-detail/:classId/article/:articleId"
                element={<ArticleDetail />}
              />
              <Route
                path="/class-detail/:classId/assignment/:assignmentId"
                element={<AssignmentDetail />}
              />
              <Route
                path="/class-detail/:classId/assignment/:assignmentId/grade"
                element={<GradeAssignment />}
              />
            </Route>
          </Routes>
        </QueryClientProvider>
      </SidebarProvider>
    </AuthProvider>
  )
}

export default App
