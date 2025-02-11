import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';

const PrivateRoute = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} replace />;
};

export default PrivateRoute;
