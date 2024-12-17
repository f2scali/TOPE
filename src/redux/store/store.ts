import { configureStore } from '@reduxjs/toolkit';
import productoSlice from '../slices/productos/producto.slice';
import rutasSlice from '../slices/rutas/rutas.slice';
import authSlice from '../slices/auth/auth.slice';
const store = configureStore({
  reducer: {
    productos: productoSlice,
    rutas: rutasSlice,
    auth: authSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
