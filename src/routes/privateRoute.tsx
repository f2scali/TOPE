import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './routes';

const PrivateRoute = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} replace />;
};

export default PrivateRoute;
