import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export interface PrivateRouteProps {
  isAuthenticated: boolean;
}
const PrivateRoute: FC<PrivateRouteProps> = ({ isAuthenticated }) => {
  return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} replace />;
};

export default PrivateRoute;
