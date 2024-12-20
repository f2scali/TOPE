import { createSlice } from '@reduxjs/toolkit';
import initialState from './state';
import extraReducers from './extraReducers';
import tipoClienteReducers from './reducers';
const tipoClienteSlice = createSlice({
  name: 'tipoCliente',
  initialState,
  reducers: tipoClienteReducers,
  extraReducers,
});

export const { setSearch, setCurrentPage, setLimit } = tipoClienteSlice.actions;

export default tipoClienteSlice.reducer;
