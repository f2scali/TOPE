import { configureStore } from '@reduxjs/toolkit';
import productoSlice from '../slices/productos/producto.slice';
import rutasSlice from '../slices/rutas/rutas.slice';
import authSlice from '../slices/auth/auth.slice';
import sidebarSLice from '../slices/sidebar/sidebar.slice';
import clientesSlice from '../slices/clientes/clientes.slice';
import inventarioSlice from '../slices/inventario/inventario.slice';
import lineaSlice from '../slices/linea/linea.slice';
import subLineaSlice from '../slices/sublinea/sublinea.slice';
import detalleLineaSlice from '../slices/detalleLinea/detalleLinea.slice';
import criteriosSlice from '../slices/criterios/criterios.slice';
import unidadMedSlice from '../slices/unidadMed/unidadMed.slice';
import detalleListaSlice from '../slices/detalleLista/detalleLista.slice';
import tipoClienteSlice from '../slices/tipoCliente/tipoCliente.slice';
import usuarioSlice from '../slices/usuario/usuario.slice';
import vendedorSlice from '../slices/vendedor/vendedor.slice';
import listaPreciosSlice from '../slices/listaPrecios/listaPrecios.slice';
import presupuestoSlice from '../slices/ppto/ppto.slice';
import sucursalSlice from '../slices/sucursal/sucursal.slice';
import storage from 'redux-persist/lib/storage';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['sidebar', 'auth'],
};

const persistedReducer = persistReducer(persistConfig, sidebarSLice);

const store = configureStore({
  reducer: {
    productos: productoSlice,
    rutas: rutasSlice,
    auth: authSlice,
    clientes: clientesSlice,
    inventario: inventarioSlice,
    lineas: lineaSlice,
    subLineas: subLineaSlice,
    detalleLineas: detalleLineaSlice,
    criterios: criteriosSlice,
    unidadMed: unidadMedSlice,
    detalleLista: detalleListaSlice,
    tipoCliente: tipoClienteSlice,
    usuarios: usuarioSlice,
    vendedores: vendedorSlice,
    listaPrecios: listaPreciosSlice,
    presupuesto: presupuestoSlice,
    sucursal: sucursalSlice,
    sidebar: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
export default store;
