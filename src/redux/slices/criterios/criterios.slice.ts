import { createSlice } from '@reduxjs/toolkit';
import initialState from './state';
import extraReducers from './extraReducers';
import criteriosReducers from './reducers';
const criteriosSlice = createSlice({
  name: 'criterios',
  initialState,
  reducers: criteriosReducers,
  extraReducers,
});

export const { setSearch, setCurrentPage, setLimit } = criteriosSlice.actions;

export default criteriosSlice.reducer;
