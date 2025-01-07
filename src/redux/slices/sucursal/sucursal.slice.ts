import { createSlice } from '@reduxjs/toolkit';
import initialState from './state';
import extraReducers from './extraReducers';
import sucursalReducers from './reducers';
const sucursalSlice = createSlice({
  name: 'sucursal',
  initialState,
  reducers: sucursalReducers,
  extraReducers,
});

export const { setSearch, setCurrentPage, setLimit } = sucursalSlice.actions;

export default sucursalSlice.reducer;
