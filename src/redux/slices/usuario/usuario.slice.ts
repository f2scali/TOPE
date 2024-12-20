import { createSlice } from '@reduxjs/toolkit';
import initialState from './state';
import extraReducers from './extraReducers';
import usuarioReducers from './reducers';
const usuarioSlice = createSlice({
  name: 'usuario',
  initialState,
  reducers: usuarioReducers,
  extraReducers,
});

export const { setSearch, setCurrentPage, setLimit } = usuarioSlice.actions;

export default usuarioSlice.reducer;
