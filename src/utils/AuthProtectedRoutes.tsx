import { Outlet, Navigate } from 'react-router'
import { useAuthContext } from '../contexts/AuthContext'

const ProtectedRoutes: React.FC = () => {
  const { authState } = useAuthContext()
  if (authState.isSet) {
    const isAuthenticated =
      !!authState?.accessToken && authState?.accessToken?.length > 0
    return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />
  }
  return null
}

export default ProtectedRoutes
