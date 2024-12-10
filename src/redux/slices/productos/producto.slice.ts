import { createSlice } from '@reduxjs/toolkit';
import initialState from './state';
const productoSlice = createSlice({
  name: 'productos',
  initialState,
  reducers: {},
});

export const {} = productoSlice.actions;

export default productoSlice.reducer;
