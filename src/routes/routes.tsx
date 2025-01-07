import {
  createContext,
  FC,
  Fragment,
  lazy,
  ReactNode,
  Suspense,
  useEffect,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store/store';
import { Route, Routes } from 'react-router-dom';
import { thunks as rutasThunks } from '@/redux/slices/rutas/thunks';
import { Home } from '@/pages/Home';
import EditarTipoCliente from '@/pages/EditarTipoCliente';
import EditarListaPrecio from '@/pages/EditarListaPrecio';
import EditarInventario from '@/pages/EditarInventario';
import EditarLinea from '@/pages/EditarLinea';
import EditarCriterio from '@/pages/EditarCriterio';
import EditarUnidadMed from '@/pages/EditarUnidadMed';
import EditarProducto from '@/pages/EditarProducto';
import EditarDetLista from '@/pages/EditarDetLista';
import EditarSublinea from '@/pages/EditarSublinea';
import EditarDetLinea from '@/pages/EditarDetLinea';
import EditarVendedor from '@/pages/EditarVendedor';
import EditarSucursal from '@/pages/EditarSucursal';
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
        <Route path="clientes/editarTipo/:id" element={<EditarTipoCliente />} />
        <Route
          path="lista-precios/editar/:id"
          element={<EditarListaPrecio />}
        />
        <Route path="inventario/editar/:id" element={<EditarInventario />} />
        <Route path="linea/editar/:id" element={<EditarLinea />} />
        <Route path="criterio/editar/:id" element={<EditarCriterio />} />
        <Route
          path="unidad-inventario/editar/:id"
          element={<EditarUnidadMed />}
        />
        <Route path="productos/editar/:id" element={<EditarProducto />} />
        <Route
          path="lista-precios/det-lista-precio/editar/:id"
          element={<EditarDetLista />}
        />
        <Route
          path="agrupacion-productos/sublinea/editar/:id"
          element={<EditarSublinea />}
        />
        <Route
          path="agrupacion-productos/det-linea/editar/:id"
          element={<EditarDetLinea />}
        />
        <Route
          path="usuarios/vendedores/editar/:id"
          element={<EditarVendedor />}
        />
        <Route
          path="clientes/sucursal/editar/:id"
          element={<EditarSucursal />}
        />
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </Suspense>
  );
};
interface AuthContextProps {
  isAuthenticated: boolean;
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
