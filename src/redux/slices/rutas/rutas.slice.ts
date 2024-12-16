import { createSlice } from '@reduxjs/toolkit';
import initialState from './state';
import extraReducers from './extraReducers';
const rutasSlice = createSlice({
  name: 'rutas',
  initialState,
  reducers: {},
  extraReducers,
});

export const {} = rutasSlice.actions;

export default rutasSlice.reducer;
