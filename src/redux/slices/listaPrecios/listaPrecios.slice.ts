import { createSlice } from '@reduxjs/toolkit';
import initialState from './state';
import extraReducers from './extraReducers';
import listaPreciosReducers from './reducers';
const listaPreciosSlice = createSlice({
  name: 'listaPrecios',
  initialState,
  reducers: listaPreciosReducers,
  extraReducers,
});

export const { setSearch, setCurrentPage, setLimit } =
  listaPreciosSlice.actions;

export default listaPreciosSlice.reducer;
