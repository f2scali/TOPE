import { createSlice } from '@reduxjs/toolkit';
import initialState from './state';
import extraReducers from './extraReducers';
import detalleListasReducers from './reducers';
const detalleListaSlice = createSlice({
  name: 'detLista',
  initialState,
  reducers: detalleListasReducers,
  extraReducers,
});

export const { setSearch, setCurrentPage, setLimit } =
  detalleListaSlice.actions;

export default detalleListaSlice.reducer;
