import { createSlice } from '@reduxjs/toolkit';
import initialState from './state';
import extraReducers from './extraReducers';
import subLineasReducers from './reducers';
const detalleLineaSlice = createSlice({
  name: 'sublinea',
  initialState,
  reducers: subLineasReducers,
  extraReducers,
});

export const { setSearch, setCurrentPage, setLimit } =
  detalleLineaSlice.actions;

export default detalleLineaSlice.reducer;
