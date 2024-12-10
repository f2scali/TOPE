import { configureStore } from '@reduxjs/toolkit';
import productoSlice from '../slices/productos/producto.slice';
const store = configureStore({
  reducer: {
    productos: productoSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
