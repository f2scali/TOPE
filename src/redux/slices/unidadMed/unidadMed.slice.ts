import { createSlice } from '@reduxjs/toolkit';
import initialState from './state';
import extraReducers from './extraReducers';
import unidadMedReducers from './reducers';
const unidadMedSlice = createSlice({
  name: 'unidadMed',
  initialState,
  reducers: unidadMedReducers,
  extraReducers,
});

export const { setSearch, setCurrentPage, setLimit } = unidadMedSlice.actions;

export default unidadMedSlice.reducer;
