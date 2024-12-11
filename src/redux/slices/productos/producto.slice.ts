import { createSlice } from '@reduxjs/toolkit';
import initialState from './state';
import productosReducers from './reducers';
import extraReducers from './extraReducers';
const productoSlice = createSlice({
  name: 'productos',
  initialState,
  reducers: productosReducers,
  extraReducers,
});

export const { setSearch, setCurrentPage, setLimit } = productoSlice.actions;

export default productoSlice.reducer;
