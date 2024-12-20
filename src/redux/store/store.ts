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
