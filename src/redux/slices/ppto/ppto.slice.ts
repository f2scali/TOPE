import { createSlice } from '@reduxjs/toolkit';
import initialState from './state';
import extraReducers from './extraReducers';
import pptoReducers from './reducers';
const pptoSlice = createSlice({
  name: 'presupuesto',
  initialState,
  reducers: pptoReducers,
  extraReducers,
});

export const { setSearch, setCurrentPage, setLimit } = pptoSlice.actions;

export default pptoSlice.reducer;
