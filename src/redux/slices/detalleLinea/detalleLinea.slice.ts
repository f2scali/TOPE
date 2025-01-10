import { createSlice } from '@reduxjs/toolkit';
import initialState from './state';
import extraReducers from './extraReducers';
import detalleLineaReducer from './reducers';

const detalleLineaSlice = createSlice({
  name: 'sublinea',
  initialState,
  reducers: detalleLineaReducer,
  extraReducers,
});

export const { setSearch, setCurrentPage, setLimit } =
  detalleLineaSlice.actions;

export default detalleLineaSlice.reducer;
