import { Outlet, Navigate } from 'react-router'
import ProtectedRoutesProps from '../interfaces/ProtectedRoutesProps'

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({
  isAuthenticated,
}) => {
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}

export default ProtectedRoutes
