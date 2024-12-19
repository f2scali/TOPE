import { createSlice } from '@reduxjs/toolkit';
import initialState from './state';
import extraReducers from './extraReducers';
import clientesReducers from './reducers';
const clientesSlice = createSlice({
  name: 'clientes',
  initialState,
  reducers: clientesReducers,
  extraReducers,
});

export const { setSearch, setCurrentPage, setLimit } = clientesSlice.actions;

export default clientesSlice.reducer;
