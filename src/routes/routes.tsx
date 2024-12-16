import { FC, useEffect } from 'react';
import PrivateRoute, { PrivateRouteProps } from './privateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store/store';
import { thunks } from '../redux/slices/rutas/thunks';
import { Rutas } from '../types/rutas';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Login } from '../pages/Login';
import { Layout } from '../layout/Layout';
interface AppRouterProps extends PrivateRouteProps {}
const AppRouter: FC<AppRouterProps> = ({ isAuthenticated }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { rutas } = useSelector((state: RootState) => state.rutas);

  useEffect(() => {
    dispatch(thunks.fetchRutas());
  }, []);

  const renderRoutes = (routes: Rutas[]) => {
    return routes.map((route) => (
      <>
        <Route
          key={route.id}
          path={route.path}
          element={<route.descripcion />}
        />

        {route.subrutas.map((subruta) => (
          <Route
            key={subruta.id}
            path={subruta.path}
            element={<subruta.descripcion />}
          />
        ))}
      </>
    ));
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
          <Route element={<Layout />}>{renderRoutes(rutas)}</Route>
        </Route>

        <Route
          path="*"
          element={
            isAuthenticated ? (
              <Navigate to={rutas[0]?.path || '/login'} replace />
            ) : (
              <Navigate to={'/login'} replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
