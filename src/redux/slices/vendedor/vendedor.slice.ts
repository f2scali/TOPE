import { createSlice } from '@reduxjs/toolkit';
import initialState from './state';
import extraReducers from './extraReducers';
import vendedorReducers from './reducers';
const vendedorSlice = createSlice({
  name: 'vendedor',
  initialState,
  reducers: vendedorReducers,
  extraReducers,
});

export const { setSearch, setCurrentPage, setLimit } = vendedorSlice.actions;

export default vendedorSlice.reducer;
