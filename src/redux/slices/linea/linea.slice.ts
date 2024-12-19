import { createSlice } from '@reduxjs/toolkit';
import initialState from './state';
import extraReducers from './extraReducers';
import lineasReducers from './reducers';
const lineaSlice = createSlice({
  name: 'linea',
  initialState,
  reducers: lineasReducers,
  extraReducers,
});

export const { setSearch, setCurrentPage, setLimit } = lineaSlice.actions;

export default lineaSlice.reducer;
