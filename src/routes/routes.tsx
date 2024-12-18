import {
  createContext,
  FC,
  Fragment,
  lazy,
  ReactNode,
  Suspense,
  useContext,
  useEffect,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store/store';
import { Route, Routes } from 'react-router-dom';
import { thunks as rutasThunks } from '@/redux/slices/rutas/thunks';
import Productos from '@/pages/Productos';
import { Home } from '@/pages/Home';
export const AppRouter = () => {
  const { rutas } = useSelector((state: RootState) => state.rutas);
  const dispatch = useDispatch<AppDispatch>();
  const LazyComponent = (name: string) =>
    lazy(() => import(`../pages/${name}.tsx`));

  useEffect(() => {
    dispatch(rutasThunks.fetchRutas());
  }, [dispatch]);

  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <Routes>
        {rutas.map((route) => {
          const Component = LazyComponent(route.descripcion);
          return (
            <Fragment key={route.id}>
              <Route path={route.path} element={<Component />} />
              {route.subrutas.map((subruta) => {
                const SubComponent = LazyComponent(subruta.descripcion);
                return (
                  <Route
                    key={subruta.id}
                    path={subruta.path}
                    element={<SubComponent />}
                  />
                );
              })}
            </Fragment>
          );
        })}
        <Route path="/" element={<Home />} />
      </Routes>
    </Suspense>
  );
};
interface AuthContextProps {
  isAuthenticated: boolean;
  // rutas: Rutas[];
}
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
// export default AppRouter;
