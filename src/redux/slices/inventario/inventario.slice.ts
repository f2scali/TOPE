import { createSlice } from '@reduxjs/toolkit';
import initialState from './state';
import extraReducers from './extraReducers';
import inventarioReducers from './reducers';
const inventarioSlice = createSlice({
  name: 'inventario',
  initialState,
  reducers: inventarioReducers,
  extraReducers,
});

export const { setSearch, setCurrentPage, setLimit } = inventarioSlice.actions;

export default inventarioSlice.reducer;
